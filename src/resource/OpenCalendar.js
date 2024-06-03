import React, { useState} from 'react';
import Calendar from './calendar';
import '../css/OpenCalendar.css';

const OpenCalendar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  // const { events, addEvent, deleteEvent, editEvent } = useEventManager(); // useEventManager 훅 
  const [selectedEvent, setSelectedEvent] = useState(null);


  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsPopupOpen(true);
  };

  const handleClose = () => {
    setSelectedDate('');
    setIsPopupOpen(false);
    setSelectedEvent(null); // 모달이 닫힐 때 선택된 이벤트를 초기화합니다.
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event); // 선택된 이벤트를 업데이트합니다.
  };

  return (
    <div className="OpenCalendar">
      <button onClick={() => setIsPopupOpen(true)}>Open Calendar</button>

      <Calendar 
        isOpen={isPopupOpen} 
        onClose={handleClose} 
        onDateSelect={handleDateSelect}
        onEventClick={handleEventClick} /> {/* Calendar 컴포넌트에 onEventClick prop을 추가하여 선택된 이벤트를 처리합니다. */}
        
      
        
    </div>
  );
};

export default OpenCalendar;
