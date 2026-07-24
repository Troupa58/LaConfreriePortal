import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { MobileNav } from "@/components/MobileNav";
import { AuthButton } from "@/components/AuthButton";

export const metadata: Metadata = {
  title: "La Confrérie — Portail officiel",
  description: "Évènements et rosters de La Confrérie sur uaRO.",
  icons: { icon: "/crest.svg" }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <header className="siteHeader">
          <nav className="nav container">
            <Link className="brand" href="/">
              <Image src="/crest.svg" alt="" width={44} height={52} priority />
              <span>
                <strong>La Confrérie</strong>
                <small>Portail officiel</small>
              </span>
            </Link>
            <MobileNav />
            <div className="desktopAuth">
              <AuthButton />
            </div>
          </nav>
        </header>
        {children}
        <footer>
          <div className="container footerContent">
            <p>La Confrérie • Guilde francophone uaRO</p>
            <p>Roster partagé avec PostgreSQL</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
