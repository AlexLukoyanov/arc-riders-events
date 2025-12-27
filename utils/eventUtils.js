import { isTimeSlotActive, isTimeSlotUpcoming, isTimeSlotUpcomingWithin2Hours, getNextStartTime } from './timeUtils'

export function isEventActive(event) {
  return event.times.some(time => isTimeSlotActive(time.start, time.end))
}

export function isEventUpcoming(event) {
  if (isEventActive(event)) {
    return false
  }
  return event.times.some(time => isTimeSlotUpcoming(time.start, time.end))
}

export function isEventUpcomingWithin2Hours(event) {
  if (isEventActive(event)) {
    return false
  }
  return event.times.some(time => isTimeSlotUpcomingWithin2Hours(time.start, time.end))
}

export function getUniqueEvents(events) {
  const seen = new Set()
  const unique = []
  
  for (const event of events) {
    const key = `${event.name}-${event.map}`
    if (!seen.has(key)) {
      seen.add(key)
      unique.push(event)
    }
  }
  
  return unique
}

export function getActiveTimes(event) {
  return event.times.filter(time => isTimeSlotActive(time.start, time.end))
}

export function getUpcomingTimes(event) {
  return event.times.filter(time => isTimeSlotUpcoming(time.start, time.end))
}

export function getUpcomingTimesWithin2Hours(event) {
  return event.times.filter(time => isTimeSlotUpcomingWithin2Hours(time.start, time.end))
}

export function getEventNextStartTime(event) {
  const upcomingTimes = getUpcomingTimes(event)
  if (upcomingTimes.length === 0) {
    return Infinity
  }
  return Math.min(...upcomingTimes.map(time => getNextStartTime(time.start)))
}

export function groupEventsByName(events) {
  const grouped = {}
  
  events.forEach(event => {
    if (!grouped[event.name]) {
      grouped[event.name] = {
        icon: event.icon,
        maps: {}
      }
    }
    
    if (!grouped[event.name].maps[event.map]) {
      grouped[event.name].maps[event.map] = []
    }
    
    grouped[event.name].maps[event.map].push(event)
  })
  
  return grouped
}

export function filterEventsByNames(eventsList, selectedEventNames) {
  if (selectedEventNames.length === 0) return []
  return eventsList.filter(event => selectedEventNames.includes(event.name))
}

