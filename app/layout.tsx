import type { Metadata } from "next";
import { Syne, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetmono = JetBrains_Mono({
  variable: "--font-jetmono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alejandrolamas.es"),
  title: {
    default: "Alejandro Lamas — Technical Project Manager · E-commerce",
    template: "%s — Alejandro Lamas",
  },
  description:
    "Technical Project Manager especializado en e-commerce internacional. Shopify Plus, Liquid, GraphQL y gestión de equipos. Dirijo la plataforma de Yodeyma y Verset en más de 27 países.",
  keywords: [
    "Technical Project Manager",
    "Shopify Plus",
    "E-commerce",
    "Liquid",
    "GraphQL",
    "Project Manager Madrid",
    "Alejandro Lamas",
  ],
  authors: [{ name: "Alejandro Lamas" }],
  creator: "Alejandro Lamas",
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://alejandrolamas.es",
    siteName: "Alejandro Lamas",
    title: "Alejandro Lamas — Technical Project Manager · E-commerce",
    description:
      "Dirijo producto, equipo y código. E-commerce internacional en Shopify Plus: Yodeyma y Verset en más de 27 países.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Alejandro Lamas" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alejandro Lamas — Technical Project Manager · E-commerce",
    description:
      "Dirijo producto, equipo y código. E-commerce internacional en Shopify Plus.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${grotesk.variable} ${jetmono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
