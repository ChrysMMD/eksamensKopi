'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from './components/Button'
import PageWrapper from './components/PageWrapper'

export default function Home() {

  return (
    <main
      className="max-h-screen flex items-center justify-center text-white"
    >

      {/* Content */}
      <section className="z-10 text-center px-4">
        <h1 className="text-white text-5xl font-h1 md:text-6xl font-bold mb-4">Velkommen til Events-portalen</h1>
        <h2 className="text-xl text-[var(--color-sand)] md:text-2xl font-light mb-8">Find spændende begivenheder nær dig</h2>
        
<Link href="/events">
  <Button size="lg" variant="primary">
    Udforsk events
  </Button>
</Link>
      </section>
    </main>
  )
}
