import React, { useState, useEffect } from 'react';
import EventModal from './CalendarDetail'; // EventModal 가져오기
import { handlePrevMonth, handleNextMonth } from './othermonth';
import useEventManager from './EventManager'; // useEventManager 훅 사용
import '../css/Calendar.css';
import '../css/EventManager.css';
import axios from 'axios';

const Calendar = ({ isOpen, onClose, onDateSelect }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [mode, setMode] = useState('local'); // 'local' or 'db'
  const { events, addEvent, deleteEvent, editEvent } = useEventManager();
  const [dbEvents, setDbEvents] = useState({});
  const userId = 1; // 예시로 사용할 사용자 ID

  useEffect(() => {
    if (mode === 'db') {
      const fetchEvents = async () => {
        try {
          const response = await axios.get(`/events?userId=${userId}`);
          const eventsByDate = response.data.reduce((acc, event) => {
            const dateKey = event.date;
            if (!acc[dateKey]) {
              acc[dateKey] = [];
            }
            acc[dateKey].push(event.title);
            return acc;
          }, {});
          setDbEvents(eventsByDate);
        } catch (error) {
          console.error('Error fetching events', error);
        }
      };
      fetchEvents();
    }
  }, [mode, userId]);

  const holidays = {
    // 예시 데이터: 공휴일 정보
    "2024-5-5": "어린이날",
    "2024-5-6": "어린이날(대체휴일)",
    "2024-5-15": "부처님오신날",
    "2024-6-6": "현충일",
    "2024-8-15": "광복절",
    "2024-9-16": "추석 연휴",
    "2024-9-17": "추석",
    "2024-9-18": "추석 연휴",
    "2024-10-3": "개천절",
    "2024-10-9": "한글날",
    "2024-12-25": "크리스마스",
    "2025-1-1": "새해"
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const prevMonth = () => {
    handlePrevMonth(month, year, setMonth, setYear);
  };

  const nextMonth = () => {
    handleNextMonth(month, year, setMonth, setYear);
  };

  const eventsIndicator = (dateKey) => {
    const eventList = mode === 'local' ? (events[dateKey] || []) : (dbEvents[dateKey] || []);
    if (eventList.length === 1) {
      return <div className="event">&nbsp;{eventList[0]}&nbsp;</div>;
    } else if (eventList.length === 2) {
      return (
        <div>
          <div className="event">&nbsp;{eventList[0]}&nbsp;</div>
          <div className="event">&nbsp;{eventList[1]}&nbsp;</div>
        </div>
      );
    } else if (eventList.length > 2) {
      return (
        <div>
          <div className="event">&nbsp;{eventList[0]}&nbsp;</div>
          <div className='event'>그 외 {eventList.length - 1}건&nbsp;</div>
        </div>
      );
    }
  };

  const renderCalendar = () => {
    const calendar = [];
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const monthNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    calendar.push(<div key="" className='userInfo'>{` 어쩌구외과 userId:${userId}`}</div>)
    calendar.push(<div key="monthYear" className="monthYear">{`${year}년 ${monthNames[month]}월`}</div>);

    calendar.push(
      <div key="weekDays" className="weekDays">
        {weekDays.map((day, index) => <div key={index} className="day">{day}</div>)}
      </div>
    );

    let dateRow = [];

    const prevMonthDaysToShow = firstDay;
    for (let i = prevMonthLastDay - prevMonthDaysToShow + 1; i <= prevMonthLastDay; i++) {
      const dateKey = `${year}-${month}-${i}`;
      const isCurrentDate = year === currentYear && month === currentMonth && i === currentDay;
      dateRow.push(
        <div key={`prevMonth-${i}`} className={`date prev-month ${isCurrentDate ? 'current-date' : ''}`} data-date={dateKey} onClick={() => {
          onDateSelect(dateKey);
          setSelectedDate(dateKey);
        }}>
          {month}월{i}일
          {holidays[dateKey] && <div className="holiday">&nbsp;{holidays[dateKey]}&nbsp;</div>}
          {eventsIndicator(dateKey)}
        </div>
      );
    }

    for (let date = 1; date <= daysInMonth; date++) {
      const dateKey = `${year}-${month + 1}-${date}`;
      const isCurrentDate = year === currentYear && month + 1 === currentMonth && date === currentDay;
      const isHoliday = holidays[dateKey] !== undefined;
      dateRow.push(
        <div key={date} className={`date ${isCurrentDate ? 'current-date' : ''}`} data-date={date} onClick={() => {
          onDateSelect(dateKey);
          setSelectedDate(dateKey);
        }}>
          <div className='date-style'>
            {date}일
          </div>
          {isHoliday && <div className="holiday">&nbsp;{holidays[dateKey]}&nbsp;</div>}
          {eventsIndicator(dateKey)}
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
        const nextMonthDate = new Date(year, month + 1, i);
        const nextMonthKey = `${nextMonthDate.getFullYear()}-${nextMonthDate.getMonth() + 1}-${i}`;
        const isHoliday = holidays[nextMonthKey] !== undefined;
        dateRow.push(
          <div key={`nextMonth-${i}`} className="date next-month" data-date={nextMonthKey} onClick={() => {
            onDateSelect(nextMonthKey);
            setSelectedDate(nextMonthKey);
          }}>
            {nextMonthDate.getMonth() + 1}월{i}일
            {isHoliday && <div className="holiday">&nbsp;{holidays[nextMonthKey]}&nbsp;</div>}
            {eventsIndicator(nextMonthKey)}
          </div>
        );
      }
      calendar.push(<div key="lastRow" className="dateRow">{dateRow}</div>);
    }

    return calendar;
  };

  if (!isOpen) return null;
  // if (!isOpen) return (
  //   <div className="mini-calendar">
  //     {renderCalendar()}
  //   </div>
  // );

  return (
    <div className='background'>
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <button onClick={prevMonth}>Prev</button>
        <button onClick={nextMonth}>Next</button>
        <div className="mode-switch">
          <button onClick={() => setMode('local')}>개인 일정 보기</button>
          <button onClick={() => setMode('db')}>근무 일정 보기</button>
        </div>
        <div id="calendar" className="calendar">
          {renderCalendar()}
        </div><br/>
        {selectedDate != null && mode === 'local' && (
          <EventModal
          date={selectedDate}
          events={events[selectedDate] || []}
          addEvent={addEvent}
          deleteEvent={deleteEvent}
          editEvent={editEvent}
          mode={mode}
          dbEvents={dbEvents}
          onClose={() => setSelectedDate(null)}
          />
        )}
        {selectedDate != null && mode === 'db' && (
         <EventModal
         date={selectedDate}
         events={events[selectedDate] || []}
         onClose={() => setSelectedDate(null)}
         mode={mode}
         dbEvents={dbEvents}
          />
        )}
        </div>
      </div>
      </div>
    );
  };
export default Calendar;