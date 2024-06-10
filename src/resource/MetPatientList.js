import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/MetPatientList.css';

const MetPatientList = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        // 임의의 테스트 데이터
        const testPatients = [
            { id: 1, num: '001482012', room:'2560', name: '김길동', SA:'F/49', bloodType:'AB+/AB+' ,test:'MRI(복부)' ,appointmentTime: '2024-06-03T09:00', status: 'waiting' },
            { id: 2, num: '001492012', room:'2560', name: 'Jane Smith', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)' , appointmentTime: '2024-06-03T09:30', status: 'waiting' },
            { id: 3, num: '001502012', room:'2560', name: 'Emily Johnson', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)' , appointmentTime: '2024-06-03T10:00', status: 'completed' },
            { id: 4, num: '001512012', room:'2560', name: '고길동', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)' , appointmentTime: '2024-06-03T08:00', status: 'in-progress' },
            { id: 5, num: '001522012', room:'2560', name: '송길동', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)' , appointmentTime: '2024-06-03T10:00', status: 'completed' },
            { id: 6, num: '001532012', room:'2560', name: '홍길동', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)' , appointmentTime: '2024-06-03T10:00', status: 'completed' },
            { id: 7, num: '001542012', room:'2560', name: '강길동', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)' , appointmentTime: '2024-06-03T10:00', status: 'completed' },
            { id: 8, num: '001552012', room:'2560', name: '차길동', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)' , appointmentTime: '2024-06-03T08:30', status: 'waiting' },
            { id: 9, num: '001562012', room:'2560', name: '독고길동', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)' , appointmentTime: '2024-06-03T10:00', status: 'completed' },
            { id: 10,num: '001572012', room:'2560', name: '남궁길동', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)' , appointmentTime: '2024-06-03T10:00', status: 'completed' }
        ];
        // 검사 시간 순으로 정렬
        const sortedPatients = testPatients.sort((a, b) => new Date(a.appointmentTime) - new Date(b.appointmentTime));
        setPatients(sortedPatients);
    }, []);
    
    // 실제 데이터를 가져오는 비동기 함수
    // useEffect(() => {
    //     const fetchPatients = async () => {
    //         try {
    //             const response = await axios.get('/api/patients/2023-06-03'); // 임의의 날짜 예시
    //             setPatients(response.data);
    //         } catch (error) {
    //             console.error('Error fetching patients', error);
    //         }
    //     };
    //     // 테스트 데이터가 제대로 설정되었는지 확인하기 위해 실제 데이터 가져오는 부분을 주석 처리합니다.
    //     // fetchPatients();
    // }, []);

    

    const handleStatusChange = (patNum, testStatus) => {
        const updatedPatients = patients.map(patient =>
            patient.id === patNum ? { ...patient, status: testStatus.target.value } : patient
        );

        // 상태별 재정렬: 'waiting' 및 'in-progress' 먼저, 'completed'는 나중에
        const sortedPatients = updatedPatients.sort((a, b) => {
            if (a.status === 'completed' && b.status !== 'completed') return 1;
            if (a.status !== 'completed' && b.status === 'completed') return -1;
            return new Date(a.appointmentTime) - new Date(b.appointmentTime);
        });

        setPatients(sortedPatients);

        // 여기에 상태 변경을 서버에 반영하는 코드를 추가할 수 있습니다.
        // 예를 들어, axios.post('/api/patients/update', { id: patNum, status: testStatus.target.value });
    };


    return (
        <div className='patientlist-box'>
            <div className='title-box'>
                <img className='meticon' src='./img/MetPList.png' alt='Met Icon'/>
                <span className='mettitle'>진행상황</span>
            </div>
            <br/>
            <ul className="patient-list">
                {patients.map((patient) => (
                    <li key={patient.num} className='patient-item'>
                        <select className={`select-box ${patient.status}`}
                            value={patient.status || ''}
                            onChange={(testStatus) => handleStatusChange(patient.id, testStatus)}
                        >
                            <option value="">상태 선택</option>
                            <option value="waiting" style={{ color: 'yellow' }}>대기중</option>
                            <option value="in-progress" style={{ color: 'green' }}>진행중</option>
                            <option value="completed" style={{ color: 'lightgrey' }}>완료</option>
                        </select>
                        <div className="patient-info">
                            <p>{patient.room+' '+patient.name+' ('+patient.SA+') '+patient.num+' '+patient.bloodType}</p>
                            <p>검사: {patient.test}</p>
                        </div>
                        {/* <p>{new Date(patient.appointmentTime).toLocaleTimeString()}</p> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MetPatientList;