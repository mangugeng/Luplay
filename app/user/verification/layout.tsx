
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luplay - Email Verification",
  description: "",
  icons: {
    icon: "/icon.png",
  },
};

export default function VerificationEmailLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <>{children}</>
  }
