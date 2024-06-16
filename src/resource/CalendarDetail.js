import React, { useState, useEffect } from 'react';
import '../css/EventManager.css';

const EventModal = ({ date, events, addEvent, deleteEvent, editEvent, onClose, mode, dbEvents }) => {
  const [newEvent, setNewEvent] = useState('');
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    // events가 변경될 때마다 eventList를 업데이트
    setEventList(events);
  }, [events]);
  
  const handleAddEvent = () => {
    if (newEvent.trim() !== '') {
      // 새 이벤트를 추가하고 eventList에 반영
      const updatedEvents = [...eventList, { title: newEvent }];
      setEventList(updatedEvents);
      // EventManager 함수를 통해 실제 데이터에 추가
      addEvent(date, newEvent);
      setNewEvent(''); // 입력 필드 초기화
    } else {
      console.error("새 이벤트 내용이 비어 있습니다.");
    }
  };

  const handleEditEvent = (index) => {
    const editedEvent = prompt("일정 수정: ", eventList[index].title);
    if (editedEvent !== null) {
      editEvent(date, index, editedEvent);
      const updatedEvents = eventList.map((event, i) =>
        i === index ? { ...event, title: editedEvent } : event
      );
      setEventList(updatedEvents);
    }
  };

  const handleDeleteEvent = (index) => {
    deleteEvent(date, index); // EventManager에서 함수 직접 호출
    const updatedEvents = eventList.filter((_, i) => i !== index);
    setEventList(updatedEvents);
  };

  const dateArray = date.split('-');
  const year = dateArray[0]; 
  const month = dateArray[1]; 
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
                  <span>{event.title}</span>
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
                <li key={index}>{event.title}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default EventModal;
