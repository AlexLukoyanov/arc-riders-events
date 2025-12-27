'use client'

import EventAccordion from '../EventAccordion'

function EventsSection({ 
  id, 
  title, 
  eventsByName, 
  translate, 
  filteredTimes, 
  defaultOpen = false,
  showActiveIndicator = false 
}) {
  if (Object.keys(eventsByName).length === 0) return null

  return (
    <section id={id} className="events-section">
      <h2 className="section-title">
        {showActiveIndicator && <span className="active-indicator"></span>}
        {title}
      </h2>
      <div className="accordion-list">
        {Object.entries(eventsByName).map(([eventName, eventData]) => (
          <EventAccordion
            key={`${id}-${eventName}`}
            eventName={eventName}
            eventIcon={eventData.icon}
            mapsData={eventData.maps}
            translate={translate}
            filteredTimes={filteredTimes}
            defaultOpen={defaultOpen}
          />
        ))}
      </div>
    </section>
  )
}

export default EventsSection

