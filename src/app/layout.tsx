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
      <head>
        <link href="https://techhub.social/@masters" rel="me" />
      </head>
      <body>{children}</body>
    </html>
  );
}
