import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { uid: string } }
) {
  const bucketdataepisode: any[] = [];
  try {
    const dataSeries = new Promise<any>((resolve) => {
      const unsubscribe = onSnapshot(doc(db, "series", params.uid), (doc) => {
        const data = doc.data();
        resolve(data);
        unsubscribe();
      });
    });

    const querySnapshot = await getDocs(collection(db, "series", params.uid, "episode"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const newData = {
        ...data,
        id_doc: doc.id,
      };
      bucketdataepisode.push(JSON.parse(JSON.stringify(newData)));
    });

    const dataseries = await dataSeries;

    return NextResponse.json(
      {
        success: true,
        series_data: dataseries,
        episode_data: bucketdataepisode,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, messages: error.message },
      { status: 500 }
    );
  }
}
