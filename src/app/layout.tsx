import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SmartInbox",
  description: "SmartInbox - mail",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <main className="">{children}</main>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
