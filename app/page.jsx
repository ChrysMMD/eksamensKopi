// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Button from './components/Button'
import Nav from './components/Nav'

export default function Home() {
  const [backgroundUrl, setBackgroundUrl] = useState('')

  const imageId = 'KKSgb22230'
  const API_URL = 'https://api.smk.dk/api/v1/art/?filters=has_image:true&size=100'


  useEffect(() => {
    async function fetchImage() {
      try {
        const res = await fetch('https://api.smk.dk/api/v1/art/search?keys=%2A&offset=0&rows=100')
        const data = await res.json()
        const items = data.items
  
        if (!items || items.length === 0) {
          setBackgroundUrl('https://iip-thumb.smk.dk/iiif/jp2/4b29bb21t_kksgb22213.tif.jp2/full/!1024,/0/default.jpg')
          return
        }
  
        const randomItem = items[Math.floor(Math.random() * items.length)]
        setBackgroundUrl(randomItem.image || randomItem.image_thumbnail)
      } catch (err) {
        console.error('Fejl ved hentning af billede:', err)
        setBackgroundUrl('https://iip-thumb.smk.dk/iiif/jp2/4b29bb21t_kksgb22213.tif.jp2/full/!1024,/0/default.jpg')
      }
    }
  
    fetchImage()
  }, [])
  
  

  return (
    <main
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center text-white"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Header */}
      <Nav/>

      {/* Content */}
      <section className="z-10 text-center px-4">
        <h1 className="text-5xl font-h1 md:text-6xl font-bold mb-4">Velkommen til Eventportalen</h1>
        <h2 className="text-xl md:text-2xl font-light mb-8">Find spændende begivenheder nær dig</h2>
        
<Link href="/events">
  <Button size="lg" variant="primary">
    Udforsk events
  </Button>
</Link>
      </section>
    </main>
  )
}
