import React, { useState } from 'react';
import EventModal from './CalendarDetail'; // EventModal 가져오기
import { handlePrevMonth, handleNextMonth } from './othermonth';
import useEventManager from './EventManager'; // EventManager 가져오기
import '../css/Calendar.css';
import '../css/EventManager.css'

const Calendar = ({ isOpen, onClose, onDateSelect}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태 추가
  const { events, addEvent, deleteEvent, editEvent } = useEventManager(); // useEventManager 훅 사용


  // 현재 날짜를 얻는 함수
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth()+1;
  const currentDay = currentDate.getDate();

  const prevMonth = () => {
    handlePrevMonth(month, year, setMonth, setYear);
  };

  const nextMonth = () => {
    handleNextMonth(month, year, setMonth, setYear);
  };

  const eventsIndicator = (dateKey) => {
    if (!events[dateKey]) return null;
    return (
      <div className="events-indicator">
        {events[dateKey].map((event, index) => (
          <div key={index} className="event events-preview">
            {event}
          </div>
        ))}
      </div>
    );
  };

  const renderCalendar = () => {
    const calendar = [];
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const monthNames = [
      '1', '2', '3', '4', '5', '6',
      '7', '8', '9', '10', '11', '12'
    ];
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    calendar.push(<div key="monthYear" className="monthYear">{`${year}년 ${monthNames[month]}월`}</div>);

    calendar.push(
      <div key="weekDays" className="weekDays">
        {weekDays.map((day, index) => <div key={index} className="day">{day}</div>)}
      </div>
    );

    let dateRow = [];

    const prevMonthDaysToShow = firstDay;
    for (let i = prevMonthLastDay - prevMonthDaysToShow + 1; i <= prevMonthLastDay; i++) {
      dateRow.push(
        <div key={`prevMonth-${i}`} className="date prev-month" >
          {month}월{i}일
        </div>
      );
    }

    for (let date = 1; date <= daysInMonth; date++) {
      const dateKey = `${year}-${month + 1}-${date}`;
            const isCurrentDate = year === currentYear && month + 1 === currentMonth && date === currentDay;

      dateRow.push(
        <div key={date} className={`date ${isCurrentDate ? 'current-date' : ''}`} data-date={date} onClick={() => {
            onDateSelect(dateKey)
            // setSelectedDate(`${year}년 ${month+1}월 ${date}일`)
            setSelectedDate(dateKey)
            }}>
          {date}일
         
        </div>
      );
      if (dateRow.length === 7) {
        calendar.push(<div key={`row-${date}`} className="dateRow">{dateRow}</div>);
        dateRow = [];
      }
    }

    if (dateRow.length > 0) {
      const remainingCells = 7 - dateRow.length;
      for (let i = 1; i <= remainingCells; i++) {
        const dateKey = `${year}-${month + 2}-${i}`;
        dateRow.push(
          <div key={`nextMonth-${i}`} className="date next-month">
            {month+2}월{i}일
          </div>
        );
      }
      calendar.push(<div key="lastRow" className="dateRow">{dateRow}</div>);
    }

    return calendar;
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <button onClick={prevMonth}>Prev</button>
        <button onClick={nextMonth}>Next</button>
        <div id="calendar" className="calendar">
          {renderCalendar()}
        </div>
        {/* 모달을 선택된 날짜에 대해 열도록 설정 */}
        {selectedDate!=null && (
          <EventModal
            date={selectedDate}
            events={events[selectedDate] || []}
            addEvent={addEvent}
            deleteEvent={deleteEvent}
            editEvent={editEvent}
            onClose={() => setSelectedDate(null)}
          />
        )}
      </div>
     
    </div>
  );
};

export default Calendar;
