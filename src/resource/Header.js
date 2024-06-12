import '../css/Header.css';
import { useState,useEffect } from 'react';
import {useNavigate, Routes, Route, Link} from 'react-router-dom';
import NurPatientList from './NurPatientList';
import OrganizationChart from './OrganizationChart';
import { useAtom, useAtomValue } from 'jotai';
import { accessTokenAtom, empAtom, usernameAtom} from '../config/Atom.js';
import Calendar from './calendar.js';
import AlarmIcon from './AlarmIcon';
import OpenCalendar from './OpenCalendar';
import DiagnosisPatient from './DiagnosisPatient.js';
import MetMain from './MetMain';
import SurgeryPatient from './SurgeryPatient.js';
import NurDailyPrescription from './NurDailyPrescription.js';

const Header = () => {
    const [emp, setEmp] = useAtom(empAtom);
    const username = useAtomValue(usernameAtom);
    const [menuItems, setMenuItems] = useState([]);
    const navigate = useNavigate();
  
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    function findMenu(e){
        const menu = '#'+e;
        const Menu = document.querySelectorAll(menu);
        Menu.forEach(element=>{
            element.style.display="block";
        })
        // setMenuVis(prevState => ({
        //     ...prevState,
        //     [e]:true
        // }));
    }

    const logout = () =>{
        setEmp('');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('memo');
        navigate("/login");
        console.log(username+"님이 로그아웃하셧슨디ㅏ.");
        
    }
    useEffect(()=>{
        
        console.log(username);
        const iden = username.substring(0,2);
        console.log(iden);
        if(iden=="12"){
       setMenuItems([
        { to: "/wardPatientList", label: "입퇴원 조회" },
        { to: "/wardDailyPresc", label: "처방 일지" },
        { to: "/wardList", label: "병동 조회" }])
        } else if(iden=="11"){
            
            setMenuItems([
                { to: "/wardPatientList", label: "담당 환자" },
                { to: "/diagnosisPatient", label: "외래 진료" },
                { to: "/wardDailyPresc", label: "입원 진료" },
                { to: "/surgeryPatient", label: "수술 진료" }
            ]);
        } else if(iden=="13"){
            setMenuItems([
                { to: "/wardPatientList", label: "원무과 업무" },
                { to: "/wardPatientList", label: "예약 메시지" },
            ]);
        }
        else if(iden=="14"){
            setMenuItems([
                { to: "/wardPatientList", label: "원무과 업무" },
                { to: "/wardPatientList", label: "예약 메시지" },
            ]);
        }
        console.log("header redirect");
    
    },[username])

    return(
        <>
        <div className="header">
            <img className="headerLogo" src="img/logo2.png"/>
            <div className="headerLMenu">
            <Link id="headerMenuName" to="/organ"><h4 id='headerMenuName' style={{marginTop:"16px", marginLeft:"60px", fontSize:"20px"}}>조직도</h4></Link>
            {menuItems.map((item, index) => (
                        <Link key={index} id="headerMenuName" to={item.to}>
                            <h4 id='headerMenuName' style={{ marginTop: "16px", marginLeft: "30px", fontSize: "20px" }}>
                                {item.label}
                            </h4>
                        </Link>
                    ))}
            
                {/* nurse */}
                {/* <Link id="a" to="/wardPatientList"><h4 id="nurMenu">입퇴원 조회</h4></Link>
                <Link id="a" to="/wardDailyPresc"><h4 id="nurMenu">처방 일지</h4></Link>
                <Link id="a" to="/wardList"><h4 id="nurMenu">병동 조회</h4></Link> */}
            {/* doctor */}
            {/* <Link id="a" to="/wardPatientList"><h4 id="docMenu">담당 환자</h4></Link>
            <Link id="a" to="/wardPatientList"><h4 id="docMenu">외래 진료</h4></Link>
                <Link id="a" to="/wardDailyPresc"><h4 id="docMenu">입원 진료</h4></Link>
                <Link id="a" to="/wardList"><h4 id="docMenu">수술 진료</h4></Link> */}

            {/* adminHos */}
            <a><h4 id="admHMenu">기타 발급</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a><h4 id="admHMenu">수납 조회</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a><h4 id="admHMenu">환자 조회</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a><h4 id="admHMenu">예약 메시지</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;

            {/* medicalTech */}
            <a><h4 id="metMenu">환자 목록</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a><h4 id="metMenu">스케줄</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
 
            <Routes>
                    <Route path="/organ" element={<OrganizationChart/>}/>
                    <Route path="/wardPatientList" element={<NurPatientList/>}/>
                    <Route path="/diagnosisPatient" element={<DiagnosisPatient/>}/>
                    <Route path="/metMain" element={<MetMain/>}/>
                    <Route path="/surgeryPatient" element={<SurgeryPatient/>}/>
                    <Route path="wardDailyPresc" element={<NurDailyPrescription/>}/>
                    {/* <Route path="/wardDailyPresc" element={}/>
                    <Route path="/wardList" element={}/> */}
                </Routes>
            </div>

            <div className="headerRMenu">
            <AlarmIcon/>
            <OpenCalendar  />
            <button id="headerRightButton" onClick={logout}><img className="headerLogout headerIcon" src="img/logout.png"/></button>
            </div>
        </div>
        </>
    )
}
export default Header;