import React, { useState, useEffect } from 'react';
import '../css/EventManager.css';

const EventModal = ({ date, events, addEvent, deleteEvent, editEvent, onClose, mode, dbEvents }) => {
  const [newEvent, setNewEvent] = useState({title: '', backgroundColor: '#b4d1f9'});
  const [eventList, setEventList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedEvent, setEditedEvent] = useState({});


  useEffect(() => {
    // events가 변경될 때마다 eventList를 업데이트
    setEventList(events);
  }, [events]);
  
  // const handleAddEvent = () => {
  //   if (newEvent.trim() !== '') {
  //     // 새 이벤트를 추가하고 eventList에 반영
  //     const updatedEvents = [...eventList, newEvent];
  //     setEventList(updatedEvents);
  //     // EventManager 함수를 통해 실제 데이터에 추가
  //     addEvent(date, newEvent.title, newEvent.backgroundColor);
  //     setNewEvent({ title: '', backgroundColor: '' }); // 입력 필드 초기화
  //   } else {
  //     console.error("새 이벤트 내용이 비어 있습니다.");
  //   }
  // };

  // 이벤트 추가
  const handleAddEvent = () => {
    if (newEvent.title.trim() !== '') {
      // 새 이벤트를 추가하고 eventList에 반영
      const updatedEvents = [...eventList, { title: newEvent.title, backgroundColor: newEvent.backgroundColor }];
      setEventList(updatedEvents);
      // EventManager 함수를 통해 실제 데이터에 추가
      addEvent(date, newEvent.title, newEvent.backgroundColor);
      setNewEvent({ title: '', backgroundColor: '#b4d1f9' }); // 입력 필드 초기화
    } else {
      console.error("새 이벤트 제목이 비어 있습니다.");
    }
  };

  // const handleEditEvent = (index) => {
  //   const editedEvent = prompt("일정 수정: ", eventList[index].title);
  //   if (editedEvent !== null) {
  //     editEvent(date, index, editedEvent);
  //     const updatedEvents = eventList.map((event, i) =>
  //       i === index ? { ...event, title: editedEvent } : event
  //     );
  //     setEventList(updatedEvents);
  //   }
  // };

  const handleEditEvent = (index) => {
    setEditingIndex(index);
    setEditedEvent(eventList[index]);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      // 업데이트된 이벤트를 실제 데이터와 로컬 상태에 반영
      editEvent(date, editingIndex, editedEvent.title, editedEvent.backgroundColor);
      const updatedEvents = eventList.map((event, i) =>
        i === editingIndex ? editedEvent : event
      );
      setEventList(updatedEvents);
      setEditingIndex(null);
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

  // return (
  //   <div className="eventpopup-overlay">
  //     <div className="eventpopup-content">
  //       <span className="close-btn" onClick={onClose}>&times;</span>
  //       <h2>{year}년 {month}월 {day}일</h2>
  //       {mode === 'local' && (
  //         <>
  //           <ul>
  //             {eventList.map((event, index) => (
  //               <li key={index}>
  //                 <span>{event.title}</span>
  //                 <button onClick={() => handleEditEvent(index)}>수정</button>
  //                 <button onClick={() => handleDeleteEvent(index)}>삭제</button>
  //               </li>
  //             ))}
  //           </ul>
  //           <input
  //             type="text"
  //             value={newEvent.title}
  //             onChange={(e) => setNewEvent({...newEvent, title: e.target.value })}
  //             placeholder="새 이벤트 추가"
  //           />&nbsp;&nbsp;&nbsp;
  //           <input
  //             type="color"
  //             value={newEvent.backgroundColor}
  //             onChange={(e) => setNewEvent({ ...newEvent, backgroundColor: e.target.value })}
  //           />
  //           <button onClick={handleAddEvent}>추가</button>
  //         </>
  //       )}
  //       {mode === 'db' && (
  //         <>
  //           <ul>
  //             {dbEvents[date]?.map((event, index) => (
  //               <li key={index}>{event.title}</li>
  //             ))}
  //           </ul>
  //         </>
  //       )}
  //     </div>
  //   </div>
  // );
  return (
    <div className="eventpopup-overlay">
      <div className="eventpopup-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>{year}년 {month}월 {day}일</h2>
        {mode === '개인' && (
          <>
            <ul  className='calul'>
              {eventList.map((event, index) => (
                <li key={index}>
                  {editingIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={editedEvent.title}
                        onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
                      />
                      <input
                        type="color"
                        value={editedEvent.backgroundColor}
                        onChange={(e) => setEditedEvent({ ...editedEvent, backgroundColor: e.target.value })}
                      />
                      <button onClick={handleSaveEdit}>저장</button>
                    </>
                  ) : (
                    <>
                      <span style={{ backgroundColor: event.backgroundColor, width: '10px', height:'10px', borderRadius:'50%' , display: 'inline-block', marginLeft:'-20px', marginRight:'20px' }}></span>
                      <span>{event.title}</span>
                      <button onClick={() => handleEditEvent(index)}>수정</button>
                      <button onClick={() => handleDeleteEvent(index)}>삭제</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              placeholder="새 이벤트 추가"
            />
            <input
              type="color"
              value={newEvent.backgroundColor}
              onChange={(e) => setNewEvent({ ...newEvent, backgroundColor: e.target.value })}
            />
            <button onClick={handleAddEvent}>추가</button>
          </>
        )}
        {mode === '근무' && (
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
