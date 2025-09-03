import { Montserrat, DM_Sans } from "next/font/google";
import "../styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  title: "Attaboy Dog Training",
  description:
    "Professional dog training in Dublin, Ireland. Positive reinforcement, obedience lessons, puppy training, and behavior solutions. Anything is paw-sible 🐾",
  keywords: [
    "dog training",
    "puppy obedience",
    "positive reinforcement",
    "Attaboy Dog Training",
  ],
  authors: [{ name: "Attaboy Dog Training" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Attaboy Dog Training",
    description:
      "Professional dog training in Dublin, Ireland. Positive reinforcement, obedience lessons, puppy training, and behavior solutions. Anything is paw-sible 🐾",
    url: "https://attaboydogtraining.ie",
    siteName: "Attaboy Dog Training",
    images: [
      {
        url: "https://attaboydogtraining.ie/logo-transparent.png",
        width: 1200,
        height: 600,
        alt: "Dog Training with Attaboy",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Attaboy Dog Training",
    description:
      "Professional dog training in Dublin, Ireland. Positive reinforcement, obedience lessons, puppy training, and behavior solutions. Anything is paw-sible 🐾",
    images: ["https://attaboydogtraining.ie/logo-transparent.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
