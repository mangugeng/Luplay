import { NextRequest, NextResponse } from "next/server";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { email } = await request.json();

    await sendPasswordResetEmail(auth, email);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error mengirimkan tautan: " + error },
      { status: 500 }
    );
  }
}
