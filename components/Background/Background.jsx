'use client'

import { useEffect } from 'react'

const basePath = process.env.NODE_ENV === 'production' ? '/arc-riders-events' : ''

export default function Background() {
  useEffect(() => {
    const bgImage = `url('${basePath}/images/arc.webp')`
    document.documentElement.style.setProperty('--bg-image', bgImage)
  }, [])

  return null
}

