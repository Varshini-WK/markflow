import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BookmarkProvider } from "@/context/bookmark-context";
import { AuthProvider } from "@/context/auth-context";
import { ShellLayout } from "@/components/layouts/shell-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Markflow - Bookmark Manager",
  description: "Effortless Bookmark Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[var(--background)] text-[var(--foreground)] overflow-hidden`}>
        <AuthProvider>
          <BookmarkProvider>
            <ShellLayout>
              {children}
            </ShellLayout>
          </BookmarkProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
