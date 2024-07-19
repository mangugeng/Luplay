import { db } from "@/lib/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const res = await request.json();

    // Try to add document to the collection
    await setDoc(doc(db, "userViewer", res.id), {
      email: res.formData.email,
      name: res.formData.fullname,
      phone: res.formData.phone,
      profileImageUrl: "",
      createAt: serverTimestamp(),
    });

    // If successful, return a success response
    return new Response(JSON.stringify({ status: 200 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // If an error occurs, catch it and return an error response
    return new Response(
      JSON.stringify({ status: 500, error: "Tidak dapat melakukan pendaftaran: " + error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
