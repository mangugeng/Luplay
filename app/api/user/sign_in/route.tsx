import { auth } from "firebase-admin";
import { adminApp } from "@/lib/admin-firebase";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

adminApp();

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const authorization = headers().get("Authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new Error("Unauthorized: Bearer token is missing or invalid");
    }

    const idToken = authorization.split("Bearer ")[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    if (!decodedToken) {
      throw new Error("Unauthorized: Invalid ID token");
    }

    // Generate session cookie
    const expiresIn = 2 * 7 * 24 * 60 * 60 * 1000;
    const sessionCookie = await auth().createSessionCookie(idToken, {
      expiresIn,
    });

    const options = {
      name: "session",
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    };

    cookies().set(options);

    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
