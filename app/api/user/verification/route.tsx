import { auth } from "@/lib/firebase";
import { applyActionCode } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const oobCode = searchParams.get("oobCode") || "";

    await applyActionCode(auth, oobCode);
    
    return NextResponse.json({ status: 200 });
  } catch (error:any) {
    return NextResponse.json(
      { error: "Error verifikasi email: " + error.code },
      { status: 500 }
    );
  }
}
