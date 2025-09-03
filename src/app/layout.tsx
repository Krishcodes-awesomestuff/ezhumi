import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ezhumi - Agriculture Hackathon",
  description: "A hackathon dedicated to agriculture enthusiasts. Hack. Seek. Cultivate.",
  keywords: "agriculture, hackathon, farming, technology, innovation",
  authors: [{ name: "Krishnaprasath" }],
  openGraph: {
    title: "Ezhumi - Agriculture Hackathon",
    description: "A hackathon dedicated to agriculture enthusiasts",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-inter bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
