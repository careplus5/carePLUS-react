import React, { useEffect, useState } from 'react';
import '../css/AlarmIcon.css';
import { accessTokenAtom, fcmTokenAtom, usernameAtom } from '../config/Atom';
import { requestPermission } from '../firebase-messaging-sw';
import { useAtom, useAtomValue } from 'jotai';
import axios from 'axios';
import { url } from '../config';
import Alarm from './Alarm';
import AlarmOption from './AlarmOption';

const AlarmIcon = ({ }) => {
    const [notifications, setNotifications] = useState([]);
    const [newAlarm, setNewAlarm] = useState('');
    const [fcmToken, setFcmToken] = useAtom(fcmTokenAtom);
    const username = useAtomValue(usernameAtom);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isButtonVisibleIndex, setIsButtonVisibleIndex] = useState(null);
    const accessToken = useAtomValue(accessTokenAtom)
    const [showNotification, setShowNotification] = useState(false);
    const [showOption, setShowOption] = useState(false);
    const [unread, setUnread] = useState(notifications.length);

    const viewRealAlarm = () => {
        setShowNotification(true);
        const timer = setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    }
    requestPermission(setFcmToken, notifications, setNotifications, setNewAlarm, viewRealAlarm, setUnread);

        useEffect(() => {
            console.log(fcmToken)
            {/* 알림 모달 List 함수 */ }
            if (fcmToken) {
                //로그인 이후에 fcmToken을 백으로 전달
                axios.post(`${url}/changeFCMToken`, { fcmToken: fcmToken, empNum: username, headers: { Authorization: accessToken } })
                    .then(res => {
                        console.log(res.data); // res.date -> res.data로 수정
                        //알람 리스트를 가져오고
                        return axios.post(`${url}/alarmList`, { empNum: username });
                    })
                    .then(res2 => {
                        setNotifications(res2.data);
                        setUnread(res2.data.length);
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(accessToken);
                        console.error("에러:" + err);
                    });
            }
        }, [username]);

    const notificationModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setShowOption(false);
    };

    const handleNotificationClick = (alarmNum) => {
        const updatedNotifications = notifications.map(notification =>
            notification.alarmNum === alarmNum
                ? { ...notification, isCheck: true }
                : notification
        );

        setNotifications(updatedNotifications);

        axios.post(`${url}/checkAlarm`, { alarmNum: alarmNum })
            .then(res => {
                console.log(res.data);
                setUnread(updatedNotifications.filter(notification => !notification.isCheck).length);
            })
            .catch(err => {
                console.log(err);
            });
    };

    {/* 알림 모달 함수 */ }
    const newNotificationClick = () => {
        setShowNotification(false);
    };

    const sohwOptionController = () => {
        setShowOption(!showOption);
    }

    return (
        <>
            <div className="alarm-container" onClick={notificationModal}>
                <img className="alarmbell" src="img/alaram.png" alt="Alarm Bell" />
                {!isModalOpen && unread > 0 && ( // 변경된 상태 사용
                    <div className="notification-count">{unread}</div>
                )}
            </div>
            {/* 알림 모달 List 코드 */}
            {isModalOpen &&
                <div className='modalEventOverlay'>
                    <div className='modalEventContent'>
                        <div className='alarm-option'>
                            <button className='optionBtn' onClick={sohwOptionController}><img src='/img/option.png' alt='설정' style={{ width: "30px", height: "30px" }} /></button>
                            <button className="closeBtn" onClick={closeModal}>&times;</button>
                        </div>
                        <div className='12' style={{ overflowY: 'scroll', maxHeight: '300px' }}>
                            {notifications.map((notification, index) => (
                                <div key={notification.alarmNum} className="notificationItem" onMouseEnter={() => setIsButtonVisibleIndex(notification.alarmNum)} onMouseLeave={() => setIsButtonVisibleIndex(null)}>

                                    {!notification.isCheck ?
                                        <><div className="redDot"></div>
                                            <div className="alarmContent" onClick={() => handleNotificationClick(notification.alarmNum)}>{notification.content}</div></> :
                                        <><div className='redDotOff'></div>
                                            <div className="alarmCheckContent">{notification.content}</div></>}
                                    <div className="alarmButtons" style={{ visibility: isButtonVisibleIndex === index ? 'visible' : 'hidden' }}>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
            {/* 알림 모달 코드 */}
            {showNotification &&
                <div className="latest-notification" onClick={newNotificationClick}>
                    <Alarm alarm={newAlarm} />
                </div>
            }

            {/* 환경설정 모달 코드 */}
            {showOption &&
                <div>
                    <AlarmOption showOption={showOption} />
                </div>
            }
        </>
    );
};

export default AlarmIcon;
