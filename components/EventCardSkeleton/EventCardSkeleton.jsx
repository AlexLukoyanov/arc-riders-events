'use client'

import './EventCardSkeleton.css'

function EventCardSkeleton() {
  return (
    <div className="event-card-skeleton">
      <div className="skeleton-header">
        <div className="skeleton-icon"></div>
        <div className="skeleton-info">
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line skeleton-subtitle"></div>
        </div>
      </div>
      <div className="skeleton-times">
        <div className="skeleton-line skeleton-times-title"></div>
        <div className="skeleton-time-slots">
          <div className="skeleton-time-slot"></div>
          <div className="skeleton-time-slot"></div>
          <div className="skeleton-time-slot"></div>
        </div>
      </div>
    </div>
  )
}

export default EventCardSkeleton

