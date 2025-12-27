'use client'

function PageHeader({ activeEvents, upcomingEvents, uniqueEvents, loading, error, onScrollToSection }) {
  const hasEvents = !loading && !error && (activeEvents.length > 0 || upcomingEvents.length > 0 || uniqueEvents.length > 0)

  if (!hasEvents) return null

  return (
    <header className="app-header">
      <div className="container">
        <h1>ARC Raiders - Таймеры событий</h1>
        
        <nav className="page-navigation">
          {activeEvents.length > 0 && (
            <button 
              className="nav-link" 
              onClick={() => onScrollToSection('active-events')}
            >
              Активные
            </button>
          )}
          {upcomingEvents.length > 0 && (
            <button 
              className="nav-link" 
              onClick={() => onScrollToSection('upcoming-events')}
            >
              Ближайшие
            </button>
          )}
          {uniqueEvents.length > 0 && (
            <button 
              className="nav-link" 
              onClick={() => onScrollToSection('all-events')}
            >
              Все события
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

export default PageHeader

