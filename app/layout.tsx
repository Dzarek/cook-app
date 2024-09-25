import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppProvider } from "@/components/context";

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
      <AppProvider>
        <body className="relative">
          {" "}
          <Navbar />
          {children}
          <Footer />
        </body>
      </AppProvider>
    </html>
  );
}
