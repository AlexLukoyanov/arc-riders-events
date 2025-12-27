'use client'

import { useState } from 'react'
import './EventAccordion.css'
import { isTimeSlotActive } from '@/utils/timeUtils'

function EventAccordion({ eventName, eventIcon, mapsData, translate, filteredTimes, defaultOpen = false }) {
  const translatedName = translate(eventName, 'event')
  
  const hasActiveTimes = Object.values(mapsData).some(mapEvents => {
    return mapEvents.some(event => {
      const times = filteredTimes ? filteredTimes(event) : event.times
      return times.some(time => isTimeSlotActive(time.start, time.end))
    })
  })
  
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={`event-accordion ${isOpen ? 'open' : ''} ${hasActiveTimes ? 'has-active' : ''}`}>
      <button 
        className="event-accordion-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="event-header-content">
          <img
            src={eventIcon}
            alt={translatedName}
            className="event-accordion-icon"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Crect fill=%22%23333%22 width=%2260%22 height=%2260%22/%3E%3Ctext x=%2230%22 y=%2235%22 text-anchor=%22middle%22 fill=%22%23fff%22 font-size=%2212%22%3E?%3C/text%3E%3C/svg%3E'
            }}
          />
          <span className="event-accordion-name">{translatedName}</span>
          <span className="event-maps-count">
            {Object.keys(mapsData).length} {Object.keys(mapsData).length === 1 ? 'карта' : 'карт'}
          </span>
          {hasActiveTimes && <span className="active-badge">Активно</span>}
        </div>
        <span className="accordion-icon">{isOpen ? '▼' : '▶'}</span>
      </button>
      
      {isOpen && (
        <div className="event-accordion-content">
          {Object.entries(mapsData).map(([mapName, mapEvents]) => {
            const translatedMap = translate(mapName, 'map')
            
            const allTimes = []
            mapEvents.forEach(event => {
              const times = filteredTimes ? filteredTimes(event) : event.times
              allTimes.push(...times)
            })
            
            const uniqueTimes = Array.from(
              new Map(allTimes.map(time => [`${time.start}-${time.end}`, time])).values()
            )
            
            return (
              <div key={mapName} className="event-map-item">
                <div className="event-map-header">
                  <span className="event-map-name">🗺️ {translatedMap}</span>
                </div>
                <div className="event-map-times">
                  {uniqueTimes.map((time, timeIndex) => {
                    const isActive = isTimeSlotActive(time.start, time.end)
                    return (
                      <span
                        key={timeIndex}
                        className={`event-time-slot ${isActive ? 'active' : ''}`}
                      >
                        {time.start} - {time.end}
                      </span>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default EventAccordion

