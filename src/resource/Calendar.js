import React, { useState, useEffect } from 'react';
import EventModal from './CalendarDetail'; // EventModal 가져오기
import { handlePrevMonth, handleNextMonth } from './othermonth';
import useEventManager from './EventManager'; // useEventManager 훅 사용
import '../css/Calendar.css';
import '../css/EventManager.css';
import axios from 'axios';
import { url } from '../config';
import { useAtomValue } from 'jotai';
import { usernameAtom } from '../config/Atom';

const Calendar = ({ onClose, onDateSelect,onEventClick, isOpen, }) => { //, isOpen
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [mode, setMode] = useState('개인'); 
  const { events, addEvent, deleteEvent, editEvent } = useEventManager();
  const [dbEvents, setDbEvents] = useState({});
  const userId = useAtomValue(usernameAtom);
  const [userName, setUserName] = useState('');
  const [deptName, setDeptName] = useState('');
  const [dept2Name, setDept2Name] = useState('');
  const [jobNum, setjobNum] = useState('');

  useEffect(() => {
    axios.get(`${url}/userInfo?userId=${userId}`)
        .then((res)=>{
          setUserName(res.data.empName);
          setDeptName(res.data.departmentName);
          setDept2Name(res.data.department2Name);
          setjobNum(res.data.jobNum);
        })
        .catch((err)=>{
          console.log(err);
        });
        const fetchEvents = async () => {
          try {
            const response = await axios.get(`${url}/schedules?userId=${userId}`);
            console.log(response);
            // 다양한 jobNum 시나리오에 대한 매핑 정의
      const mappings = {
        '14': {
          dateKey: 'testAppointmentDate',
          title: 'departmentName', // 예시입니다. 실제 필드 이름으로 바꿔주세요
          startTime: 'testAppointmentTime',
          eventType: 'scheduleType'
        },
        '11': {
          dateKey: (event) => event.surDate || event.diagnosisDueDate,
          title: 'title', // 예시입니다. 실제 필드 이름으로 바꿔주세요
          startTime: 'startTime', // 예시입니다. 실제 필드 이름으로 바꿔주세요
          eventType: 'eventType' // 예시입니다. 실제 필드 이름으로 바꿔주세요
        },
        // 필요에 따라 다른 jobNum 값에 대한 매핑을 추가할 수 있습니다
      };

      const eventsByDate = response.data.reduce((acc, event) => {
        let { dateKey, title, startTime, eventType } = mappings[jobNum];

        // dateKey가 함수인 경우 동적으로 계산할 수 있습니다
        if (typeof dateKey === 'function') {
          dateKey = dateKey(event);
        } else {
          dateKey = event[dateKey];
        }

        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }

        acc[dateKey].push({
          id: event.id,
          title: event[title], // title 변수를 통해 필드 이름을 동적으로 접근합니다
          startTime: event[startTime], // startTime 변수를 통해 필드 이름을 동적으로 접근합니다
          eventType: event[eventType] // eventType 변수를 통해 필드 이름을 동적으로 접근합니다
        });

        return acc;
      }, {});

      setDbEvents(eventsByDate);
    } catch (error) {
      console.error('이벤트 가져오기 오류', error);
    }
  };

  // mode가 '근무'일 때만 이벤트 가져오기
  if (mode === '근무') {
    fetchEvents();
  }
}, [mode, userId, jobNum]);
    
  const holidays = {
    // 예시 데이터: 공휴일 정보
    "2024-05-05": "어린이날",
    "2024-05-06": "어린이날(대체휴일)",
    "2024-05-15": "부처님오신날",
    "2024-06-06": "현충일",
    "2024-08-15": "광복절",
    "2024-09-16": "추석 연휴",
    "2024-09-17": "추석",
    "2024-09-18": "추석 연휴",
    "2024-10-03": "개천절",
    "2024-10-09": "한글날",
    "2024-12-25": "크리스마스",
    "2025-01-01": "새해"
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

  const getBackgroundColor = (eventType) => {
    switch (eventType) {
        case '검사':
            return '#b3d4fc'; // Example color for meeting events
        case '진료':
            return '#ace4a6'; // Example color for training events
        case '수술':
            return '#e9c7e9'; // Example color for training events    
        default:
            return '#f0f0f0'; // Default color if eventType is not recognized
    }
};

  const eventsIndicator = (dateKey) => {
    const eventList = mode === '개인' ? (events[dateKey] || []) : (dbEvents[dateKey] || []);
    if (eventList.length === 1 && mode==='개인') {
      return <div className="event" >
                <span style={{ backgroundColor: eventList[0].backgroundColor, width: '9px', height:'9px', borderRadius:'50%' , display: 'inline-block', marginRight:'5px' }}></span>
                &nbsp;{eventList[0].title}&nbsp;
            </div>;
    } else if (eventList.length === 1 && mode==='근무') {
        const eventType = eventList[0].eventType;
        const backgroundColor = getBackgroundColor(eventType);
      return (
        <div>
          <span style={{ backgroundColor: backgroundColor, width: '10px', height:'10px', borderRadius:'50%' , display: 'inline-block', marginRight:'10px', marginBottom:'5px' }}></span>
          <div className="event" style={{ display:'inline-block' }}>
          {eventList[0].eventType} 예약
          </div>
          <div className='event' style={{ marginTop:'-5px' }}>
              총 {eventList.length}건&nbsp;
          </div>
        </div>
      );
    } else if (eventList.length === 2 && mode==='개인') {
      return (
        <div>
          <div className="event" >
            <span style={{ backgroundColor: eventList[0].backgroundColor, width: '9px', height:'9px', borderRadius:'50%' , display: 'inline-block', marginRight:'5px' }}></span>
            {eventList[0].title}&nbsp;
          </div> {/* 객체의 속성을 사용하여 렌더링 */}
          <div className="event" >
            <span style={{ backgroundColor: eventList[1].backgroundColor, width: '9px', height:'9px', borderRadius:'50%' , display: 'inline-block', marginRight:'5px' }}></span>
            {eventList[1].title}&nbsp;
          </div> {/* 객체의 속성을 사용하여 렌더링 */}
        </div>
      );
    } else if (eventList.length === 2 && mode==='근무') {
        const eventType = eventList[0].eventType;
        const backgroundColor = getBackgroundColor(eventType);
      return (
        <div>
          <span style={{ backgroundColor: backgroundColor, width: '10px', height:'10px', borderRadius:'50%' , display: 'inline-block', marginRight:'10px', marginBottom:'5px' }}></span>
          <div className="event" style={{ display:'inline-block' }}>
          {eventList[0].eventType} 예약
          </div>
          <div className='event' style={{ marginTop:'-5px' }}>
              총 {eventList.length}건&nbsp;
          </div>
        </div>
      );
    } else if (eventList.length > 2 && mode==='근무') {
      const eventType = eventList[0].eventType;
        const backgroundColor = getBackgroundColor(eventType);
      return (
        <div>
          <span style={{ backgroundColor: backgroundColor, width: '10px', height:'10px', borderRadius:'50%' , display: 'inline-block', marginRight:'10px', marginBottom:'5px' }}></span>
          <div className="event" style={{ display:'inline-block' }}>
              {/* &nbsp;{eventList[0].title}&nbsp; */}
              {eventList[0].eventType} 예약
          </div> {/* 객체의 속성을 사용하여 렌더링 */}
          <div className='event' style={{ marginTop:'-5px' }}>
              총 {eventList.length}건&nbsp;
          </div>
        </div>
      );
    } else if (eventList.length > 2 && mode==='개인') {
      return (
        <div>
          <div className="event" >
            <span style={{ backgroundColor: eventList[0].backgroundColor, width: '9px', height:'9px', borderRadius:'50%' , display: 'inline-block', marginRight:'5px' }}></span>
            {eventList[0].title}&nbsp;
          </div>
          <div className='event' >
            <span style={{ backgroundColor: eventList[1].backgroundColor, width: '9px', height:'9px', borderRadius:'50%' , display: 'inline-block', marginRight:'5px' }}></span>
              그 외 {eventList.length-1}건&nbsp;
          </div>
        </div>
      );
    }
    return null; // 이벤트가 없는 경우 null 반환
  };

  const renderCalendar = () => {
    const calendar = [];
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    const monthNames = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

    // calendar.push(<div key="" className='userInfo'>{` ${dept2Name} ${userName}`}</div>)
    // calendar.push(<div key="monthYear" className="monthYear">{`${year}년 ${monthNames[month]}월`}</div>);

    calendar.push(
      <div key="weekDays" className="weekDays">
        {weekDays.map((day, index) => <div key={index} className="day">{day}</div>)}
      </div>
    );

    let dateRow = [];

    const prevMonthDaysToShow = firstDay;
    for (let i = prevMonthLastDay - prevMonthDaysToShow + 1; i <= prevMonthLastDay; i++) {
      const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const isCurrentDate = year === currentYear && month === currentMonth && i === currentDay;
      dateRow.push(
        <div key={`prevMonth-${i}`} className={`date prev-month ${isCurrentDate ? 'current-date' : ''}`} data-date={dateKey} onClick={() => {
          onDateSelect(dateKey);
          setSelectedDate(dateKey);
        }}>
          {String(month).padStart(2, '0')}월{String(i).padStart(2, '0')}일
          {holidays[dateKey] && <div className="holiday">&nbsp;{holidays[dateKey]}&nbsp;</div>}
          {eventsIndicator(dateKey)}
        </div>
      );
    }
    
    for (let date = 1; date <= daysInMonth; date++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      const isCurrentDate = year === currentYear && month + 1 === currentMonth && date === currentDay;
      const isHoliday = holidays[dateKey] !== undefined;
      
      const eventList = dbEvents[dateKey] || [];
      const isFullbooked = eventList.length === 18;
      
    
      dateRow.push(
        <div key={date} className={`date ${isCurrentDate ? 'current-date' : ''} ${mode==='근무'&&isFullbooked ? 'fullbooked' : ''}`} data-date={date} onClick={() => {
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
        const nextMonthKey = `${nextMonthDate.getFullYear()}-${String(nextMonthDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const isHoliday = holidays[nextMonthKey] !== undefined;
        dateRow.push(
          <div key={`nextMonth-${i}`} className="date next-month" data-date={nextMonthKey} onClick={() => {
            onDateSelect(nextMonthKey);
            setSelectedDate(nextMonthKey);
          }}>
            {String(nextMonthDate.getMonth() + 1).padStart(2, '0')}월{String(i).padStart(2, '0')}일
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
          <div className="mode-switch">
            <button className='calendar-button' onClick={() => setMode('개인')}>개인 스케줄</button>
            <button className='calendar-button' onClick={() => setMode('근무')}>근무 스케줄</button>
              <div style={{marginLeft:'70px', marginBottom:'40px'}}>
                <div style={{width:'40%'}}> 
                  {/* <div key="" className='userInfo'>{` ${dept2Name} ${userName}님의 ${mode}일정`}</div> */}
                  <div key="" className='userInfo'>{` ${dept2Name ? dept2Name : deptName} ${userName}님의 ${mode}일정`}</div>
                  <span onClick={prevMonth} className='calendarleft'>⟨</span>
                  <div key="monthYear" className="monthYear">{`${year}년 ${month+1}월`}</div>
                  <span className='calendarright' onClick={nextMonth}>⟩</span>
                </div>
                {renderCalendar()}
              </div>
          </div>
          {selectedDate != null && mode === '개인' && (
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
          {selectedDate != null && mode === '근무' && (
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
