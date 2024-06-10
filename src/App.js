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
import React, {useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { UserProvider } from './resource/UseContext';
import Common from './resource/Common';
import OpenCalendar from './resource/OpenCalendar';


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
<<<<<<< HEAD
//     <UserProvider>
//        <Common loggedInUsername={loggedInUsername}/>
//       {/* <Routes>
//         <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess}/>}/>
//         <Route 
//           path="/*" 
//           element={
//             <Common loggedInUsername={loggedInUsername}/>}/>
//       </Routes>
//       {/* <div className={isLoggedIn === true ? 'inCarePlus':'outCarePlus'}>
//         <Header loggedInUsername={loggedInUsername}/>
//         <Sidebar/>
//       </div> */} 
//  <Routes>
//   <Route path="/" element={<Login  onLoginSuccess={handleLoginSuccess}/>}/>
//   <Route path="/organ" element={<OrganizationChart/>}/>
//   <Route path="/wardPatientList" element={<NurPatientList/>}/>
//  </Routes>
// </UserProvider>
<div>
  <Sidebar/>
<NurPatientList/>
</div>
=======
    // <UserProvider>
    //   <Routes>
    //     <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess}/>}/>
    //     <Route 
    //       path="/*" 
    //       element={
    //         <Common loggedInUsername={loggedInUsername}/>}/>
    //   </Routes>
    //   {/* <div className={isLoggedIn === true ? 'inCarePlus':'outCarePlus'}>
    //     <Header loggedInUsername={loggedInUsername}/>
    //     <Sidebar/>
    //   </div> */}
    //   <Routes>
    //     <Route exect path="/organ" element={<OrganizationChart/>}/>
    //     <Route exect path="/wardPatientList" element={<NurPatientList/>}/>
    //   </Routes>
    // </UserProvider>
    <div>
      {/* <Header/> */}
      <Sidebar/>
      <DiagnosisPatient/>
    </div>
>>>>>>> efc367f51adfc7107aa4db5f03c31dfb32b0cab9
  );
}

export default App;
