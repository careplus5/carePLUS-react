import '../css/Adm.css';
import '../css/App.css';
import AmdPatientStorage from './AdmPatientStorage';  // 기타문서
import AmdPatientSurgeryDue from './AdmPatientSurgeryDue';  // 수술 
import AdmPatientAdmmission from './AdmPatientAdmmission';  // 입원
import AmdPatientDischarge from './AdmPatientDischarge';
import AmdPatientPrescription from './AdmPatientPrescription';  // 처방전 발급
import AdmDiagnosisDue from './AdmDiagnosisDue'; // 진료 예약
import AmdPatientTest from './AdmPatientTest';  // 검사
import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
import AdmPatientInfo from './AdmPatientInfo';

const Adm = () => {

    // accodion 파트
    const [accodionIndex, setAccodionIndex] = useState(null);

    const handleToggle = (index) => {
        setAccodionIndex(accodionIndex === index ? null : index);
    };

    // 환자번호
    const [patNum, setPatNum] = useState('');
    // 이름, 주민등록번호, 성별, 혈액형, 연락처, 주소, 과거병력
    const [patientData, setPatientData] = useState({
        patName: '', patJumin: '',
        patGender: '', patBloodType: '', patTel: '', patAddress: '', patHistory: ''
    });
    // 에러상황에서 
    const [error, setError] = useState(null);
    // select box (진료과, 주치의, 진료실)
    const [departmentList, setDepartmentList] = useState([]);
    // const [selectedDepartment, setSelectedDepartment] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState({ departmentNum: '', jobNum: '', departmentName: '' });
    // const [selectedDepartment, setSelectedDepartment] = useState();
    const [doctorList, setDoctorList] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState({ docNum: '', jobNum: '', docName: '' });
    const [doctorRoom, setDoctorRoom] = useState('');

    // 의사 스케줄에 따른 예약시간
    const [selectedDoctroScheduleTime, setSelectedDoctroScheduleTime] = useState('');

    //환자 조회 (환자번호로)
    const patientSearch = (e) => {
        e.preventDefault();

        console.log(patNum)
        console.log(patientData.patName);

        axios.post(`http://localhost:8080/patNumCheck`,
            { patNum: patNum }
        )
            .then(res => {
                setPatientData({ ...res.data });
                console.log(res.data);
            })
            .catch(err => {
                setError("신규환자입니다.");
            })
    }

    // 시간 슬롯 생성 함수
    const generateTimeSlots = () => {
        const slots = [];
        const startTime = new Date();
        startTime.setHours(9, 0, 0, 0);

        const endTime = new Date();
        endTime.setHours(18, 30, 0, 0);

        while (startTime < endTime) {
            const hours = startTime.getHours();
            const minutes = startTime.getMinutes();
            const period = hours < 12 ? 'AM' : 'PM';
            const formattedTime = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes === 0 ? '00' : minutes} ${period}`;
            slots.push(formattedTime);
            startTime.setMinutes(startTime.getMinutes() + 30);
        }

        return slots;
    };

    const timeSlots = generateTimeSlots();

    return (
        <div>
            <AdmPatientInfo />
        </div>
    )
}

export default Adm;