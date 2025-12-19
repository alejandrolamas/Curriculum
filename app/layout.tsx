import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Alejandro Lamas | Neural OS - Full Stack Developer",
  description: "Full Stack Developer & Project Manager con +10 años de experiencia. Ex-CTO, fundador de empresas. Especialista en desarrollo web, gestión y marketing digital.",
  keywords: "Full Stack Developer, Project Manager, React, Next.js, PHP, WordPress, Marketing Digital, CTO, Desarrollo Web, Alejandro Lamas",
  authors: [{ name: "Alejandro Lamas" }],
  creator: "Alejandro Lamas",
  publisher: "Alejandro Lamas",
  metadataBase: new URL("https://alejandrolamas.es"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://alejandrolamas.es",
    title: "Alejandro Lamas | Neural OS - Full Stack Developer",
    description: "Full Stack Developer & Project Manager con +10 años de experiencia. Ex-CTO, fundador de empresas tech. Especialista en React, Next.js, PHP y gestión de proyectos.",
    siteName: "Alejandro Lamas - Neural OS",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alejandro Lamas - Full Stack Developer & Project Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alejandro Lamas | Neural OS - Full Stack Developer",
    description: "Full Stack Developer & Project Manager con +10 años de experiencia. Ex-CTO, fundador de empresas tech.",
    images: ["/og-image.jpg"],
    creator: "@alejandrolamas",
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
  verification: {
    google: "tu-codigo-de-verificacion", // Reemplazar con el código real de Google Search Console
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XB29N2235Z"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XB29N2235Z');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                backdropFilter: 'blur(20px)',
              },
              success: {
                iconTheme: {
                  primary: 'var(--color-success)',
                  secondary: 'var(--bg-primary)',
                },
              },
              error: {
                iconTheme: {
                  primary: 'var(--color-danger)',
                  secondary: 'var(--bg-primary)',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
