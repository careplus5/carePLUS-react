import { useState, useEffect } from 'react';

const useEventManager = () => {
  const [events, setEvents] = useState({});

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []);

  const addEvent = (date, eventTitle) => {
    const newEvents = { ...events };
    if (!newEvents[date]) {
      newEvents[date] = [];
    }
    newEvents[date].push({ title: eventTitle });
    setEvents(newEvents);
    localStorage.setItem('events', JSON.stringify(newEvents));
  };

  const deleteEvent = (date, index) => {
    const newEvents = { ...events };
    newEvents[date] = newEvents[date].filter((_, i) => i !== index);
    if (newEvents[date].length === 0) {
      delete newEvents[date];
    }
    setEvents(newEvents);
    localStorage.setItem('events', JSON.stringify(newEvents));
  };

  const editEvent = (date, index, newTitle) => {
    const newEvents = { ...events };
    newEvents[date][index] = { title: newTitle };
    setEvents(newEvents);
    localStorage.setItem('events', JSON.stringify(newEvents));
  };

  return {
    events,
    addEvent,
    deleteEvent,
    editEvent,
  };
};

export default useEventManager;
