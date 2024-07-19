import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luplay | Nonton Film & Series",
  description: "...",
};

export default function WatchlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
