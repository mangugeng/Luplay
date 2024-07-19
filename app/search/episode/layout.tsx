import type { Metadata } from "next";

type Props = {
  params: { query:string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  return {
    title: "Luplay | Hasil pencarian episode untuk ",
    description: "...",
  };
}

export default function SearchEpisodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
