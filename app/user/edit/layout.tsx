import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luplay - Edit Profil",
  description: "",
  icons: {
    icon: "/icon.png",
  },
};

export default function EditProfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
