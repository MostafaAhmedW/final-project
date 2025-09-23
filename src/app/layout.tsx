import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./_Comopnents/Navbar/Navbar";
import Footer from "./_Comopnents/Footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MySessionProvider from "./_Comopnents/MySessionProvider/MySessionProvider";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fresh Cart",
  description: "Fresh Cart - Your trusted e-commerce store for fresh products",
  keywords: ["Fresh Cart", "E-commerce", "Online Grocery", "Fresh Food", "Buy Online"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MySessionProvider>
          <ThemeProvider  attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>

            <Navbar />

            {children}

            <Toaster />

            <Footer />

          </ThemeProvider>

        </MySessionProvider>

      </body>
    </html>
  );
}
