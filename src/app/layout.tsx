import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/toogle-mode";
import { NextAuthProvider } from "@/lib/providers";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Astral - The social media for the stars",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NextAuthProvider>
        <html lang="en" suppressHydrationWarning>
          <head />
          <body className="flex flex-col items-center h-screen justify-between dark:bg-black bg-white z-10 dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="absolute right-4 z-10 top-4">
                <ModeToggle />
              </div>
              {children}
            </ThemeProvider>
          </body>
        </html>
      </NextAuthProvider>
    </>
  );
}
