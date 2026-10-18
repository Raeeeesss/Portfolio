import { Corinthia, Cormorant_Garamond, Croissant_One, Jim_Nightshade, Mea_Culpa, Playfair_Display } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const meaCulpa = Mea_Culpa({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mea-culpa",
  display: "swap",
});

const jimNightshade = Jim_Nightshade({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jim-nightshade",
  display: "swap",
});

const corinthia = Corinthia({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-corinthia",
  display: "swap",
});

const croissantOne = Croissant_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-croissant",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "Mohammed Raees — Full Stack Developer & Software Engineer",
  description:
    "Full Stack Developer & Software Engineer building AI-powered SaaS products and immersive digital experiences across the modern stack.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${meaCulpa.variable} ${jimNightshade.variable} ${corinthia.variable} ${croissantOne.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
