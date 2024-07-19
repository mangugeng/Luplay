import { Metadata } from "next";
import Home from "./home/page";

export const metadata: Metadata = {
  title: "Luplay",
  description: "",
  // other metadata
};

const Layout = async () => {

  return (
    <>
      <Home></Home>
    </>
  );
};

export default Layout;
