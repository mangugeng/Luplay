
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Metadata } from "next";
import Home from "./home/page";

export const metadata: Metadata = {
  title: "Video Page | Lunar Play Dashboard",
  description: "",
  // other metadata
};

function formatFirestoreTimestamp(timestamp: { seconds: number; nanoseconds: number }): string {
  const dateObject = new Date(timestamp.seconds * 1000); // Konversi detik ke milidetik
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
}

async function getData() {
  const bucketdata: any[] = [];
  const querySnapshot = await getDocs(collection(db, "movies"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data();
    const newData = {
      ...data,
      id_doc: doc.id,
      create_at_formatted: formatFirestoreTimestamp(data.create_at),
    };
    bucketdata.push(JSON.parse(JSON.stringify(newData)));
  });

  return bucketdata;
}

const AdminPage = async () => {
  const bucketdata = await getData();
  return (
    <>
      <Home bucketdata={bucketdata}></Home>
    </>
  );
};

export default AdminPage;
