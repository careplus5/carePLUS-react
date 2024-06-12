import React, { useEffect, useState } from 'react';
import '../css/AlarmIcon.css';
import { accessTokenAtom, fcmTokenAtom, usernameAtom } from '../config/Atom';
import { requestPermission } from '../firebase-messaging-sw';
import { useAtom, useAtomValue } from 'jotai';
import axios from 'axios';
import { url } from '../config';

const AlarmIcon = ({ }) => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0); // 새로운 상태 추가
    const [fcmToken, setFcmToken] = useAtom(fcmTokenAtom);
    // const [username, setUserNameAtom] = useAtom(usernameAtom)
    const username = useAtomValue(usernameAtom);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alarmIsOn, setAlarmIsOn] = useState(false);
    const [isButtonVisibleIndex, setIsButtonVisibleIndex] = useState(null);
    const accessToken = useAtomValue(accessTokenAtom)
    requestPermission(setFcmToken, notifications, setNotifications);

    useEffect(() => {
        console.log(fcmToken)
        if (fcmToken) {
            axios.post(`${url}/changeFCMToken`, { fcmToken: fcmToken, empNum: username, headers: {Authorization: accessToken} })
                .then(res => {
                    console.log(res.data); // res.date -> res.data로 수정
                    return axios.post(`${url}/alarmList`, { empNum: username });
                })
                .then(res2 => {
                    console.log(res2.data);
                    setNotifications(res2.data);
                    axios.post(`${url}/checkAlarmStatus`, { empNum: username })
                    .then(res3 => {
                        console.log(res3.data);
                        setAlarmIsOn(res3.data.alarmStatus);
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(accessToken);
                        console.err("에러:"+err);
                    });

                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, []);

    const notificationModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const alarmStatus = () => {
        axios.post(`${url}/changeAlarmStatus`, { empNum: 11120240610 })
            .then(res => {
                console.log(res.data);
                setAlarmIsOn(!alarmIsOn);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleNotificationClick = (alarmNum) => {
        //const clickedNotification = notifications[index];
        //if (!clickedNotification.isCheck) {
            axios.post(`${url}/checkAlarm`, { alarmNum: alarmNum })
                .then(res => {
                    console.log(res.data);
                    setNotifications(notifications.filter(item=>item.alarmNum!=alarmNum));
                    setUnreadCount(notifications.length);
                    // const updatedNotificationList = [...notifications];
                    // updatedNotificationList[index].isCheck = true;
                    // setNotifications(updatedNotificationList);
                    const unread = notifications.filter(notification => !notification.isCheck).length;
                })
                .catch(err => {
                    console.log(err);
                });
       // }
    };
    return (
        <>
            <div className="alarm-container" onClick={notificationModal}>
                <img className="alarmbell" src="img/alaram.png" alt="Alarm Bell" />
                {!isModalOpen && notifications.length > 0 && ( // 변경된 상태 사용
                    <div className="notification-count">{notifications.length}</div>
                )}
            </div>
            {isModalOpen &&
     <div className='modalEventOverlay'>
     <div className='modalEventContent'>
         <button className="closeBtn" onClick={closeModal}>&times;</button>
         {notifications.map((notification, index) => (
             <div key={notification.alarmNum} className="notificationItem" onMouseEnter={() => setIsButtonVisibleIndex(index)} onMouseLeave={() => setIsButtonVisibleIndex(null)}>
                 {!notification.isCheck && <div className="redDot"></div>}
                 {!notification.isCheck ? 
                 <div className="alarmContent" onClick={() => handleNotificationClick(notification.alarmNum)}>{notification.content}</div> :
                 <div className="alarmCheckContent">{notification.content}</div>}
                 <div className="alarmButtons" style={{ visibility: isButtonVisibleIndex === index ? 'visible' : 'hidden' }}>
                     {alarmIsOn ? (
                         <img src='/img/onAlarm.png' onClick={alarmStatus} className='alarmStatus' alt='Alarm On' />
                     ) : (
                         <img src='/img/offAlarm.png' onClick={alarmStatus} className='alarmStatus' alt='Alarm Off' />
                     )}
                 </div>
             </div>
         ))}
     </div>
 </div>                
            }
            {/* {isModalOpen && (
                <AlarmModal 
                    notifications={notifications} 
                    setIsModalOpen={setIsModalOpen} 
                    isModalOpen={isModalOpen} 
                    setNotifications={setNotifications} // setNotifications 전달
                    setUnreadCount={setUnreadCount} // setUnreadCount 전달
                />
            )} */}
        </>
    );
};

export default AlarmIcon;
