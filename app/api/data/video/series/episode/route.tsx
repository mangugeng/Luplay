import { db } from "@/lib/firebase";
import { firestore } from "firebase-admin";
import { collectionGroup, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  function formatFirestoreTimestamp(timestamp: {
    seconds: number;
    nanoseconds: number;
  }): string {
    const dateObject = new Date(timestamp.seconds * 1000);
    const formattedDate = dateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formattedDate;
  }

  const bucketdata: any[] = [];

  try {
    const episodeCollection = collectionGroup(db, "episode");
    const querySnapshot = await getDocs(episodeCollection);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const newData = {
        ...data,
        id_doc: doc.id,
        id_doc_parent: doc.ref.parent.parent?.id,
        create_at_formatted: formatFirestoreTimestamp(data.create_at),
      };
      bucketdata.push(JSON.parse(JSON.stringify(newData)));
    });

    return NextResponse.json({ bucketdata }, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
