"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Lock, Unlock } from 'lucide-react' 

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const iconTextColor = isHome ? "text-white" : "text-gray-500";
  const logoSrc = isHome ? "/logo-white.png" : "/logo-black.png";


  return (
    <nav className="flex p-2 justify-between items-center z-10">
      <Link href="/">
        <Image src={logoSrc} alt="Logo" width={70} height={40} priority />
      </Link>

      <div className="flex justify-end items-center cursor-pointer p-4 gap-4 h-16">
        <SignedOut>
          <SignInButton mode="redirect" redirectUrl="/dashboard">
            <div className={`flex items-center gap-1 hover:opacity-80 cursor-pointer ${iconTextColor}`}>
              <Lock size={20} className={iconTextColor} />
              <span className="text-sm">Log ind</span>
            </div>
          </SignInButton>
        </SignedOut>

         <SignedIn>
          <UserButton signOutUrl="/" forceRedirectUrl="/" />
         <Link href="/dashboard" className={`flex items-center gap-1 hover:opacity-80 ${iconTextColor}`}>
            <Unlock size={20} className={iconTextColor} />
            <span className="text-sm">Dashboard</span>
          </Link>
        </SignedIn>
      </div>
    </nav>
  );
}
