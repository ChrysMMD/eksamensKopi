"use client";

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Lock, Unlock } from 'lucide-react' 

export default function Nav() {
  return (
    <nav className="flex p-2 justify-between items-center z-10">
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={70} height={40} priority />
      </Link>

      <div className="flex justify-end items-center cursor-pointer p-4 gap-4 h-16">
        <SignedOut>
          <SignInButton mode="redirect" redirectUrl="/dashboard">
           <div className="flex items-center gap-1 text-white hover:opacity-80 cursor-pointer">
              <Lock size={20} />
              <span className="text-sm">Log ind</span>
            </div>
          </SignInButton>
        </SignedOut>

         <SignedIn>
          <UserButton signOutUrl="/" forceRedirectUrl="/" />
         <Link href="/dashboard" className="flex items-center gap-1 text-white hover:opacity-80">
            <Unlock size={20} />
            <span className="text-sm">Dashboard</span>
          </Link>
        </SignedIn>
      </div>
    </nav>
  );
}
