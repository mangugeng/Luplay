
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luplay - Reset Password",
  description: "",
  icons: {
    icon: "/icon.png",
  },
};

export default function ResetPasswordLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <>{children}</>
  }
