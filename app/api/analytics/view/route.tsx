import { adminApp } from "@/lib/admin-firebase";
import { db } from "@/lib/firebase";
import { doc, increment, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

adminApp();

export async function PUT(request: NextRequest, response: NextResponse) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type");
  const id_doc = searchParams.get("id_doc");
  const title = searchParams.get("title");

  try {
    if (type === "series") {
      const seriesRef = doc(db, "series", `${id_doc}`);
      const episodeRef = doc(db, "series", `${id_doc}`, "episode", `${title}`);
      await updateDoc(seriesRef, {
        views: increment(1),
      });
      await updateDoc(episodeRef, {
        views: increment(1),
      });
    } else {
      const moviesRef = doc(db, "movies", `${id_doc}`);
      await updateDoc(moviesRef, {
        views: increment(1),
      });
    }
    return NextResponse.json({ status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
