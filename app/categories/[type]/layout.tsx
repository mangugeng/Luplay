import type { Metadata } from "next";

type Props = {
  params: { type: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title:
      "Semua " +
      params.type.charAt(0).toUpperCase() +
      params.type.slice(1) +
      " Original Luplay",
    description: "...",
  };
}

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
