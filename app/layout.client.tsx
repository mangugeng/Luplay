"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "@/context/auth-context";
import StyledComponentsRegistry from './registry';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-black xl:bg-pallete-5"}>
        <ToastContainer />
        <AuthContextProvider>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </AuthContextProvider>
      </body>
    </html>
  );
}
