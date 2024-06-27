import '../css/Alarm.css';

const Alarm = ({ alarm }) => {

    return (
        <>
            <div className='newNotice-container' style={{padding:"10px"}}>
                <div className='newNotice-img'>
                    <img src='/img/notification.png' alt='알림 사진'/>
                </div>
                <div className='newNotice-content'>{alarm.content}</div>
            </div>
        </>
    );
};

export default Alarm;