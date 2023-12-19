import { Metadata } from "next";
import Home from "./home/page";

export const metadata: Metadata = {
  title: "Luplay",
  description: "",
  // other metadata
};

const Layout = async () => {
  const bucketdata = await fetch(`http://localhost:3002/api/data/video/movies`, {
    method: "GET",
  }).then(async (response) => {
    const data = await response.json();
    if (response.status != 200) {
      alert("No data found");
    }
    return data.bucketdata;
  });

  return (
    <>
      <Home bucketdata={bucketdata}></Home>
    </>
  );
};

export default Layout;
