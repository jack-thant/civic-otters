import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"
import { ClerkProvider } from "@clerk/nextjs";
import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Civic Otters",
  description: "An application created for Social Responsibility (Hack Singapore)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
      <body className={inter.className}>
        <Topbar/>
        <main className='flex flex-row'>
          <LeftSidebar/>
          <section className='main-container'>
            <div className='w-full max-w-4xl'>
              {children}
            </div>
          </section>
        </main>
        <Bottombar/>
      </body>
      </ClerkProvider>
    </html>
  );
}
