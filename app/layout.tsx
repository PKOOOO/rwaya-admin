import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ModalProvider } from "@/providers/modal-provider";

import "./globals.css";

import type { Metadata } from "next";
import { ToastProvider } from "@/providers/toast-provider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // Add font weights as needed
});


export const metadata: Metadata = {
  title: "Digihipo Admin",
  description: "Digihipo Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={roboto.className}>
        <ToastProvider />
        <ModalProvider />
        {children}
        </body>
    </html>
    </ClerkProvider>
  );
}
