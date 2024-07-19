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
  try {
    const dataMovies = new Promise<any>((resolve) => {
      const unsubscribe = onSnapshot(doc(db, "movies", params.uid), (doc) => {
        const data = doc.data();
        resolve(data);
        unsubscribe();
      });
    });

    const datamovies = await dataMovies;

    return NextResponse.json(
      {
        success: true,
        movies_data: datamovies,
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
