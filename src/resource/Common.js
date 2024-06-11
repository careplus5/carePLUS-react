// Layout.js
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import {Routes, Route, useNavigate} from 'react-router-dom';
import OrganizationChart from './OrganizationChart';
import NurPatientList from './NurPatientList';
import { useState,useEffect,useContext } from 'react';
import UserContext from './UseContext';
const Common = ({loggedInUsername}) => {
  const {username} = useContext(UserContext);
  function findMenu(e){
    const menu = '#'+e;
    const Menu = document.querySelectorAll(menu);
    Menu.forEach(element=>{
        element.style.display="block";
    })}
    useEffect(()=>{
      const iden = username.substring(0,2);
      console.log(iden);
      if(iden=="12"){
      findMenu('nurMenu');
      } else if(iden=="11"){
          
         findMenu('docMenu');
      }
  
  })
  return (
    //  className={loggedInUsername ? 'inCarePlus' : 'outCarePlus'}
    <div className="inCarePlus">
      <>
        <Header loggedInUsername={loggedInUsername} />
        <Sidebar />
      </>
  
  </div>
  );
}

export default Common;