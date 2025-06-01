"use client";

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Nav() {
  return (
    <nav className="absolute top-4 left-4 right-4 flex p-2 justify-between items-center z-10">
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={70} height={40} priority />
      </Link>

      <div className="flex justify-end items-center cursor-pointer p-4 gap-4 h-16">
        <SignedOut>
          <SignInButton mode="redirect" redirectUrl="/dashboard">
            <span className="text-white border border-white px-4 py-2 rounded hover:bg-gray-300/30">
              Log ind
            </span>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton signOutUrl="/" forceRedirectUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}
