import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Providers } from "@/components/providers";
import { env } from "@/env";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Web3 App Template - Web3 Starter Kit",
    template: "%s | Web3 App Template - Web3 Starter Kit",
  },
  description: "Web3 App Template - Web3 Starter Kit",
  keywords: ["web3", "web3 app template", "ethereum", "web3 starter kit"],
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: env.NEXT_PUBLIC_APP_URL,
    title: "Web3 App Template - Web3 Starter Kit",
    description: "Web3 App Template - Web3 Starter Kit",
    siteName: "Web3 App Template - Web3 Starter Kit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web3 App Template - Web3 Starter Kit",
    description: "Web3 App Template - Web3 Starter Kit",
    site: "@web3starterkit",
    creator: "@web3starterkit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
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
        <Providers>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
