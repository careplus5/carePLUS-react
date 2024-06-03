import React, { useState , useEffect} from 'react';
import '../css/EventManager.css';

const EventModal = ({ date, events, addEvent, deleteEvent, editEvent, onClose }) => {
  const [newEvent, setNewEvent] = useState('');
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    setEventList(events);
    // events 객체에서 특정 날짜에 해당하는 이벤트 배열을 가져옴
    // setEventList(events[date] || []);
    // if (events && events[date]) {
    //   setEventList(events[date]);
    // } else {
    //   setEventList([]);
    // }
    console.log(events)
  }, [events]);
  
  const handleAddEvent = () => {
    if (newEvent.trim() !== '') {
     
      setEventList([...eventList, newEvent]);
      addEvent(date, newEvent); // EventManager에서 함수 직접 호출
      setNewEvent('');
    }else {
      console.error("새 이벤트 내용이 비어 있습니다.");
    }
    console.log(eventList)
    console.log(events)
  };

  

  const handleEditEvent = (index) => {
    // const editedEvent = prompt("일정 수정: ", events[date][index]);
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
        <ul>
          {eventList.map((event, index) => (
            <li key={index}>
              {/* <span>{event}</span> */}
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
      </div>
    </div>
  );
};

export default EventModal;
