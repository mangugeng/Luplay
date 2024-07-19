import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: NextRequest, response: NextResponse) {
  function formatFirestoreTimestamp(timestamp: {
    seconds: number;
    nanoseconds: number;
  }): string {
    const dateObject = new Date(timestamp.seconds * 1000); // Konversi detik ke milidetik
    const formattedDate = dateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return formattedDate;
  }

  const bucketdata: any[] = [];

  const querySnapshot = await getDocs(collection(db, "movies"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data();
    const newData = {
      ...data,
      id_doc: doc.id,
      create_at_formatted: formatFirestoreTimestamp(data.create_at),
      type: 'movies'
    };
    bucketdata.push(JSON.parse(JSON.stringify(newData)));
  });

  return NextResponse.json({ bucketdata: bucketdata }, { status: 200 });
}
