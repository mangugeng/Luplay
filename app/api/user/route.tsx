import { adminApp } from "@/lib/admin-firebase";
import { db } from "@/lib/firebase";
import { auth } from "firebase-admin";
import { doc, getDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

adminApp();

export async function GET(request: NextRequest, response: NextResponse) {
  const session = cookies().get("session")?.value || "";
  let mergedData: any[] = [];

  try {
    if (session) {
      const decodedClaims = await auth().verifySessionCookie(session, true);
      const docRef = doc(db, "userViewer", decodedClaims.user_id);
      const docSnap = await getDoc(docRef);
      mergedData = [
        {
          ...docSnap.data(),
        },
      ];
    }

    return NextResponse.json({ user: mergedData }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user data:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
