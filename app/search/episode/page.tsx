import CollectionPage from "@/components/SearchPage/Collection";
import EpisodePage from "@/components/SearchPage/Episode";
import { Metadata } from "next";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  return {
    title: "Luplay | Hasil pencarian episode untuk " + searchParams.q,
    description: "...",
  };
}

export default function Page() {
  return <EpisodePage></EpisodePage>;
}
