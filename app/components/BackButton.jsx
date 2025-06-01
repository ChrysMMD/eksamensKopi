'use client'

import { useRouter } from 'next/navigation'
import Button from './Button' 

export default function BackButton({ label = 'Tilbage', className = '', size = 'sm' }) {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.back()}
      variant="back"
      size={size}
      className={className}
    >
      {label}
    </Button>
  )
}
