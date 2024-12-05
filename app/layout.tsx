import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AIAssistant from './components/AIAssistant';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "绿色行动",
  description: "让我们一起为地球做出改变",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        {children}
        <AIAssistant />
      </body>
    </html>
  );
}
