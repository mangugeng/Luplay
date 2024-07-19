import { adminApp } from "@/lib/admin-firebase";
import { db } from "@/lib/firebase";
import { auth } from "firebase-admin";
import { deleteDoc, doc } from "firebase/firestore";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

adminApp();

export async function DELETE(request: NextRequest, response: NextResponse) {
  const searchParams = request.nextUrl.searchParams;
  const id_doc = searchParams.get("id_doc");

  const session = cookies().get("session")?.value || "";

  try {
    if (session) {
      const decodedClaims = await auth().verifySessionCookie(session, true);

      await deleteDoc(
        doc(db, "userViewer", `${decodedClaims.uid}`, "watchlist", `${id_doc}`)
      );
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
