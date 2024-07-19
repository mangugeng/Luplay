
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luplay - Masuk",
  description: "",
  icons: {
    icon: "/icon.png",
  },
};

export default function SignInLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <>{children}</>
  }
