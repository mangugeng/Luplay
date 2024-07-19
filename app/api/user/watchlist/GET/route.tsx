import { adminApp } from "@/lib/admin-firebase";
import { db } from "@/lib/firebase";
import { auth } from "firebase-admin";
import { collectionGroup, doc, getDoc, getDocs } from "firebase/firestore";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

adminApp();

export async function GET(request: NextRequest, response: NextResponse) {
  const session = cookies().get("session")?.value || "";

  const userWatchlist: any[] = [];

  try {
    if (session) {
      const decodedClaims = await auth().verifySessionCookie(session, true);
      const watchlist = collectionGroup(db, "watchlist");
      const querySnapshot = await getDocs(watchlist);

      querySnapshot.forEach((doc) => {
        if (doc.ref.parent.parent?.id === decodedClaims.uid) {
          userWatchlist.push({
            id_doc: doc.id
          });
        }
      });
    } else {
      null
    }

    return NextResponse.json({userWatchlist:userWatchlist}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 401 }
    );
  }
}
