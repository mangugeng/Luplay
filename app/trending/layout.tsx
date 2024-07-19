import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luplay | Rekomendasi Film dan Series 2024",
  description: "...",
};

export default function TrendingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
