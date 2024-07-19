import { auth } from "@/lib/firebase";
import { verifyPasswordResetCode } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const oobCode = searchParams.get("oobCode") || "";

    await verifyPasswordResetCode(auth, oobCode);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error melakukan verifikasi action code: " + error },
      { status: 500 }
    );
  }
}
