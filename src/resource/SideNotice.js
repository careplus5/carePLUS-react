import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../css/SideNotice.css';

const SideNotice = () => {
    const [notices, setNotices] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    

    useEffect(() => {
        // const fetchNotices = async () => {
        //     try {
        //         const response = await axios.get('/api/notices');
        //         const data = response.data;
        //         setNotices(data.slice(0, 3)); // 최신 공지사항 3개만 저장
        //     } catch (error) {
        //         console.error('공지사항을 가져오는 중 오류 발생:', error);
        //     }
        // };

        // fetchNotices();
        // const intervalId = setInterval(fetchNotices, 5000); // 5초마다 공지사항 갱신

        // return () => clearInterval(intervalId); // 컴포넌트가 언마운트되면 인터벌 제거

        // 임의의 테스트 데이터
        const testNotices = [
            { id: '001482012', title:'Notice 1', content: 'Content for Notice 1', saveTime: '2024-06-03T09:00' },
            { id: '001492012', title:'Notice 2', content: 'Content for Notice 2', saveTime: '2024-06-03T09:30' },
            { id: '001502012', title:'Notice 3', content: 'Content for Notice 3', saveTime: '2024-06-03T10:00' },
            { id: '001512012', title:'Notice 4', content: 'Content for Notice 4', saveTime: '2024-06-03T08:00' },
            { id: '001522012', title:'Notice 5', content: 'Content for Notice 5', saveTime: '2024-06-03T10:30' }
        ];
        
        // 공지 최신순으로 정렬
        const sortedNotices = testNotices.sort((a, b) => new Date(b.saveTime) - new Date(a.saveTime));
        setNotices(sortedNotices.slice(0, 3)); // 최신 공지사항 3개만 저장
    }, []);

    const handleNoticeClick = (event, notice) => {
        const rect = event.target.getBoundingClientRect();
        setModalPosition({
            top: rect.top + window.scrollY,
            left: rect.right + 10
        });
        setSelectedNotice(notice);
    };

    const closeModal = () => {
        setSelectedNotice(null);
    };

    return (
        <div className="side-notice">
            <div className='title-box'>
                <img className='meticon' src='./img/SideNotice.png' alt='Met Icon'/>
                <span className='mettitle'>공지사항</span>
            </div><br/>
            <ul>
                {notices.map((notice) => (
                    <li key={notice.id} onClick={(e) => handleNoticeClick(e, notice)}>
                        {notice.title}
                    </li>
                ))}
            </ul>

            {selectedNotice && (
                <Modal
                    isOpen={!!selectedNotice}
                    onRequestClose={closeModal}
                    contentLabel="Notice Detail"
                    className="modal"
                    overlayClassName="modal-overlay"
                    style={{
                        content: {
                            top: `${modalPosition.top}px`,
                            left: `${modalPosition.left}px`,
                        }
                    }}
                >
                    <h2>{selectedNotice.title}</h2>
                    <p>{selectedNotice.content}</p>
                    <button onClick={closeModal}>닫기</button>
                </Modal>
            )}
        </div>
    );
};

export default SideNotice;