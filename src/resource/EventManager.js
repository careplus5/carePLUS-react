import { useState, useEffect } from 'react';

const useEventManager = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 저장된 이벤트를 불러옵니다.
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents) {
      setEvents(storedEvents);
    }
  }, []); // 컴포넌트가 마운트될 때 한 번만 호출

  useEffect(() => {
    // events 배열이 업데이트될 때마다 로컬 스토리지에 업데이트된 이벤트를 저장합니다.
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]); // events 배열이 업데이트될 때마다 호출

  const addEvent = (date, eventTitle) => {
    // 새로운 이벤트를 추가합니다.
    const newEvents = { ...events }; // 이벤트 배열에 새로운 이벤트를 추가합니다.
    if (!newEvents[date]) {
      newEvents[date] = [];
    }
    newEvents[date].push(eventTitle);
    console.log(newEvents)
    setEvents(newEvents);
    // 로컬 스토리지에 업데이트된 이벤트를 저장합니다.
    localStorage.setItem('events', JSON.stringify(newEvents));
  };

  const deleteEvent = (date, index) => {
    // 이벤트를 삭제합니다.
    const newEvents = { ...events };
    newEvents[date] = newEvents[date].filter((_, i) => i !== index);
    if (newEvents[date].length === 0) {
      delete newEvents[date];
    }
    setEvents(newEvents);
    // 로컬 스토리지에 업데이트된 이벤트를 저장합니다.
    localStorage.setItem('events', JSON.stringify(newEvents));
  };

  const editEvent = (date, index, newTitle) => {
    // 이벤트를 수정합니다.
    const newEvents = { ...events };
    newEvents[date][index] = newTitle;
    setEvents(newEvents);
    // 로컬 스토리지에 업데이트된 이벤트를 저장합니다.
    localStorage.setItem('events', JSON.stringify(newEvents));
  };

  return {
    events,
    addEvent,
    deleteEvent,
    editEvent
  };
};

export default useEventManager;
