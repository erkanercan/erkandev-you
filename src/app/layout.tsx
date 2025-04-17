import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { PhraseStoreProvider } from "@/components/phrase-provider";
import { PostHogProvider } from "@/components/PostHogProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Who Are You Today? - you.erkan.dev",
  description:
    "Discover your daily magical identity through fantasy cards. Flip, reveal, and explore your mystical self!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen text-white")}>
        <PostHogProvider>
          <PhraseStoreProvider>{children}</PhraseStoreProvider>
          <Toaster />
        </PostHogProvider>
      </body>
    </html>
  );
}
