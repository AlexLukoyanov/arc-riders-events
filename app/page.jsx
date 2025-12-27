'use client'

import { useMemo } from 'react'
import EventCardSkeleton from '@/components/EventCardSkeleton'
import EventFilter from '@/components/EventFilter'
import EventsSection from '@/components/EventsSection'
import PageHeader from '@/components/PageHeader'
import { useEvents } from '@/hooks/useEvents'
import { useEventFilter } from '@/hooks/useEventFilter'
import { useFilteredEvents } from '@/hooks/useFilteredEvents'
import { translate } from '@/utils/translations'
import { getActiveTimes, getUpcomingTimes, getUpcomingTimesWithin2Hours, groupEventsByName } from '@/utils/eventUtils'
import './page.css'

export default function Home() {
  const { events, loading, error } = useEvents()
  const { selectedEvents, setSelectedEvents } = useEventFilter(events)
  const { activeEvents, upcomingEvents, uniqueEvents } = useFilteredEvents(events, selectedEvents)

  const activeEventsByName = useMemo(() => groupEventsByName(activeEvents), [activeEvents])
  const upcomingEventsByName = useMemo(() => groupEventsByName(upcomingEvents), [upcomingEvents])
  const allEventsByName = useMemo(() => groupEventsByName(uniqueEvents), [uniqueEvents])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <PageHeader
        activeEvents={activeEvents}
        upcomingEvents={upcomingEvents}
        uniqueEvents={uniqueEvents}
        loading={loading}
        error={error}
        onScrollToSection={scrollToSection}
      />
      
      <div className="container">
        {!loading && !error && events.length > 0 && (
          <EventFilter
            events={events}
            selectedEvents={selectedEvents}
            onFilterChange={setSelectedEvents}
            translate={translate}
          />
        )}
        
        {loading && (
          <div className="events-grid">
            {[...Array(6)].map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        )}
        
        {error && (
          <div className="error">{error}</div>
        )}
        
        {!loading && !error && (
          <>
            {selectedEvents.length === 0 && (
              <div className="no-events-message">
                <p>Выберите события в фильтре для отображения</p>
              </div>
            )}
            
            {selectedEvents.length > 0 && (
              <>
                <EventsSection
                  id="active-events"
                  title="Активные события"
                  eventsByName={activeEventsByName}
                  translate={translate}
                  filteredTimes={getActiveTimes}
                  defaultOpen={true}
                  showActiveIndicator={true}
                />

                <EventsSection
                  id="upcoming-events"
                  title="Ближайшие события"
                  eventsByName={upcomingEventsByName}
                  translate={translate}
                  filteredTimes={getUpcomingTimesWithin2Hours}
                />

                <EventsSection
                  id="all-events"
                  title="Все события"
                  eventsByName={allEventsByName}
                  translate={translate}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}

