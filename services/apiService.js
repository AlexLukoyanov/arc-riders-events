import { API_URL } from './constants'

async function fetchWithProxy(apiUrl, proxyIndex = 0) {
  // В статическом экспорте API routes не работают, используем только внешние прокси
  const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  
  if (isDev) {
    try {
      const response = await fetch('/api/events')
      
      if (!response.ok) {
        throw new Error(`Ошибка прокси: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.warn('Next.js API route не сработал, пробуем внешние прокси:', error)
    }
  }
  
  const proxies = [
    {
      url: `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`,
      parser: (data) => data.contents ? JSON.parse(data.contents) : data
    },
    {
      url: `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`,
      parser: (data) => data
    },
    {
      url: `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(apiUrl)}`,
      parser: (data) => data
    },
    {
      url: `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(apiUrl)}`,
      parser: (data) => data
    }
  ]
  
  if (proxyIndex >= proxies.length) {
    throw new Error('Все прокси недоступны. Попробуйте обновить страницу позже.')
  }
  
  try {
    const proxy = proxies[proxyIndex]
    const response = await fetch(proxy.url, {
      headers: {
        'Accept': 'application/json',
      }
    })
    
    if (!response.ok) {
      throw new Error(`Ошибка прокси: ${response.status}`)
    }
    
    const proxyData = await response.json()
    return proxy.parser(proxyData)
  } catch (error) {
    console.warn(`Прокси ${proxyIndex + 1} не сработал:`, error)
    if (proxyIndex < proxies.length - 1) {
      return fetchWithProxy(apiUrl, proxyIndex + 1)
    }
    throw error
  }
}

export async function fetchEvents() {
  const data = await fetchWithProxy(API_URL)
  
  if (!data.data || data.data.length === 0) {
    throw new Error('События не найдены')
  }
  
  return data
}

