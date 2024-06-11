import OpenCalendar from './OpenCalendar.js'
import '../css/Header.css';

// import { useUser } from './UserProvider'; 사용자 정보 저장 및 제공하는 js만들기

const Header = () => {
    // const user = useUser();

    // if (!user) {
    //     return <div>Loading...</div>;
    // }
    const user = [
        {job: 'Doctor'}

    ];

    return(
        <div className="header">
            <img className="headerLogo" src="img/logo2.png"/>
            <div className="headerLMenu">
                <div className='headerMenu'>조직도</div>
                <div className='headerMenu'>입퇴원 조회</div>
                <div className='headerMenu'>처방 일지</div>
                <div className='headerMenu'>병동 조회</div>
            
        <header>
            <nav>
                {user.job === 'Doctor' && (
                    <ul>
                        <li>Patient List</li>
                        <li>Schedule</li>
                        <li>Prescriptions</li>
                    </ul>
                )}
                {user.job === 'Nurse' && (
                    <ul>
                        <li>Patient List</li>
                        <li>Daily Tasks</li>
                    </ul>
                )}
                {user.job === 'Admin' && (
                    <ul>
                        <li>Admin Panel</li>
                        <li>Reports</li>
                    </ul>
                )}
                {/* 다른 직업별 메뉴 추가 */}
            </nav>
        </header>
        </div>
            <div className="headerRMenu">
                <OpenCalendar modal={true}/>
            <img className="headerAlarm headerIcon" src="img/alaram.png"/>&nbsp;&nbsp;&nbsp;
            <img className="headerLogout headerIcon" src="img/logout.png"/>
            </div>
        </div>
    );
};
export default Header;