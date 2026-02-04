import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import  { QueryProvider } from "@/providers/queryProvider";
import Navbar from "./_component/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI- Mock Interview",
  description: "CountryEdu  and Abhishek & Company",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <QueryProvider>
          <Navbar />

          {children}

        </QueryProvider>

        <Toaster />
      </body>
    </html>
  );
}
