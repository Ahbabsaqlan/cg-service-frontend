import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Navbar from "@/components/ui/Navbar";
import CustomCursor from "@/components/ui/CustomCursor"; // <-- Import it

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CG Service LLC | Premium Property Preservation",
  description: "Enterprise ERP for Chowdhury Global Service LLC",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} cursor-none`}> {/* <-- Hide default cursor */}
        <CustomCursor /> {/* <-- Render it here */}
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}