import React, { useState } from 'react';
import axios from 'axios';
import '../css/MetNotice.css';
// import CalendarMini from './CalendarMini';
import Calendar from './Calendar';


const MetNotice = () => {
    const [notice, setNotice] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 오픈 상태를 저장하는 상태

    const handleInputChange = (e) => {
        setNotice(e.target.value);
    };

    const handleSaveClick = async () => {
        if (notice.trim() === '') {
            alert('특이사항을 입력하세요');
            return;
        }

        try {
            const response = await axios.post('/api/saveNotice', { notice });
            alert('특이사항이 성공적으로 저장되었습니다');
            setNotice(''); // 저장 후 입력 필드 초기화
        } catch (error) {
            console.error('특이사항 저장 중 오류 발생:', error);
            alert('특이사항 저장에 실패했습니다');
        }
    };

    // 작은 캘린더 클릭 시 팝업 열기
    const handleMiniCalendarClick = () => {
        // 작은 캘린더 클릭 시 팝업을 열기 위한 상태를 설정합니다.
        setIsPopupOpen(true);
    };

    // 팝업 닫기
    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div className='metmain'>
            <div className='notice-box'>
                <div className='title-box'>
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
            <div className='calendar-box' onClick={handleMiniCalendarClick}>
                <div className='title-box'>
                    <img className='meticon' src='./img/CalendarMin.png' alt='Met Icon'/>
                    <span className='mettitle'>캘린더</span>
                </div>
                <div >
                    <Calendar className='calendar-mini' />
                </div>
            </div>

             {/* CalendarMini 컴포넌트가 팝업으로 표시될 때 */}
             {isPopupOpen && (
                 <Calendar isOpen={true}
                 onClose={handleClosePopup} 
                 onDateSelect={() => {}} />
            )}
         </div>
     )
 };

export default MetNotice;
