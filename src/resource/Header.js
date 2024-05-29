import './App.css';

const Header = () => {
    return(
        <>
        <div className="header">
            <img className="headerLogo" src="img/logo2.png"/>
            <div className="headerLMenu">
            <a><h4>조직도</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a><h4>입퇴원 조회</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a><h4>처방 일지</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a><h4>병동 조회</h4></a>
            </div>
            <div className="headerRMenu">
            <img className="headerAlarm headerIcon" src="img/alarm.png"/>&nbsp;&nbsp;&nbsp;
            <img className="headerSchedule headerIcon" src="img/schedule.png"/>&nbsp;&nbsp;&nbsp;
            <img className="headerLogout headerIcon" src="img/logout.png"/>
            </div>
        </div>
        </>
    )
}
export default Header;