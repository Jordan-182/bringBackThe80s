import Footer from "@/ui/Footer";
import Header from "@/ui/Header";
import type { Metadata } from "next";
import "../../app/globals.css";

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
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
