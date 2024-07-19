
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luplay - Register",
  description: "",
  icons: {
    icon: "/icon.png",
  },
};

export default function SignUpLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <>{children}</>
  }
