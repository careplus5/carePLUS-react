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
import Calendar from './resource/calendar';
import OrganizationChart from './resource/OrganizationChart';
import { RecoilRoot } from 'recoil';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Common from './resource/Common';
import OpenCalendar from './resource/OpenCalendar';
import UserContext, { UserProvider } from './resource/UseContext';
import SurgeryPatient from './resource/SurgeryPatient';


function App() {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [loggedInUsername, setLoggedInUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLoginSuccess = (username) => {

    setLoggedInUsername(username);
    setIsLoggedIn(true);
    navigate("/organ");
  }

  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/*" element={<Common loggedInUsername={loggedInUsername} />} />
      </Routes>
    </RecoilRoot>
  );
}

export default App;
