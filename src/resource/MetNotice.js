import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/MetNotice.css';
import '../css/EventManager.css';
import { url } from '../config';
import useEventManager from './EventManager'; // useEventManager 훅 사용
import OpenCalendar from './OpenCalendar';

const MetNotice = ({ selectedPatient, userInfo, onDateSelect }) => {
    const [notice, setNotice] = useState('');
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const { events, addEvent, deleteEvent, editEvent } = useEventManager();
    const [dbEvents, setDbEvents] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage calendar popup

    const handleInputChange = (e) => {
        setNotice(e.target.value);
    };

    const handleSaveClick = async () => {
        if (notice.trim() === '') {
            alert('특이사항을 입력하세요');
            return;
        }

        try {
            const response = await axios.post(`${url}/uploadTestNotice?testNum=${selectedPatient.testNum}&metNum=${userInfo.empNum}&testNotice=${notice}`);
            console.log('특이사항 저장 성공:', response.data);
            setNotice(''); // 저장 후 입력 필드 초기화
        } catch (error) {
            console.error('특이사항 저장 중 오류 발생:', error);
            alert('특이사항 저장에 실패했습니다');
        }
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${url}/schedules?userId=${userInfo.empNum}`);
                console.log(response.data);
                const eventsByDate = response.data.reduce((acc, event) => {
                    const dateKey = event.startDate;
                    if (!acc[dateKey]) {
                        acc[dateKey] = [];
                    }
                    acc[dateKey].push({
                        id: event.id,
                        title: event.title,
                        startTime: event.startTime,
                        eventType: event.scheduleType
                    });
                    return acc;
                }, {});
                setDbEvents(eventsByDate);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };
        fetchEvents();
    }, [userInfo]);

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

    const eventsIndicator = (dateKey) => {
        const eventList = dbEvents[dateKey] || [];
        if (eventList.length === 1) {
            return (
                <div className="minievent" style={{ backgroundColor: eventList[0].backgroundColor }}>
                    &nbsp;{eventList[0].title}&nbsp;
                </div>
            );
        } else if (eventList.length === 2) {
            return (
                <div>
                    <div className="minievent" style={{ backgroundColor: eventList[0].backgroundColor }}>
                        &nbsp;{eventList[0].title}&nbsp;
                    </div>
                    <div className="minievent" style={{ backgroundColor: eventList[1].backgroundColor }}>
                        &nbsp;{eventList[1].title}&nbsp;
                    </div>
                </div>
            );
        } else if (eventList.length > 2) {
            return (
                <div>
                    <div className="minievent" style={{ backgroundColor: eventList[0].backgroundColor }}>
                        {eventList[0].eventType} 예약
                    </div>
                    <div className='minievent' style={{ backgroundColor: eventList[1].backgroundColor }}>
                        총 {eventList.length}건&nbsp;
                    </div>
                </div>
            );
        }
        return null;
    };

    const renderCalendar = () => {
        const calendar = [];
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthLastDay = new Date(year, month, 0).getDate();

        const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

        calendar.push(
            <div key="weekDays" className="miniweekDays">
                {weekDays.map((day, index) => <div key={index} className="miniday">{day}</div>)}
            </div>
        );

        let dateRow = [];

        const prevMonthDaysToShow = firstDay;
        for (let i = prevMonthLastDay - prevMonthDaysToShow + 1; i <= prevMonthLastDay; i++) {
            const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const isCurrentDate = year === currentYear && month === currentMonth && i === currentDay;
            dateRow.push(
                <div key={`prevMonth-${i}`} className={`miniprev-month ${isCurrentDate ? 'minicurrent-date' : ''}`} data-date={dateKey}>
                    {month}월{String(i).padStart(2, '0')}일
                    {holidays[dateKey] && <div className="miniholiday">&nbsp;{holidays[dateKey]}&nbsp;</div>}
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
                <div key={date} className={`minidate ${isCurrentDate ? 'minicurrent-date' : ''} ${isFullbooked ? 'fullbooked' : ''}`} data-date={date}>
                    <div className='minidate-style'>
                        {date}일
                    </div>
                    {isHoliday && <div className="miniholiday">&nbsp;{holidays[dateKey]}&nbsp;</div>}
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
                    <div key={`nextMonth-${i}`} className="mininext-month" data-date={nextMonthKey}>
                        {(nextMonthDate.getMonth() + 1)}월{String(i).padStart(2, '0')}일
                        {isHoliday && <div className="holiday">&nbsp;{holidays[nextMonthKey]}&nbsp;</div>}
                        {eventsIndicator(nextMonthKey)}
                    </div>
                );
            }
            calendar.push(<div key="lastRow" className="dateRow">{dateRow}</div>);
        }

        return calendar;
    };

    return (
        <div className='metmain'>
            <div className='notice-box'>
                <div className='mettitle-box'>
                    <img className='meticon' src='./img/MetNotice.png' alt='Met Icon'/>
                    <span className='mettitle'>검사시 특이사항</span>
                </div>
                <textarea
                    value={notice}
                    onChange={handleInputChange}
                        className='noti-input'
                    />
                <button className='noti-button' onClick={handleSaveClick}>저장</button>
            </div>
            <div className='calendar-box'>
                <div className='mettitle-box'>
                    <img className='meticon' src='./img/CalendarMin.png' alt='Met Icon'/>
                    <span className='mettitle'>캘린더</span>
                </div>
                <div className='calendar-container'>
                    {renderCalendar()}
                    <OpenCalendar />
                </div>
            </div>
        </div>
    );
};

export default MetNotice;
