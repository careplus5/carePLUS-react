import './css/App.css';
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
import React, {useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { UserProvider } from './resource/UseContext';

function App() {

  const navigate = useNavigate();
 const [loggedInUsername, setLoggedInUsername] = useState('');
const [isLoggedIn, setIsLoggedIn] = useState(false);

 const handleLoginSuccess = (username) => {
  setLoggedInUsername(username);
  setIsLoggedIn(true);
  navigate("/organ");
 }
  
  return(
    <UserProvider>
    <div className="App">
      <div className={isLoggedIn === true ? 'inCarePlus':'outCarePlus'}>
        <Header loggedInUsername={loggedInUsername}/>
        <Sidebar/>
      </div>
 <Routes>
  <Route exect path="/" element={<Login onLoginSuccess={handleLoginSuccess}/>}/>
  <Route exect path="/organ" element={<OrganizationChart/>}/>
 </Routes>

</div>
</UserProvider>
  );
}

export default App;
