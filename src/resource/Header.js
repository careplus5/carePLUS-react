import '../css/Header.css';
import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import NurPatientList from './NurPatientList';
import OrganizationChart from './OrganizationChart';
import NurDiagPatientInfo from './NurDiagPatientInfo.js';
import { useAtom, useAtomValue } from 'jotai';
import { accessTokenAtom, empAtom, usernameAtom} from '../config/Atom.js';
import NurDiagPatientList from './NurDiagPatientList.js';
import axios from 'axios';
import AlarmIcon from './AlarmIcon';
import OpenCalendar from './OpenCalendar';
import DiagnosisPatient from './DiagnosisPatient.js';
import MetMain from './MetMain';
import SurgeryPatient from './SurgeryPatient.js';
import NurDailyPrescription from './NurDailyPrescription.js';
import Adm from './Adm.js';
import NurPatientInfo from './NurPatientInfo.js';
import Admin from './Admin.js';
import AdmissionDiagPatient from './AdmissionDiagPatient.js';
import DocDiagPatient from './DocDiagPatient.js';
import NurWardList from './NurWardList.js';

const Header = () => {
    const [emp, setEmp] = useAtom(empAtom);
    const username = useAtomValue(usernameAtom);
    const [empName, setEmpName]=useState('');
    const [menuItems, setMenuItems] = useState([]);
    const navigate = useNavigate();

    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    function findMenu(e) {
        const menu = '#' + e;
        const Menu = document.querySelectorAll(menu);
        Menu.forEach(element => {
            element.style.display = "block";
        })
        // setMenuVis(prevState => ({
        //     ...prevState,
        //     [e]:true
        // }));
    }

    const logout = () => {
        setEmp('');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('memo');
        navigate("/login");
        console.log(username + "님이 로그아웃하셧슨디ㅏ.");

    }

    useEffect(()=>{
        axios.get('/empName')
        .then(res=>{
            console.log("header's get: "+res);
            setEmpName(res.data);
        })
        .catch(err =>{
            console.log(err);
        })
    },[username])
    useEffect(()=>{
        console.log(username);
        const iden = username.substring(0, 2);
        const idenSub = username.substring(3,4);
        console.log(iden);
        if (iden == "12") {
            if(idenSub == "1"){
                setMenuItems([
                    { to: "/nurDiagPatientList", label: "환자 조회" },
                    { to: "/wardPatientList", label: "입퇴원 조회" },
                    { to: "/wardDailyPresc", label: "처방 일지" },
                    { to: "/wardList", label: "병동 조회" }]
                )
            } else if(idenSub =="2"){
                setMenuItems([
                    { to: "/wardPatientList", label: "입퇴원 조회" },
                    { to: "/wardDailyPresc", label: "처방 일지" },
                    { to: "/wardList", label: "병동 조회" }])
            }
            
        } else if (iden == "11") {

            setMenuItems([
                { to: "/docDiagnosis", label: "외래 진료" },
                { to: "/docAdmissionDiag", label: "입원 진료" },
                { to: "/docSurgeryDiag", label: "수술 진료" },
                { to: "/docDiagPatient", label: "담당 환자" },

            ]);
        } else if (iden == "13") {
            setMenuItems([
                { to: "/Adm", label: "원무과 업무" },
                { to: "/wardPatientList", label: "예약 메시지" },
            ]);
        }
        else if (iden == "14") {
            setMenuItems([
                { to: "/metMain", label: "메인" }
            ]);
        }
        else if (iden == "99") {
            setMenuItems([
                { to: "admin", label: "메인" }
            ])
        };
        console.log("header redirect");

    }, [username])

    return (
        <>
            <div className="header">
                <img className="headerLogo" src="img/logo2.png" />
                <div className="headerLMenu">&nbsp;&nbsp;&nbsp;
                    {menuItems.map((item, index) => (
                        <Link key={index} id="headerMenuName" to={item.to}>
                            <h4 id='headerMenuName' style={{ marginTop: "16px", marginLeft: "30px", fontSize: "20px" }}>
                                {item.label}
                            </h4>
                        </Link>
                        
                    ))}
   <Link id="headerMenuName" to="/organ"><h4 id='headerMenuName' style={{ marginTop: "16px", marginLeft: "30px", fontSize: "20px" }}>조직도</h4></Link>
            <Routes>
                    <Route path="/organ" element={<OrganizationChart/>}/>
                    <Route path="/wardPatientList" element={<NurPatientList/>}/>
                    <Route path="/docDiagnosis" element={<DiagnosisPatient/>}/>
                    <Route path="/metMain" element={<MetMain/>}/>
                    <Route path="/docSurgeryDiag" element={<SurgeryPatient/>}/>
                    <Route path="/wardDailyPresc" element={<NurDailyPrescription/>}/>
                    <Route path="/MetMain" element={<MetMain/>}/>
                    <Route path="/nurDiagPatientList" element={<NurDiagPatientList/>}/>
                    <Route path="/adm" element={<Adm/>}/>
                    <Route path="/nurpatientinfo/:admissionNum" element={<NurPatientInfo />} />
                    <Route path="/nurDiagPatientInfo/:diagnosisNum" element={<NurDiagPatientInfo/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/docAdmissionDiag" element={<AdmissionDiagPatient/>}/>
                    <Route path="/docDiagPatient" element={<DocDiagPatient/>}/>
                    {/* <Route path="/adm" element={<Adm/>}/> */}
                    {/* <Route path="/wardDailyPresc" element={}/>
                    <Route path="/wardList" element={}/> */}
                     <Route path="/wardList" element={<NurWardList/>}/>
                    </Routes>
                </div>

                <div className="headerRMenu">
                    {username.substring(0, 2) !== "99" &&
                        <>
                            <AlarmIcon />
                            <OpenCalendar />
                        </>
                    }
                    <button id="headerRightButton" onClick={logout}><img className="headerLogout headerIcon" src="img/logout.png" /></button>
                </div>
            </div>
        </>
    )
}
export default Header;