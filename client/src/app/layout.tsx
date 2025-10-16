import type { Metadata } from "next";
import { roboto } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChessGame",
  description: "Playing Chess Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>{children}</body>
    </html>
  );
}
