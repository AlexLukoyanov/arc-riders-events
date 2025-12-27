'use client'

import { useMemo } from 'react'
import { 
  isEventActive, 
  isEventUpcoming, 
  isEventUpcomingWithin2Hours,
  getUniqueEvents, 
  getEventNextStartTime,
  filterEventsByNames 
} from '@/utils/eventUtils'

export function useFilteredEvents(events, selectedEvents) {
  const activeEvents = useMemo(() => {
    return filterEventsByNames(
      events.filter(event => isEventActive(event)),
      selectedEvents
    )
  }, [events, selectedEvents])

  const upcomingEvents = useMemo(() => {
    return filterEventsByNames(
      events
        .filter(event => isEventUpcomingWithin2Hours(event))
        .sort((a, b) => getEventNextStartTime(a) - getEventNextStartTime(b)),
      selectedEvents
    )
  }, [events, selectedEvents])

  const uniqueEvents = useMemo(() => {
    return filterEventsByNames(
      getUniqueEvents(events),
      selectedEvents
    )
  }, [events, selectedEvents])

  return { activeEvents, upcomingEvents, uniqueEvents }
}

