'use client'

import { usePathname } from 'next/navigation'
import Nav from './Nav'

export default function PageWrapper({ children }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

return (
    <div className={isHome ? 'bg-hero relative min-h-screen' : 'min-h-screen'}>
   
      {isHome && (
        <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />
      )}


      <div className="relative z-10">
        <Nav />
      </div>

      
      {children}
    </div>
  )
}