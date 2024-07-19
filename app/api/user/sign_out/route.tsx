import { auth } from "firebase-admin";
import { adminApp } from "@/lib/admin-firebase";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

adminApp();

export async function POST(request: NextRequest) {
  try {
    const session = cookies().get("session")?.value || "";

    const decodedClaims = await auth().verifySessionCookie(session);
    await auth().revokeRefreshTokens(decodedClaims.sub);

    const cookieOptions = {
      path: "/",
      expires: new Date(0),
    };

    cookies().set("session", "", cookieOptions);
    return NextResponse.json(
      { message: "Successfully signed out" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during sign out:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
