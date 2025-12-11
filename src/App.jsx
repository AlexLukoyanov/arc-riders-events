import EventCard from './components/EventCard'
import EventCardSkeleton from './components/EventCardSkeleton'
import { useEvents } from './hooks/useEvents'
import { isTimeSlotActive, isTimeSlotUpcoming, getNextStartTime } from './utils/timeUtils'
import './App.css'

const translations = {
  events: {
    'Electromagnetic Storm': 'Электромагнитная буря',
    'Harvester': 'Королева',
    'Lush Blooms': 'Пышное цветение',
    'Matriarch': 'Матриарх',
    'Night Raid': 'Ночной рейд',
    'Uncovered Caches': 'Обнаруженные тайники',
    'Launch Tower Loot': 'Добыча пусковой башни'
  },
  maps: {
    'Dam': 'Поле боя у дамбы',
    'Buried City': 'Погребённый город',
    'Spaceport': 'Космопорт',
    'Blue Gate': 'Синие ворота',
    'Stella Montis': 'Стелла Монтис'
  }
}

function translate(text, type) {
  if (type === 'event') {
    return translations.events[text] || text
  } else if (type === 'map') {
    return translations.maps[text] || text
  }
  return text
}

function isEventActive(event) {
  return event.times.some(time => isTimeSlotActive(time.start, time.end))
}

function isEventUpcoming(event) {
  if (isEventActive(event)) {
    return false
  }
  return event.times.some(time => isTimeSlotUpcoming(time.start, time.end))
}

function getUniqueEvents(events) {
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

function getActiveTimes(event) {
  return event.times.filter(time => isTimeSlotActive(time.start, time.end))
}

function getUpcomingTimes(event) {
  return event.times.filter(time => isTimeSlotUpcoming(time.start, time.end))
}

function getEventNextStartTime(event) {
  const upcomingTimes = getUpcomingTimes(event)
  if (upcomingTimes.length === 0) {
    return Infinity
  }
  return Math.min(...upcomingTimes.map(time => getNextStartTime(time.start)))
}

function App() {
  const { events, loading, error } = useEvents()

  const activeEvents = events.filter(event => isEventActive(event))
  const upcomingEvents = events
    .filter(event => isEventUpcoming(event))
    .sort((a, b) => getEventNextStartTime(a) - getEventNextStartTime(b))
  const uniqueEvents = getUniqueEvents(events)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="container">
      <h1>ARC Raiders - Таймеры событий</h1>
      
      {!loading && !error && (activeEvents.length > 0 || upcomingEvents.length > 0 || uniqueEvents.length > 0) && (
        <nav className="page-navigation">
          {activeEvents.length > 0 && (
            <button 
              className="nav-link" 
              onClick={() => scrollToSection('active-events')}
            >
              Активные
            </button>
          )}
          {upcomingEvents.length > 0 && (
            <button 
              className="nav-link" 
              onClick={() => scrollToSection('upcoming-events')}
            >
              Ближайшие
            </button>
          )}
          {uniqueEvents.length > 0 && (
            <button 
              className="nav-link" 
              onClick={() => scrollToSection('all-events')}
            >
              Все события
            </button>
          )}
        </nav>
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
          {activeEvents.length > 0 && (
            <section id="active-events" className="events-section">
              <h2 className="section-title">
                <span className="active-indicator"></span>
                Активные события
              </h2>
              <div className="events-grid">
                {activeEvents.map((event, index) => (
                  <EventCard
                    key={`active-${event.name}-${event.map}-${index}`}
                    event={event}
                    translate={translate}
                    filteredTimes={getActiveTimes(event)}
                  />
                ))}
              </div>
            </section>
          )}

          {upcomingEvents.length > 0 && (
            <section id="upcoming-events" className="events-section">
              <h2 className="section-title">Ближайшие события</h2>
              <div className="events-grid">
                {upcomingEvents.map((event, index) => (
                  <EventCard
                    key={`upcoming-${event.name}-${event.map}-${index}`}
                    event={event}
                    translate={translate}
                    filteredTimes={getUpcomingTimes(event)}
                  />
                ))}
              </div>
            </section>
          )}

          {uniqueEvents.length > 0 && (
            <section id="all-events" className="events-section">
              <h2 className="section-title">Все события</h2>
              <div className="events-grid">
                {uniqueEvents.map((event, index) => (
                  <EventCard
                    key={`unique-${event.name}-${event.map}-${index}`}
                    event={event}
                    translate={translate}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}

export default App
