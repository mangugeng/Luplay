import { auth } from "firebase-admin";
import { adminApp } from "@/lib/admin-firebase";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

adminApp();

export async function GET(request: NextRequest) {
  const session = cookies().get("session")?.value || "";

  try {
    await auth().verifySessionCookie(session, true);
    return NextResponse.json({ message: "Has Session" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Session expired" }, { status: 401 });
  }
}
