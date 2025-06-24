import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marriage Biodata Generator | Modern, Beautiful, Free",
  description: "Create a beautiful, professional marriage biodata online. Modern, clean, and easy to use for everyone.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>Marriage Biodata Generator | Modern, Beautiful, Free</title>
        <meta name="description" content="Create a beautiful, professional marriage biodata online. Modern, clean, and easy to use for everyone." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
