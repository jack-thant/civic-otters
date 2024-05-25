import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "./globals.css";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";
import Topbar from "@/components/shared/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Civic Otters",
  description: "A social app for volunteers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang='en'>
        <body className={inter.className}>
          <Topbar />
          <main className='flex flex-row h-screen'>
            <LeftSidebar />
            <section className='flex-grow'>
              <div className='w-full h-full'>{children}</div>
            </section>
          </main>
          {/* <Bottombar /> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
