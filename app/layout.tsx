import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Webmahsul - Akıllı Yazılımlarla İşinizi Güçlendiriyoruz",
  description: "Sporcu takibi, antrenman planlama, turnuva yönetimi ve Active Directory çözümlerinde uzman yazılım ekibimizle işletmenize özel dijital çözümler üretiyoruz.",
  keywords: "yazılım, sporcu takip, antrenman planlama, turnuva yönetimi, active directory, SCADA, IoT, siber güvenlik",
  authors: [{ name: "Webmahsul" }],
  openGraph: {
    title: "Webmahsul - Akıllı Yazılımlarla İşinizi Güçlendiriyoruz",
    description: "Modern yazılım çözümleri ile dijital dönüşüm yolculuğunuzda yanınızdayız",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icons/logo-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/logo-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/logo-48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/icons/logo-32.png",
    apple: [
      { url: "/icons/logo-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  themeColor: "#f97316",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
