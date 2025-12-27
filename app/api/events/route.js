import { NextResponse } from 'next/server'
import { API_URL } from '@/services/constants'

export async function GET() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 60 } // Кеширование на 60 секунд
    })
    
    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.status}`)
    }
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Ошибка при получении событий:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

