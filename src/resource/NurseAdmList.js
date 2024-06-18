import "../css/NurPatientInfo.css";
import '../css/App.css';

import axios from 'axios';
import NurDisAdmModal from './NurDisAdmModal.js';
import React, {useState, useEffect} from 'react';
import { admAtom } from '../config/Atom.js';
import { useAtomValue } from 'jotai';
import { url } from '../config.js';
const NurseAdmList = ({nurseRecords}) => {
    const admission = useAtomValue(admAtom);
    const [filteredNurseRecordsList, setFilteredNurseRecordsList] = useState([]);
const admissionNum = admission.admissionNum;   
    return (
        <div style={{position:"relative"}}>
        {nurseRecords.map((nurRec, index) => (
          <div key={index} style={{positon:"relative"}}>
            <br/>
            <div>
            <p style={{ color: "gray" }}>날짜 {nurRec.date} 담당 간호사 {nurRec.nurName}<br/><br/></p>
            </div>
            <div>
              <input id="nurDailyContent" type="text" value={nurRec.content} disabled />
              </div>
          </div>
        ))}
      </div>
  );
};

export default NurseAdmList;