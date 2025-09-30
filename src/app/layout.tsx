import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lottie Files by CJ",
  description: "Lottie Files 모음 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
