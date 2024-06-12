import React, { useState, useEffect } from 'react';
import '../css/EventManager.css';

const EventModal = ({ date, events, addEvent, deleteEvent, editEvent, onClose, mode, dbEvents }) => {
  const [newEvent, setNewEvent] = useState('');
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    setEventList(events);
  }, [events]);
  
  const handleAddEvent = () => {
    if (newEvent.trim() !== '') {
      setEventList([...eventList, newEvent]);
      addEvent(date, newEvent); // EventManager에서 함수 직접 호출
      setNewEvent('');
    }else {
      console.error("새 이벤트 내용이 비어 있습니다.");
    }
  };

  const handleEditEvent = (index) => {
    const editedEvent = prompt("일정 수정: ", eventList[index]);
    if (editedEvent !== null) {
      editEvent(date, index, editedEvent);
      const updatedEvents = eventList.map((event, i) =>
        i === index ? editedEvent : event
      );
      setEventList(updatedEvents);
    } // EventManager에서 함수 직접 호출
  };

  const handleDeleteEvent = (index) => {
    deleteEvent(date, index); // EventManager에서 함수 직접 호출
    const updatedEvents = eventList.filter((_, i) => i !== index);
    setEventList(updatedEvents);
  };

  const dateArray = date.split('-');
  const year = dateArray[0]; 
  const month=dateArray[1]; 
  const day = dateArray[2];

  return (
    <div className="eventpopup-overlay">
      <div className="eventpopup-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>{year}년 {month}월 {day}일</h2>
        {mode === 'local' && (
          <>
          <ul>
            {eventList.map((event, index) => (
              <li key={index}>
                <span>{event}</span>
                <button onClick={() => handleEditEvent(index)}>수정</button>
                <button onClick={() => handleDeleteEvent(index)}>삭제</button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="새 이벤트 추가"
          />&nbsp;&nbsp;&nbsp;
          <button onClick={handleAddEvent}>추가</button>
        </>
      )}
        {mode === 'db' && (
          <>
            <ul>
              {dbEvents[date]?.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default EventModal;
