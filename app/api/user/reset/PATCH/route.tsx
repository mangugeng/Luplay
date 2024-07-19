import { NextRequest, NextResponse } from "next/server";
import { confirmPasswordReset, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function PATCH(request: NextRequest, response: NextResponse) {
  try {
    const { password } = await request.json();
    const { searchParams } = new URL(request.url);

    const oobCode = searchParams.get("oobCode") || "";

    await confirmPasswordReset(auth, oobCode, password).then((resp) => {
    }).catch((error) => {
      console.log(error)
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error memperbarui kata sandi: " + error },
      { status: 500 }
    );
  }
}
