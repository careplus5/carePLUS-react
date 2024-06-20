import React, { useState} from 'react';
import Calendar from './Calendar';
import '../css/OpenCalendar.css';
import '../css/Header.css'

const OpenCalendar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
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

  return (
    <div className="OpenCalendar">
      <img className='headerIcon' src='./img/schedule.png' onClick={() => setIsPopupOpen(true)}/>

      <Calendar 
        onClose={handleClose} 
        onDateSelect={handleDateSelect}
        isOpen={isPopupOpen} />
    </div>
  );
};
export default OpenCalendar;
