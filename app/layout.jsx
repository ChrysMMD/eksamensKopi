import "./globals.css";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Statens Museum for Kunst– Eventportalen",
  description: "Udforsk og book arrangementer på Statens Museum for Kunst.",
  keywords: ["kunst", "udstillinger", "arrangementer", "book", "danmark"],
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      signInUrl="/signin"
      signUpUrl="/signup"
      fallbackRedirectUrl="/dashboard"
      telemetry={false}
    >
      <html lang="da">
        <body className={inter.variable}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
