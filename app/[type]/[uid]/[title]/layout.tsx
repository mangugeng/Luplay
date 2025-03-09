import type { Metadata } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Props = {
  params: { type: string; uid: string; title: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = params.title;
  var step1 = title.replace(/%26/g, "&");
  var step2 = step1.replace(/-/g, " ");
  var words = step2.toLowerCase().split(" ");
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  var result = words.join(" ");

  let content = "";
  try {
    const docRef = doc(db, params.type, params.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      content = data.image_banner_desktop || "";
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }

  return {
    metadataBase: new URL("https://luplay.co.id"),
    title: `Luplay - Detail ${params.type.charAt(0).toUpperCase()}${params.type.slice(1)} ${result}`,
    description: `Nonton ${params.type.charAt(0).toUpperCase()}${params.type.slice(1)} ${result}`,
    openGraph: {
      title: `Luplay - ${params.type.charAt(0).toUpperCase()}${params.type.slice(1)} ${result}`,
      description: `Nonton ${params.type.charAt(0).toUpperCase()}${params.type.slice(1)} ${result}`,
      type: "website",
      url: `https://luplay.co.id/${params.type}/${params.uid}/${params.title}`,
      images: content ? `${content}.png` : "",
    },
    twitter: {
      title: `Luplay - ${params.type.charAt(0).toUpperCase()}${params.type.slice(1)} ${result}`,
      description: `Nonton ${params.type.charAt(0).toUpperCase()}${params.type.slice(1)} ${result}`,
      creator: "@luplay.co.id",
      images: content ? `${content}.png` : "",
    },
  };
}

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
