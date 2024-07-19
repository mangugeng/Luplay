import type { Metadata } from "next";

type Props = {
  params: { type: string; uid: string; title: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await fetch(
    params.type == "movies" || params.type == "trailer-movies"
      ? `https://luplay.co.id/api/data/video/movies/${params.uid}`
      : `https://luplay.co.id/api/data/video/series/${params.uid}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());

  const episode = await fetch(
    `https://luplay.co.id/api/data/video/series/episode`
  ).then((res) =>
    res.json().then((data) => {
      return data.bucketdata
        .filter(
          (obj: any) =>
            obj.id_doc === params.title && obj.id_doc_parent === params.uid
        )
        .map((obj: any) => obj.image)
        .toLocaleString();
    })
  );

  const title =
    params.type == "movies" || params.type == "trailer-movies"
      ? data.movies_data.title
      : data.series_data.title;

  var step1 = title.replace(/%26/g, "&");

  var step2 = step1.replace(/-/g, " ");

  var words = step2.toLowerCase().split(" ");
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  var result = words.join(" ");
  return {
    metadataBase: new URL("https://luplay.co.id"),
    title:
      params.type == "trailer-series" ||
      params.type == "trailer-movies" ||
      params.type == "movies"
        ? "Luplay - Trailer " + result
        : "Luplay - " +
          params.type.charAt(0).toUpperCase() +
          params.type.slice(1) +
          " " +
          result +
          " " +
          params.title.charAt(0).toUpperCase() +
          params.title.slice(1).replace(/-/g, " "),
    description:
      params.type == "trailer-series" ||
      params.type == "trailer-movies" ||
      params.type == "movies"
        ? "Nonton Trailer " + result
        : "Nonton " +
          params.type.charAt(0).toUpperCase() +
          params.type.slice(1) +
          " " +
          result +
          " " +
          params.title.charAt(0).toUpperCase() +
          params.title.slice(1).replace(/-/g, " "),
    openGraph: {
      title:
        params.type == "trailer-series" ||
        params.type == "trailer-movies" ||
        params.type == "movies"
          ? "Luplay - Trailer " + result
          : "Luplay - " +
            params.type.charAt(0).toUpperCase() +
            params.type.slice(1) +
            " " +
            result +
            " " +
            params.title.charAt(0).toUpperCase() +
            params.title.slice(1).replace(/-/g, " "),
      description:
        params.type == "trailer-series" ||
        params.type == "trailer-movies" ||
        params.type == "movies"
          ? "Nonton Trailer " + result
          : "Nonton " +
            params.type.charAt(0).toUpperCase() +
            params.type.slice(1) +
            " " +
            result +
            " " +
            params.title.charAt(0).toUpperCase() +
            params.title.slice(1).replace(/-/g, " "),
      type: "website",
      url:
        "https://luplay.co.id/watch/" +
        params.type +
        "/" +
        params.uid +
        "/" +
        params.title,
      images:
        params.type == "trailer-movies" || params.type == "movies"
          ? data.movies_data.image_banner_desktop + ".png"
          : episode + ".png",
    },
    twitter: {
      title:
        params.type == "trailer-series"
          ? "Luplay - Trailer " + result
          : "Luplay - " +
            params.type.charAt(0).toUpperCase() +
            params.type.slice(1) +
            " " +
            result +
            " " +
            params.title.charAt(0).toUpperCase() +
            params.title.slice(1).replace(/-/g, " "),
      description:
        params.type == "trailer-series"
          ? "Nonton Trailer " + result
          : "Nonton " +
            params.type.charAt(0).toUpperCase() +
            params.type.slice(1) +
            " " +
            result +
            " " +
            params.title.charAt(0).toUpperCase() +
            params.title.slice(1).replace(/-/g, " "),
      creator: "@luplay.co.id",
      images:
        params.type == "trailer-movies" || params.type == "movies"
          ? data.movies_data.image_banner_desktop + ".png"
          : episode + ".png",
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
