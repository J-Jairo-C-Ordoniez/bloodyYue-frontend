import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import ChatFloating from "../components/organisms/ChatFloating";
import { Toaster } from "sonner";
import SmoothScroll from "../components/atoms/smoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BloodyYue | Marketplace & Comisiones de Arte Digital",
  description: "La plataforma definitiva para artistas digitales. Compra y vende arte, gestiona comisiones y conecta con creadores en BloodyYue.",
  keywords: ["arte digital", "comisiones de arte", "marketplace de arte", "dibujo", "ilustración", "artistas", "bloodyyue"],
  authors: [{ name: "BloodyYue Team" }],
  openGraph: {
    title: "BloodyYue | Marketplace & Comisiones de Arte Digital",
    description: "Conecta con los mejores artistas digitales y gestiona tus comisiones de forma sencilla.",
    url: "https://bloodyyue.com",
    siteName: "BloodyYue",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BloodyYue | Marketplace & Comisiones de Arte Digital",
    description: "La plataforma definitiva para artistas digitales y entusiastas del arte.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-transparent`}>
        <SmoothScroll>
          {children}
          <ChatFloating />
          <Toaster position="top-right" richColors />
        </SmoothScroll>
      </body>
    </html>
  );
}
