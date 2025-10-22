import "modern-normalize";
import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Note Hub",
  description:
    "Note Hub is your personal space to capture ideas, organize thoughts, and plan your day. Keep everything in one place — simple, fast, and distraction-free.",
  openGraph: {
    title: "Note Hub",
    description:
      "Note Hub is a clean, minimalist note-taking app. Quickly create, edit, and manage your notes with ease — the perfect tool to keep your ideas organized.",
    url: "https://08-zustand-red-six.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1080,
        height: 1080,
        alt: "Note Hub preview image",
      },
    ],
    type: "website",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Note Hub",
//   description: "Created by GoIT",
// };

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanStackProvider>
          <Header />

          {children}
          {modal}

          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
        </TanStackProvider>
      </body>
    </html>
  );
}
