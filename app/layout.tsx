import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Stępki Gotują",
  description: "Przepisy kulinarne stworzone przez rodzine Stępków.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="">
        {" "}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
