import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  const movies = await fetch(`https://luplay.co.id/api/data/video/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const series = await fetch(`https://luplay.co.id/api/data/video/series`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const episode = await fetch(
    `https://luplay.co.id/api/data/video/series/episode`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  let dataCollection: any[] | undefined;
  let dataEpisode: any[] | undefined;

  if (query !== null && query !== undefined && query !== "") {
    let dataMovies: any[];

    if (movies.ok) {
      dataMovies = await movies
        .json()
        .then((data: { bucketdata: { title: string }[] }) => {
          return data.bucketdata.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
          );
        });
    }

    const dataSeries = await series
      .json()
      .then((data: { bucketdata: { title: string }[] }) => {
        return data.bucketdata.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
      });

    dataEpisode = await episode
      .json()
      .then((data: { bucketdata: { title: string }[] }) => {
        return data.bucketdata.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
      });

    dataMovies = []

    dataCollection = dataMovies.concat(dataSeries);
  } else {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  return NextResponse.json({ dataCollection, dataEpisode }, { status: 200 });
}
