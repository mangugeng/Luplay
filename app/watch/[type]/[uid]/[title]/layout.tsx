import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { type: string; uid: string; title: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    // Fetch video data
    const videoResponse = await fetch(
      params.type == "movies" || params.type == "trailer-movies"
        ? `https://luplay.co.id/api/data/video/movies/${params.uid}`
        : `https://luplay.co.id/api/data/video/series/${params.uid}`,
      {
        method: "GET",
        next: { revalidate: 60 }, // Revalidate every minute
      }
    );

    if (!videoResponse.ok) {
      throw new Error(`Failed to fetch video data: ${videoResponse.statusText}`);
    }

    const data = await videoResponse.json();

    // Fetch episode data if needed
    let episodeImage = "";
    if (params.type !== "movies" && params.type !== "trailer-movies") {
      const episodeResponse = await fetch(
        `https://luplay.co.id/api/data/video/series/episode`,
        {
          next: { revalidate: 60 }, // Revalidate every minute
        }
      );

      if (!episodeResponse.ok) {
        throw new Error(`Failed to fetch episode data: ${episodeResponse.statusText}`);
      }

      const episodeData = await episodeResponse.json();
      const filteredEpisode = episodeData.bucketdata
        .filter((obj: any) => obj.id_doc === params.title && obj.id_doc_parent === params.uid)
        .map((obj: any) => obj.image)[0];
      
      episodeImage = filteredEpisode || "";
    }

    const title =
      params.type == "movies" || params.type == "trailer-movies"
        ? data.movies_data?.title
        : data.series_data?.title;

    if (!title) {
      throw new Error("Title not found in response data");
    }

    var step1 = title.replace(/%26/g, "&");
    var step2 = step1.replace(/-/g, " ");
    var words = step2.toLowerCase().split(" ");
    for (var i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    var result = words.join(" ");

    const baseTitle = params.type == "trailer-series" ||
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
          params.title.slice(1).replace(/-/g, " ");

    const baseDescription = params.type == "trailer-series" ||
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
          params.title.slice(1).replace(/-/g, " ");

    const imageUrl = params.type == "trailer-movies" || params.type == "movies"
      ? `${data.movies_data?.image_banner_desktop}.png`
      : `${episodeImage}.png`;

    return {
      metadataBase: new URL("https://luplay.co.id"),
      title: baseTitle,
      description: baseDescription,
      openGraph: {
        title: baseTitle,
        description: baseDescription,
        type: "website",
        url: `https://luplay.co.id/watch/${params.type}/${params.uid}/${params.title}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: result,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: baseTitle,
        description: baseDescription,
        creator: "@luplay.co.id",
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Luplay",
      description: "Luplay - Streaming Platform",
    };
  }
}

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
