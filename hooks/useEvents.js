'use client'

import { useState, useEffect } from 'react'
import { convertToMoscowTime } from '@/utils/timeUtils'
import { fetchEvents } from '@/services/apiService'

export function useEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function loadEvents() {
    try {
      setLoading(true)
      setError(null)
      
      const data = await fetchEvents()
      
      const eventsWithMoscowTime = data.data.map(event => ({
        ...event,
        times: event.times.map(time => ({
          start: convertToMoscowTime(time.start),
          end: convertToMoscowTime(time.end)
        }))
      }))
      setEvents(eventsWithMoscowTime)
    } catch (err) {
      setError(`Ошибка загрузки: ${err.message}. Попробуйте обновить страницу.`)
      console.error('Ошибка загрузки событий:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])

  return { events, loading, error, reload: loadEvents }
}

