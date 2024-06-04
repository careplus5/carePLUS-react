import '../css/Header.css';
import { useState,useEffect,useContext } from 'react';
import UserContext from './UseContext';
import {useNavigate} from 'react-router-dom';
const Header = () => {
    const {username} = useContext(UserContext);
    const [emp, setEmp] = useState(username);
    const [identify, setIdentify] = useState('');
    const navigate = useNavigate();
    function findMenu(e){
        const menu = '#'+e;
        const Menu = document.querySelectorAll(menu);
        Menu.forEach(element=>{
            element.style.display="block";
        })
    }

    const logout = () =>{
        setEmp('');
        localStorage.removeItem('token');
        navigate("/");
        console.log(username);
        
    }
    useEffect(()=>{
        const iden = username.substring(0,2);
        console.log(iden);
        if(iden=="12"){
        findMenu('nurMenu');
        } else if(iden=="11"){
            
           findMenu('docMenu');
        }
    
    })

    return(
        <>
        <div className="header">
            <img className="headerLogo" src="img/logo2.png"/>
            <div className="headerLMenu">
            <a id="a" href="/organ"><h4 style={{marginTop:"16px", marginLeft:"30px", fontSize:"20px"}}>조직도</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
                {/* nurse */}
            <a ><h4 id="nurMenu">입퇴원 조회</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a><h4 id="nurMenu">처방 일지</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a><h4 id="nurMenu">병동 조회</h4></a>


            {/* doctor */}
            <a><h4 id="docMenu">담당 환자</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a><h4 id="docMenu">외래 진료</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a><h4 id="docMenu">입원 진료</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a><h4 id="docMenu">수술 진료</h4></a>

            {/* adminHos */}
            <a><h4 id="admHMenu">기타 발급</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a><h4 id="admHMenu">수납 조회</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a><h4 id="admHMenu">환자 조회</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a><h4 id="admHMenu">예약 메시지</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;

            {/* medicalTech */}
            <a><h4 id="metMenu">환자 목록</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a><h4 id="metMenu">스케줄</h4></a>&nbsp;&nbsp;&nbsp;&nbsp;
 

            </div>
            <div className="headerRMenu">
            <button id="headerRightButton"><img className="headerAlarm headerIcon" src="img/alaram.png"/></button>&nbsp;&nbsp;&nbsp;
            <button id="headerRightButton"> <img className="headerSchedule headerIcon" src="img/schedule.png"/></button>&nbsp;&nbsp;&nbsp;
            <button id="headerRightButton" onClick={logout}><img className="headerLogout headerIcon" src="img/logout.png"/></button>
            </div>
        </div>
        </>
    )
}
export default Header;