import { db, storage } from "@/lib/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const formData = await request.formData();
  try {
    const userRef = doc(db, "userViewer", formData.get("id") as string);

    await updateDoc(userRef, {
      name: formData.get("fullname") as string,
      username: formData.get("username") as string,
      phone: formData.get("phone") as string,
      gender: formData.get("gender") as string,
      birthdate: formData.get("birthdate") as string,
      editAt: serverTimestamp(),
    });

    const storagephotoRef = ref(
      storage,
      "profile_images/" + formData.get("id")
    );

    const file = formData.get("photo");

    if (file !== null && file instanceof File) {
      const uploadTask = uploadBytesResumable(storagephotoRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const updateData = {
              profileImageUrl: downloadURL,
            };
            await updateDoc(userRef, updateData);
          });
        }
      );
    } else {
      console.error("File is either null or not an instance of File");
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
