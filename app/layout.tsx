import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JWT Authentication",
  description: "Workflow to create JWT Token and authorize a user after login",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>        
        <div className="bg-gradient-to-tl from-gray-900  via-[#440f50] to-black to-75% h-screen">
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        {children}
        </div>
      </body>
    </html>
  );
}
