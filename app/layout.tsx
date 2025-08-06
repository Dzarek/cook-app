import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

import { AppProvider } from "@/components/authContext";
import { Montserrat, Inconsolata, Dancing_Script } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-montserrat",
  display: "swap",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-inconsolata",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stępki Gotują",
  description: "Przepisy kulinarne stworzone przez rodzine Stępków.",
  manifest: "/manifest.json",
  keywords: ["gotowanie", "przepisy"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${montserrat.variable} ${inconsolata.variable} ${dancingScript.variable}`}
    >
      <AppProvider>
        <body className="relative">
          <Toaster
            position="top-center"
            containerStyle={{
              top: 100,
            }}
          />
          <Navbar />
          {children}
          <Footer />
        </body>
      </AppProvider>
    </html>
  );
}
