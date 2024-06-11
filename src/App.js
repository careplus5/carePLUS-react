import './css/App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Header from './resource/Header';
import NurPatientList from './resource/NurPatientList';
import Sidebar from './resource/Sidebar';
import Login from './resource/Login';
import { RecoilRoot } from 'recoil';
import React, {useState} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Common from './resource/Common';
import OpenCalendar from './resource/OpenCalendar';
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
    navigate("/organ");
  }
 
 }
  
  return(
    <RecoilRoot>

      {/* <Routes>
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

</RecoilRoot>
 );
}

export default App;
