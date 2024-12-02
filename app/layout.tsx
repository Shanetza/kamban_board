import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider, SignedOut, SignedIn, UserButton, SignInButton } from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "JPBC",
  description: "KANBAN-BOARD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SignedOut>
          <div className="flex justify-center items-center h-screen">
            <SignInButton  />
          </div>
          </SignedOut>
          <SignedIn>
            {/* <UserButton /> */}
            {children}
          </SignedIn>
        {/* {children} */}
      </body>
      </html>
    </ClerkProvider>
  );
}
