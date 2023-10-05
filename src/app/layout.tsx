import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mars Weather",
  description: "Compare the weather on Mars to Earth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
