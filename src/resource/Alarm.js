import React from 'react';
import { requestPermission } from '../firebase-messaging-sw';

const Alarm = ({ notifications, setNotifications }) => {
    requestPermission(setNotifications);

    return (
        <>
            {notifications.length > 0 && (
                <div className="latest-notification">
                    <p>{notifications[notifications.length - 1].content}</p>
                </div>
            )}
        </>
    );
};

export default Alarm;