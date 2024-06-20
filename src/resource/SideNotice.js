import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../css/SideNotice.css';
import { url } from '../config';
import Notice from './Notice';
import NoticeList from './NoticeList';

const SideNotice = () => {
    const [notice, setNotice] = useState({
        noticeCategory: '99', noticeTitle: '', noticeContent: '', noticeNum: '', noticeWriteDate: '', noticeViewCount: ''
    })
    const [noticeList, setNoticeList] = useState([]);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [isNoticeListOpen, setIsNoticeListOpen] = useState(false);

    useEffect(() => {
        Modal.setAppElement('#root');
        const fetchData = () => {
            axios.get(`${url}/noticeList`)
                .then((res) => {
                    setNoticeList(res.data.noticeList.slice(0,3));
                })
                .catch(err => {
                    console.log(err);
                });
        };
    
        const interval = setInterval(fetchData, 60000);
        fetchData(); // 페이지 로딩 시 초기 데이터 불러오기
    
        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleNoticeClick = (event, notice) => {
        const rect = event.target.getBoundingClientRect();
        setModalPosition({
            top: rect.top,
            left: rect.right + 10
        });
        setSelectedNotice(notice);
    };

    const closeModal = () => {
        setSelectedNotice(null);
    };
    
    const showMoreList = (e) =>{
        setIsNoticeListOpen(!isNoticeListOpen)
    }

    return (
        <div className="side-notice">
            <div className='title-box'>
                <img className='meticon' src='./img/SideNotice.png' alt='Met Icon'/>
                <span className='mettitle'>공지사항</span>
                <a style={{fontSize:"14px", marginLeft:"25px", cursor:'pointer'}} onClick={showMoreList}>+더보기</a>
            </div><br/>
            <ul>
                {noticeList.map((notice) => (
                    <li key={notice.noticeNum} onClick={(e) => handleNoticeClick(e, notice)}>
                        {notice.noticeTitle}
                    </li>
                ))}
            </ul>

            {selectedNotice && (
                <Modal
                    isOpen={!!selectedNotice}
                    onRequestClose={closeModal}
                    contentLabel="Notice Detail"
                    className="sidemodal"
                    overlayClassName="sidemodal-overlay"
                    style={{
                        content: {
                            position: 'fixed',
                            top: `${modalPosition.top}px`,
                            left: `${modalPosition.left}px`,
                        }
                    }}
                >
                    <h2>{selectedNotice.noticeTitle}</h2>
                    <p>{selectedNotice.noticeContent}</p>
                    <button onClick={closeModal}>닫기</button>
                </Modal>
            )}
            {isNoticeListOpen &&
                <div>
                    <NoticeList isNoticeListOpen={isNoticeListOpen} setIsNoticeListOpen={setIsNoticeListOpen}/>
                </div>
            }
        </div>
    );
};

export default SideNotice;