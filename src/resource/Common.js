// Layout.js
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import OrganizationChart from './OrganizationChart';
import NurPatientList from './NurPatientList';
import { useAtom, useAtomValue } from 'jotai';
import { accessTokenAtom, usernameAtom} from '../config/Atom.js';
import { useState,useEffect } from 'react';
// import Alarm from './Alarm.js';
const Common = ({loggedInUsername}) => {
  const username = useAtomValue(usernameAtom);
  function findMenu(e){
    const menu = '#'+e;
    const Menu = document.querySelectorAll(menu);
    Menu.forEach(element=>{
        element.style.display="block";
    })}
    useEffect(()=>{
      console.log("common redirect");
      const iden = username.substring(0,2);
      console.log(iden);
      if(iden=="12"){
      findMenu('nurMenu');
      return;
      } else if(iden=="11"){
         findMenu('docMenu');
      return;
        }
  },[]);
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