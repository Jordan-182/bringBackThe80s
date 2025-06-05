import Header from "@/ui/Header";
import type { Metadata } from "next";
import { Caveat, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vice Blog par Tommy Vercetti",
  description:
    "Découvrez comment j'ai pris le contrôle de Vice City à travers mon blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${montserrat.variable} ${caveat.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
