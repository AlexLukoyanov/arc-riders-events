'use client'

import { useState, useEffect, useMemo } from 'react'

export function useEventFilter(events) {
  const [selectedEvents, setSelectedEvents] = useState([])
  const [isInitialized, setIsInitialized] = useState(false)

  const allUniqueEventNames = useMemo(() => {
    return [...new Set(events.map(event => event.name))].sort()
  }, [events])

  useEffect(() => {
    if (!isInitialized && allUniqueEventNames.length > 0) {
      setSelectedEvents(allUniqueEventNames)
      setIsInitialized(true)
    }
  }, [allUniqueEventNames, isInitialized])

  return {
    selectedEvents,
    setSelectedEvents,
    allUniqueEventNames
  }
}

