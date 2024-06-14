import './css/App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Header from './resource/Header';
import NurPatientList from './resource/NurPatientList';
import Sidebar from './resource/Sidebar';
import Login from './resource/Login';
import DiagnosisPatient from './resource/DiagnosisPatient';
import Admin from './resource/Admin';
import NurPatientInfo from './resource/NurPatientInfo';
import NurDailyPrescription from './resource/NurDailyPrescription';
import NurDisAdmModal from './resource/NurDisAdmModal';
import NurWardList from './resource/NurWardList';
import OrganizationChart from './resource/OrganizationChart';
import { RecoilRoot } from 'recoil';
import React, {useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Common from './resource/Common';
import OpenCalendar from './resource/OpenCalendar';
import SurgeryPatient from './resource/SurgeryPatient';
import { usernameAtom } from './config/Atom';
import { useAtom } from 'jotai';


function App() {
const navigate = useNavigate();
const [loggedInUsername, setLoggedInUsername] = useState('');
const [isLoggedIn, setIsLoggedIn] = useState(false);
const username = useAtom(usernameAtom);

 const handleLoginSuccess = () => {
  if(username){
    setIsLoggedIn(true);
    // navigate("/organ");
  }
 
 }
  
  return(
  
<>      {/* <Routes>
        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess}/>}/>
        <Route 
          path="/*" 
          element={
            <Common loggedInUsername={loggedInUsername}/>}/>
      </Routes>
      {/* <div className={isLoggedIn === true ? 'inCarePlus':'outCarePlus'}>
        <Header loggedInUsername={loggedInUsername}/>
        <Sidebar/>
      </d
      iv> */}
     
 <Routes>
 <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess}/>}/>
<Route path="/*" element={ <Common loggedInUsername={loggedInUsername}/>}/>
                  </Routes>
                  </>

 );
}

export default App;
