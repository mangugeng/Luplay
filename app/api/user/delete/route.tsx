import { adminApp } from "@/lib/admin-firebase";
import { db } from "@/lib/firebase";
import { auth } from "firebase-admin";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";

adminApp();

export async function DELETE(request: NextRequest) {
  const session = cookies().get("session")?.value || "";
  const body = await request.json();
  const dbAdmin = getFirestore();

  try {
    if (session) {
      const decodedClaims = await auth().verifySessionCookie(session, true);

      await addDoc(collection(db, "deletedUser"), {
        id_user: decodedClaims.uid,
        reason: body.reason,
        timestamp: serverTimestamp(),
      }).then(async () => {
        await deleteDoc(doc(db, "userViewer", decodedClaims.uid))
          .then(async () => {
            const collectionRef = dbAdmin.collection(
              `/userViewer/${decodedClaims.uid}/watchlist`
            );
            const query = collectionRef.orderBy("timestamp").limit(100);

            return new Promise((resolve, reject) => {
              deleteQueryBatch(dbAdmin, query, resolve).catch(reject);
            });

            async function deleteQueryBatch(db: any, query: any, resolve: any) {
              const snapshot = await query.get();

              const batchSize = snapshot.size;
              if (batchSize === 0) {
                resolve();
                return;
              }

              const batch = db.batch();
              snapshot.docs.forEach((doc: any) => {
                batch.delete(doc.ref);
              });
              await batch.commit();

              process.nextTick(() => {
                deleteQueryBatch(dbAdmin, query, resolve);
              });
            }
          })
          .then(async () => {
            await auth().deleteUser(decodedClaims.uid);
          });
      });
    } else {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, messages: "Internal Server Error" },
      { status: 500 }
    );
  }
}
