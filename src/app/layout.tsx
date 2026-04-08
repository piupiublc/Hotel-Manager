import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StayMaster | Business Dashboard",
  description: "Manage your properties and monitor real-time performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className="bg-background-light text-slate-900 antialiased min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
