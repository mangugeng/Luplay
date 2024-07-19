import CollectionPage from "@/components/SearchPage/Collection";
import { Metadata } from "next";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  return {
    title: "Luplay | Hasil pencarian koleksi untuk " + searchParams.q,
    description: "...",
  };
}

export default function Page() {
  return <CollectionPage></CollectionPage>;
}
