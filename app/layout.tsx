import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Confrérie — Portail officiel",
  description:
    "Le quartier général numérique de La Confrérie, guilde francophone sur uaRO.",
  icons: {
    icon: "/crest.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
