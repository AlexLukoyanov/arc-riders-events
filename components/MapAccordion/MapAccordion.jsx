'use client'

import { useState } from 'react'
import './MapAccordion.css'
import { isTimeSlotActive } from '@/utils/timeUtils'

function MapAccordion({ mapName, events, translate, filteredTimes, defaultOpen = false }) {
  const hasActiveEvents = events.some(event => {
    const times = filteredTimes ? filteredTimes(event) : event.times
    return times.some(time => isTimeSlotActive(time.start, time.end))
  })
  
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const translatedMap = translate(mapName, 'map')

  return (
    <div className={`map-accordion ${isOpen ? 'open' : ''} ${hasActiveEvents ? 'has-active' : ''}`}>
      <button 
        className="map-accordion-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="map-header-content">
          <span className="map-name">🗺️ {translatedMap}</span>
          <span className="map-events-count">{events.length} {events.length === 1 ? 'событие' : 'событий'}</span>
          {hasActiveEvents && <span className="active-badge">Активно</span>}
        </div>
        <span className="accordion-icon">{isOpen ? '▼' : '▶'}</span>
      </button>
      
      {isOpen && (
        <div className="map-accordion-content">
          {events.map((event, eventIndex) => {
            const translatedName = translate(event.name, 'event')
            const timesToShow = filteredTimes ? filteredTimes(event) : event.times
            
            return (
              <div key={eventIndex} className="map-event-item">
                <div className="map-event-header">
                  <img
                    src={event.icon}
                    alt={translatedName}
                    className="map-event-icon"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22%3E%3Crect fill=%22%23333%22 width=%2240%22 height=%2240%22/%3E%3Ctext x=%2220%22 y=%2225%22 text-anchor=%22middle%22 fill=%22%23fff%22 font-size=%2210%22%3E?%3C/text%3E%3C/svg%3E'
                    }}
                  />
                  <span className="map-event-name">{translatedName}</span>
                </div>
                <div className="map-event-times">
                  {timesToShow.map((time, timeIndex) => {
                    const isActive = isTimeSlotActive(time.start, time.end)
                    return (
                      <span
                        key={timeIndex}
                        className={`map-time-slot ${isActive ? 'active' : ''}`}
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

export default MapAccordion

