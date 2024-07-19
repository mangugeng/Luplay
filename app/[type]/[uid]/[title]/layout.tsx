import type { Metadata } from "next";

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

  const content = await fetch(
    params.type == "movies"
      ? `http://localhost:3002/api/data/video/movies/${params.uid}`
      : `http://localhost:3002/api/data/video/series/${params.uid}`,
    {
      method: "GET",
    }
  ).then(async (response) => {
    const data = await response.json();
    return params.type == "movies" ? data.movies_data.image_banner_desktop : data.series_data.image_banner_desktop;
  });

  return {
    metadataBase: new URL("https://luplay.co.id"),
    title:
      "Luplay - Detail " +
      params.type.charAt(0).toUpperCase() +
      params.type.slice(1) +
      " " +
      result,
    description:
      "Nonton " +
      params.type.charAt(0).toUpperCase() +
      params.type.slice(1) +
      " " +
      result,
    openGraph: {
      title:
        "Luplay - " +
        params.type.charAt(0).toUpperCase() +
        params.type.slice(1) +
        " " +
        result,
      description:
        "Nonton " +
        params.type.charAt(0).toUpperCase() +
        params.type.slice(1) +
        " " +
        result,
      type: "website",
      url:
        "http://localhost:3002/" +
        params.type +
        "/" +
        params.uid +
        "/" +
        params.title,
      images: content + ".png",
    },
    twitter: {
      title:
        "Luplay - " +
        params.type.charAt(0).toUpperCase() +
        params.type.slice(1) +
        " " +
        result,
      description:
        "Nonton " +
        params.type.charAt(0).toUpperCase() +
        params.type.slice(1) +
        " " +
        result,
      creator: "@luplay.co.id",
      images: content + ".png",
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
