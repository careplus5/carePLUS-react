import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MetPatientList from './MetPatientList';
import MetTestResult from './MetTestResult';
import MetNotice from './MetNotice';
import MetTestSearch from './MetTestSearch';
import { url } from '../config';
import { useAtomValue } from 'jotai';
import { usernameAtom } from '../config/Atom';

function MetMain() {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [userInfo, setUserInfo] = useState(null); // userInfo 상태 추가
    const userId = useAtomValue(usernameAtom);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 사용자 정보 가져오기
                const res = await axios.get(`${url}/userInfo?userId=${userId}`);
        
                // 사용자 정보 상태 업데이트하기
                setUserInfo(res.data);
            } catch (error) {
                console.error('사용자 정보 가져오기 오류 발생:', error);
            }
        };
    
        fetchData();
    }, [userId]);

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
    };

    return (
        <div className="background matmain">
            <MetPatientList onPatientSelect={handlePatientSelect} userInfo={userInfo} />
            {selectedPatient && <MetTestResult selectedPatient={selectedPatient} userInfo={userInfo} />}
            {selectedPatient && <MetNotice selectedPatient={selectedPatient} />}
            {selectedPatient && <MetTestSearch selectedPatient={selectedPatient} userInfo={userInfo} />}
        </div>
    );
}

export default MetMain;
