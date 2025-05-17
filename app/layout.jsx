
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider >
    <html lang="da">
      <body className={inter.variable}>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}