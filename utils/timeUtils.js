export function convertToMoscowTime(utcTime) {
  if (utcTime === '24:00') {
    return '03:00'
  }
  
  const [hours, minutes] = utcTime.split(':').map(Number)
  let moscowHours = hours + 3
  
  if (moscowHours >= 24) {
    moscowHours = moscowHours - 24
  }
  
  return `${String(moscowHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

export function getMoscowTime() {
  const now = new Date()
  const moscowTimeString = now.toLocaleString('en-US', { 
    timeZone: 'Europe/Moscow',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  })
  const [hours, minutes] = moscowTimeString.split(':').map(Number)
  return {
    hours,
    minutes,
    totalMinutes: hours * 60 + minutes
  }
}

export function isTimeSlotActive(start, end) {
  const moscowTime = getMoscowTime()
  
  const [startHour, startMin] = start.split(':').map(Number)
  const [endHour, endMin] = end.split(':').map(Number)
  
  const startTime = startHour * 60 + startMin
  let endTime = endHour * 60 + endMin
  
  if (endHour === 24 || end === '24:00') {
    endTime = 24 * 60
  }
  
  if (endTime < startTime) {
    return moscowTime.totalMinutes >= startTime || moscowTime.totalMinutes < endTime
  }
  
  return moscowTime.totalMinutes >= startTime && moscowTime.totalMinutes < endTime
}

export function isTimeSlotUpcoming(start, end) {
  const moscowTime = getMoscowTime()
  
  const [startHour, startMin] = start.split(':').map(Number)
  const [endHour, endMin] = end.split(':').map(Number)
  
  const startTime = startHour * 60 + startMin
  let endTime = endHour * 60 + endMin
  
  if (endHour === 24 || end === '24:00') {
    endTime = 24 * 60
  }
  
  if (endTime < startTime) {
    return moscowTime.totalMinutes < startTime && moscowTime.totalMinutes >= endTime
  }
  
  return moscowTime.totalMinutes < startTime
}

export function getNextStartTime(start) {
  const moscowTime = getMoscowTime()
  const [startHour, startMin] = start.split(':').map(Number)
  const startTime = startHour * 60 + startMin
  
  if (moscowTime.totalMinutes >= startTime) {
    return startTime + 24 * 60
  }
  
  return startTime
}

export function formatTime(time) {
  return time
}

