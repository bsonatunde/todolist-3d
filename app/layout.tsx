"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState, createContext, useContext, ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// theme context to share dark mode state
interface ThemeContextType {
  dark: boolean;
  setDark: (d: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  dark: false,
  setDark: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function RootLayout({
  children,
}: Readonly<{
  children:
    | React.ReactNode
    | ((dark: boolean, setDark: (d: boolean) => void) => React.ReactNode);
}>) {
  const [dark, setDark] = useState(false);

  return (
    <html lang="en" className={dark ? "dark" : ""}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 dark:bg-gray-900`}
      >
        <ThemeContext.Provider value={{ dark, setDark }}>
          {children as ReactNode}
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
