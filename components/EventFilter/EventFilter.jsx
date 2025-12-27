'use client'

import { useState } from 'react'
import './EventFilter.css'

function EventFilter({ events, selectedEvents, onFilterChange, translate }) {
  const [isOpen, setIsOpen] = useState(false)
  
  const uniqueEventNames = [...new Set(events.map(event => event.name))].sort()
  
  const handleToggleEvent = (eventName) => {
    const newSelected = selectedEvents.includes(eventName)
      ? selectedEvents.filter(name => name !== eventName)
      : [...selectedEvents, eventName]
    onFilterChange(newSelected)
  }
  
  const handleSelectAll = () => {
    onFilterChange(uniqueEventNames)
  }
  
  const handleDeselectAll = () => {
    onFilterChange([])
  }
  
  const isAllSelected = selectedEvents.length === uniqueEventNames.length
  const isNoneSelected = selectedEvents.length === 0

  return (
    <div className="event-filter">
      <button 
        className="event-filter-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="filter-icon">🔍</span>
        <span className="filter-text">
          Фильтр событий {selectedEvents.length > 0 && `(${selectedEvents.length})`}
        </span>
        <span className="accordion-icon">{isOpen ? '▼' : '▶'}</span>
      </button>
      
      {isOpen && (
        <div className="event-filter-content">
          <div className="filter-actions">
            <button 
              className="filter-action-btn"
              onClick={handleSelectAll}
              disabled={isAllSelected}
            >
              Выбрать все
            </button>
            <button 
              className="filter-action-btn"
              onClick={handleDeselectAll}
              disabled={isNoneSelected}
            >
              Снять все
            </button>
          </div>
          
          <div className="filter-checkboxes">
            {uniqueEventNames.map(eventName => {
              const isChecked = selectedEvents.includes(eventName)
              const translatedName = translate(eventName, 'event')
              
              return (
                <label key={eventName} className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggleEvent(eventName)}
                    className="filter-checkbox"
                  />
                  <span className="filter-checkbox-text">{translatedName}</span>
                </label>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default EventFilter

