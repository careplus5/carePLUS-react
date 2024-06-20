import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/MetPatientList.css';
import { url } from '../config';


const MetPatientList = ({ onPatientSelect, userInfo }) => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const today = new Date();
                const formattedToday = today.toISOString().split('T')[0];
                const response = await axios.get(`${url}/testTodayList?dept2Name=${userInfo.department2Name}&today=${formattedToday}`);
                const sortedPatients = sortPatients(response.data); // 데이터를 받아오고 정렬
                setPatients(sortedPatients); // 정렬된 데이터를 상태에 설정
            } catch (error) {
                console.error('오늘 수락된 검사 목록을 가져오는 중 오류 발생:', error);
            }
        };  
        fetchData();
    }, [userInfo]);

    const sortPatients = (patients) => {
        return patients.sort((a, b) => {
            const timeA = new Date(a.testAppointmentTime);
            const timeB = new Date(b.testAppointmentTime);
            const statusPriority = {
                '대기중': 1,
                '진행중': 0,
                '완료': 2
            };

            // 상태 기준으로 비교
            if (statusPriority[a.testStatus] < statusPriority[b.testStatus]) return -1;
            if (statusPriority[a.testStatus] > statusPriority[b.testStatus]) return 1;

            // 상태가 같은 경우 예약 시간으로 비교
            if (timeA < timeB) return -1;
            if (timeA > timeB) return 1;

            return 0; // 동일한 경우
        });
    };

    const handleStatusChange = async (testNum, event) => {
        const newTestStatus = event.target.value;

        try {
            const response = await axios.post(`${url}/updateTestStatus`, {
                id: testNum,
                testStatus: newTestStatus
            });

            if (response.data === true) {
                // 프론트엔드에서 상태 업데이트
                setPatients((prevPatients) => {
                    const updatedPatients = prevPatients.map((patient) =>
                        patient.testNum === testNum ? { ...patient, testStatus: newTestStatus } : patient
                    );
                    return sortPatients(updatedPatients); // 정렬 함수 호출
                });
            } else {
                console.log('상태 업데이트 실패');
            }
        } catch (error) {
            console.error('상태 업데이트 오류:', error);
        }
    };

    return (
        <div className='patientlist-box matmain'>
            <div className='mettitle-box'>
                <img className='meticon' src='./img/MetPList.png' alt='Met Icon' />
                <span className='mettitle'>진행상황</span>
            </div>
            <ul className="patient-list">
                {sortPatients(patients).map((patient, i) => {
                    const patJumin = patient.patJumin;
                    const birthYear = patJumin ? (parseInt(patJumin.substring(0, 2)) + (patJumin[6] <= '2' ? 1900 : 2000)) : null;
                    const currentYear = new Date().getFullYear();
                    const age = birthYear ? currentYear - birthYear : null;
                    return (
                        <li key={i} data-id={patient.testNum} className='patient-item'onClick={() => onPatientSelect(patient)}>
                            <select
                                className={`select-box ${patient.testStatus === '대기중' ? 'waiting' : ''} ${patient.testStatus === '진행중' ? 'in-progress' : ''} ${patient.testStatus === '완료' ? 'completed' : ''}`}
                                value={patient.testStatus || ''}
                                onChange={(event) => handleStatusChange(patient.testNum, event)}
                            >
                                {/* <option value="">상태 선택</option> */}
                                <option value="대기중">대기중</option>
                                <option value="진행중">진행중</option>
                                <option value="완료">완료</option>
                            </select><br />
                            {patient.room} {patient.patName} ({patient.patGender}/{age})<br /> {patient.patNum} {patient.patBloodType}형
                            <div style={{fontWeight:'500', paddingTop:'5px'}}>검사 : {patient.testPart}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MetPatientList;
