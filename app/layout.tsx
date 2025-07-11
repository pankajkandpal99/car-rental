import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RouteGuard from "@/components/general/RouteGuard";
import { AppProvider } from "@/provider/AppProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <RouteGuard>{children}</RouteGuard>
        </AppProvider>
      </body>
    </html>
  );
}
