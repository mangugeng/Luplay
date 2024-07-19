import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luplay - Profil",
  description: "",
  icons: {
    icon: "/icon.png",
  },
};

export default function ProfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
