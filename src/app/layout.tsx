import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Is Mars Colder?",
  description: "Compare the weather on Mars to your location.",
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
