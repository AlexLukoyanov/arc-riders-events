'use client'

import './EventCard.css'
import { isTimeSlotActive } from '@/utils/timeUtils'

function EventCard({ event, translate, filteredTimes }) {
  const translatedName = translate(event.name, 'event')
  const translatedMap = translate(event.map, 'map')

  const timesToShow = filteredTimes || event.times

  const handleImageError = (e) => {
    e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2260%22 height=%2260%22%3E%3Crect fill=%22%23333%22 width=%2260%22 height=%2260%22/%3E%3Ctext x=%2230%22 y=%2235%22 text-anchor=%22middle%22 fill=%22%23fff%22 font-size=%2212%22%3E?%3C/text%3E%3C/svg%3E'
  }

  return (
    <div className="event-card">
      <div className="event-header">
        <img
          src={event.icon}
          alt={translatedName}
          className="event-icon"
          onError={handleImageError}
        />
        <div className="event-info">
          <div className="event-name">{translatedName}</div>
          <div className="event-map">🗺️ {translatedMap}</div>
        </div>
      </div>
      <div className="event-times">
        <div className="times-title">Время проведения (МСК):</div>
        {timesToShow.map((time, index) => {
          const isActive = isTimeSlotActive(time.start, time.end)
          return (
            <span
              key={index}
              className={`time-slot ${isActive ? 'active' : ''}`}
            >
              {time.start} - {time.end}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default EventCard

