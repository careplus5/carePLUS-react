import '../css/Adm.css';
import '../css/App.css';
import AmdPatientStorage from './Adm PatientStorage';  // 기타문서
import AmdPatientSurgeryDue from './Adm PatientSurgeryDue';  // 수술 
import AdmPatientAdmmission from './AdmPatientAdmmission';  // 입원
import AmdPatientDischarge from './AdmPatientDischarge';
import AmdPatientPrescription from './AdmPatientPrescription';  // 처방전 발급
import AmdPatientTest from './AdmPatientTest';  // 검사
import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';

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

    // 88961001 환자 번호
    // http://localhost:8080/patNumCheck?patNum=88961001
    // 위에는 get 방식 -> post 방식은 이렇게 안쓴다

    //환자 조회 (환자번호로)
    const patientSearch = (e) => {
        e.preventDefault();

        // alert("AAA");
        // alert("조회완료");
        console.log(patNum)
        console.log(patientData.patName);
        // axios.post(`http://192.168.0.251/patNumCheck`,
        //     {patNum:patNum}
        // )
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

    // 진료과 목록 가지고 오기 select 
    useEffect(() => {
        axios.get(`http://localhost:8080/departments`)
            .then(res => {
                setDepartmentList([...res.data]);
                console.log(res.data);
            })
            .catch(err => {
                alert("조회에러");
            })
    }, [])

    // 주치의 목록 가지고 오기 select 
    useEffect(() => {
        if (selectedDepartment) {
            axios.get(`http://localhost:8080/doctors?departmentNum=${selectedDepartment.departmentNum}`)
                .then(res => {
                    // doctorList(res.data);
                    setDoctorList([...res.data]);
                    console.log(selectedDoctor);
                    console.log(res.data);
                })
                .catch(err => {

                });
        } else {
            setDoctorList([]);
        }
    }, [selectedDepartment]);
    // // 환자 정보가 있으면.. 
    // const pSearchValue = (e) => {
    //     patient(e.target.value);
    // }

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

    // 진료예약 접수
    const registSubmit = () => {
        alert("등록 & 접수 완료");
    }

    // 검사
    const testSubmit = () => {
        alert("검사 접수 완료");
    }

    // 입원
    const admissionSubmit = () => {
        alert("입원 접수 완료");
    }

    // 수술
    const surgerySubmit = () => {
        alert("수술 접수 완료");
    }

    // 처방전 발급
    const prescriptionSubmit = () => {
        alert("조회 완료");
    }

    // 기타문서발급
    const storageSubmit = () => {
        alert("조회 완료");
    }

    // 퇴원 버튼
    const dischargeSubmit = () => {
        alert("퇴원 접수 완료");
    }

    return (
        <div className="background">
        <div className="Amdbackground">
            <div id="Lbox" style={{ height: "360px" }}>
                <br />

                {/* 진료 예약 */}
                <div className="boxHeader" style={{ marginLeft: "35px" }}>
                    <img id="boxIcon" style={{ marginTop: "-10px", width: "40px", height: "40px" }} src="./img/register.png" />&nbsp;
                    <h3 id="LboxHeader" style={{ marginRight: "1150px" }}>진료 예약</h3>
                    <button style={{ marginTop: "1px" }} onClick={registSubmit}>접수</button>
                </div><br />
                <h4 style={{ color: "#5e5e5e", font: "bold", fontSize: "20px", textAlign: "left" }}>환자 정보 입력</h4>

                <div>
                    <div style={{ marginLeft: "180px", textAlign: "left" }}>
                        <span>환자번호</span>
                        <input type="text" name='patNum'
                            style={{
                                marginLeft: "10px", width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                textAlign: "center", border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} onChange={(e) => setPatNum(e.target.value)} />
                        <button style={{ marginLeft: "10px" }} onClick={patientSearch}>조회</button>
                        <span style={{ marginLeft: "13px" }}>이름</span>
                        {patientData.patName ? (
                            <input name='patName' type="text"
                                value={patientData.patName}
                                // readOnly 
                                style={{
                                    marginLeft: "10px", width: "100px",
                                    height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                    boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }} />
                        ) : (
                            <input type="text" name='patName'
                                // value={patientData.patName} 
                                // onChange={(e)=> setPatientData({ …patientData, patName:e.target.value })}
                                onChange={(e) => e.target.value}
                                style={{
                                    marginLeft: "10px", width: "100px", height: "30px", backgroundColor: "#FFFEFB",
                                    textAlign: "center", border: "none", boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }}
                            />
                        )}

                        <span style={{ marginLeft: "13px" }}>주민등록번호</span>
                        {patientData.patJumin ? (
                            <input name='patJumin' type="text" value={patientData.patJumin}
                                // readOnly
                                style={{
                                    marginLeft: "10px", width: "180px",
                                    height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                    boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }} />
                        ) : (
                            <input type="text"
                                // value={patientData.patJumin} 
                                // onChange={(e)=> setPatientData({ …patientData, patName:e.target.value})}
                                onChange={(e) => e.target.value}
                                style={{
                                    marginLeft: "10px", width: "180px", height: "30px", backgroundColor: "#FFFEFB",
                                    textAlign: "center", border: "none", boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }}
                            />
                        )}

                        <span style={{ marginLeft: "13px" }}>성별</span>
                        {patientData.patGender ? (
                            <input name='patGender' type="text" value={patientData.patGender}
                                // readOnly 
                                style={{
                                    marginLeft: "10px", width: "70px",
                                    height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                    boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }} />
                        ) : (
                            <input type="text"
                                // value={patientData.patGender} 
                                // onChange={(e)=> setPatientData({ …patientData, patName:e.target.value })}
                                onChange={(e) => e.target.value}
                                style={{
                                    marginLeft: "10px", width: "70px", height: "30px", backgroundColor: "#FFFEFB",
                                    textAlign: "center", border: "none", boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }}
                            />
                        )}

                        <span style={{ marginLeft: "13px" }}>혈액형</span>
                        {patientData.patBloodType ? (
                            <input name='patBloodType' type="text" value={patientData.patBloodType}
                                // readOnly 
                                style={{
                                    marginLeft: "10px", width: "70px",
                                    height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                    boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }} />
                        ) : (
                            <input type="text"
                                // value={patientData.patBloodType} 
                                // onChange={(e)=> setPatientData({ …patientData, patName:e.target.value })}
                                onChange={(e) => e.target.value}
                                style={{
                                    marginLeft: "10px", width: "70px", height: "30px", backgroundColor: "#FFFEFB",
                                    textAlign: "center", border: "none", boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }}
                            />
                        )}

                        <span style={{ marginLeft: "13px" }}>연락처</span>
                        {patientData.patTel ? (
                            <input name='patTel' type="text" value={patientData.patTel}
                                // readOnly 
                                style={{
                                    marginLeft: "10px", width: "150px",
                                    height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                    boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }} />
                        ) : (
                            <input type="text"
                                // value={patientData.patTel} 
                                // onChange={(e)=> setPatientData({ …patientData, patName:e.target.value })}
                                onChange={(e) => e.target.value}
                                style={{
                                    marginLeft: "10px", width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                    textAlign: "center", border: "none", boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }}
                            />
                        )}

                    </div><br />
                    <div style={{ marginLeft: "180px", textAlign: "left" }}>
                        <span>주소</span>
                        {patientData.patAddress ? (
                            <input name='patAddress' type="text"
                                value={patientData.patAddress}
                                // readOnly 
                                style={{
                                    marginLeft: "10px", width: "520px",
                                    height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                    boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }} />
                        ) : (
                            <input type="text"
                                // value={patientData.patAddress} 
                                // onChange={(e)=> setPatientData({ …patientData, patName:e.target.value })}
                                onChange={(e) => e.target.value}
                                style={{
                                    marginLeft: "10px", width: "520px", height: "30px", backgroundColor: "#FFFEFB",
                                    textAlign: "center", border: "none", boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }}
                            />
                        )}

                        <span style={{ marginLeft: "13px" }}>과거병력</span>
                        {patientData.patHistory ? (
                            <input name='patHistory' type="text" value={patientData.patHistory}
                                // readOnly 
                                style={{
                                    marginLeft: "10px", width: "520px",
                                    height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                    boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }} />
                        ) : (
                            <input type="text"
                                // value={patientData.patHistory} 
                                // onChange={(e)=> setPatientData({ …patientData, patName:e.target.value})}
                                onChange={(e) => e.target.value}
                                style={{
                                    marginLeft: "10px", width: "520px", height: "30px", backgroundColor: "#FFFEFB",
                                    textAlign: "center", border: "none", boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }}
                            />
                        )}
                    </div><br />
                    <div style={{ marginLeft: "180px", textAlign: "left" }}>
                        <span>진료과</span>
                        {/* 진료과 선택 selectbox */}
                        <select id="admStatus" name="departmentName"
                            value={selectedDepartment.departmentNum}
                            onChange={(e) => {
                                const departmentNum = parseInt(e.target.value);
                                const department = departmentList.find(dept => dept.departmentNum === departmentNum);
                                // console.log(department);
                                if (department) {
                                    setSelectedDepartment(department);
                                } else {
                                    setSelectedDepartment({ departmentNum: '', jobNum: '', departmentName: '' });
                                }
                            }}
                        >
                            {/* <select id="admStatus"> */}
                            <option value=""> 진료과 선택 </option>
                            {departmentList.map((department) => (
                                <option key={department.departmentNum} value={department.departmentNum}>
                                    {department.departmentName}
                                </option>
                            ))}
                        </select>
                        <span style={{ marginLeft: "10px" }}>주치의</span>
                        {/* 주치의 선택 selectbox */}
                        <select id="admStatus" name="docName"
                            value={selectedDoctor.departmentNum}
                            onChange={(e) => {
                                const departmentNum = parseInt(e.target.value);
                                const doctor = doctorList.find(doc => doc.departmentNum === departmentNum);
                                // console.log(department);
                                if (doctor) {
                                    setSelectedDoctor(doctor);
                                } else {
                                    setSelectedDoctor({ docNum: '', jobNum: '', docName: '' });
                                }
                            }}
                        >
                            {/* <select id="admStatus"> */}
                            <option value=""> 주치의 선택 </option>
                            {doctorList.map((doctor) => (
                                <option key={doctor.docNum} value={doctor.docNum}>
                                    {doctor.docName}
                                </option>
                            ))}
                        </select>
                        <span style={{ marginLeft: "10px" }}>예약일자</span>
                        <input type="text" name=""
                            style={{
                                marginLeft: "10px", width: "280px", height: "30px", backgroundColor: "#FFFEFB",
                                textAlign: "center", border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span style={{ marginLeft: "10px" }}>예약시간</span>
                        {/* 진료 시간 */}
                        <select
                            id="admStatus"
                            value={selectedDoctroScheduleTime}
                            onChange={(e) => setSelectedDoctroScheduleTime(e.target.value)}
                        >
                            <option value="">예약시간 선택</option>
                            {timeSlots.map((time, index) => (
                                <option key={index} value={time}>{time}</option>
                            ))}
                        </select>
                    </div><br />
                    <div style={{ marginLeft: "180px", textAlign: "left" }}>
                        <span>증상</span>
                        <input type="text" name=""
                            style={{
                                marginLeft: "10px", width: "520px", height: "30px", backgroundColor: "#FFFEFB",
                                textAlign: "center", border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span style={{ marginLeft: "10px" }}>특이사항</span>
                        <input type="text" name=""
                            style={{
                                marginLeft: "10px", width: "520px", height: "30px", backgroundColor: "#FFFEFB",
                                textAlign: "center", border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                    </div>
                </div>

                {/* 여기서 부터 아코디언 시작 */}
                <div style={{ marginTop: "50px", height: '30px' }}>
                    {/* 여기서 부터 아코디언 형태  */}
                    {/* // 검사 */}
                    <div className={`LaccordionBox ${accodionIndex === 1 ? 'open' : ''}`} >
                        <div className="boxHeader" style={{ marginLeft: "35px" }} onClick={() => handleToggle(1)}>
                            <img id="boxIcon" style={{ marginTop: "30px", width: "40px", height: "40px" }} src="./img/test.png" />&nbsp;
                            <h3 id="LboxHeader" style={{ marginTop: "34px", marginRight: "1230px" }}>검사</h3>
                            {accodionIndex === 1 && <button style={{ marginTop: "35px" }} onClick={testSubmit}>접수</button>} {/* 접수 버튼 추가 */}
                        </div>
                        <br /><div>
                            {accodionIndex === 1 && <AmdPatientTest />}
                        </div>
                    </div>

                    {/* 입원 */}
                    <div className={`LaccordionBox ${accodionIndex === 2 ? 'open' : ''}`}>
                        <div className="boxHeader" style={{ marginLeft: "35px" }} onClick={() => handleToggle(2)}>
                            <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/admission.png" />&nbsp;
                            <h3 id="LboxHeader" style={{ marginTop: "20px", marginRight: "1230px" }}>입원</h3>
                            {accodionIndex === 2 && <button style={{ marginTop: "22px" }} onClick={admissionSubmit}>접수</button>} {/* 접수 버튼 추가 */}
                        </div>
                        <br /><div>
                            {accodionIndex === 2 && <AdmPatientAdmmission />}
                        </div>
                    </div>

                    {/* 수술 */}
                    <div className={`LaccordionBox ${accodionIndex === 3 ? 'open' : ''}`}>
                        <div className="boxHeader" style={{ marginLeft: "35px" }} onClick={() => handleToggle(3)}>
                            <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/surgery.png" />&nbsp;
                            <h3 id="LboxHeader" style={{ marginTop: "20px", marginRight: "1230px" }}>수술</h3>
                            {accodionIndex === 3 && <button style={{ marginTop: "22px" }} onClick={surgerySubmit}>접수</button>} {/* 접수 버튼 추가 */}
                        </div>
                        <br /><div>
                            {accodionIndex === 3 && <AmdPatientSurgeryDue />}
                        </div>
                    </div>

                    {/* 처방전 발급 */}
                    <div className={`LaccordionBox ${accodionIndex === 4 ? 'open' : ''}`}>
                        <div className="boxHeader" style={{ marginLeft: "35px" }} onClick={() => handleToggle(4)}>
                            <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/document.png" />&nbsp;
                            <h3 id="LboxHeader" style={{ marginTop: "19px", marginRight: "1155px" }}>처방전 발급</h3>
                            {accodionIndex === 4 && <button style={{ marginTop: "20px" }} onClick={prescriptionSubmit}>접수</button>} {/* 접수 버튼 추가 */}
                        </div>
                        <br /><div>
                            {accodionIndex === 4 && <AmdPatientPrescription />}
                        </div>
                    </div>

                    {/* 기타 문서 발급 */}
                    <div className={`LaccordionBox ${accodionIndex === 5 ? 'open' : ''}`}>
                        <div className="boxHeader" style={{ marginLeft: "35px" }} onClick={() => handleToggle(5)}>
                            <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/document.png" />&nbsp;
                            <h3 id="LboxHeader" style={{ marginTop: "19px", marginRight: "1125px" }}>기타 문서 발급</h3>
                            {accodionIndex === 5 && <button style={{ marginTop: "21px" }} onClick={storageSubmit}>접수</button>} {/* 접수 버튼 추가 */}
                        </div>
                        <br /><div>
                            {accodionIndex === 5 && <AmdPatientStorage />}
                        </div>
                    </div>

                    {/* 퇴원 */}
                    <div className={`LaccordionBox ${accodionIndex === 6 ? 'open' : ''}`}>
                        <div className="boxHeader" style={{ marginLeft: "35px" }} onClick={() => handleToggle(6)}>
                            <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/register.png" />&nbsp;
                            <h3 id="LboxHeader" style={{ marginTop: "20px", marginRight: "1230px" }}>퇴원</h3>
                            {accodionIndex === 6 && <button style={{ marginTop: "21px" }} onClick={dischargeSubmit}>접수</button>} {/* 접수 버튼 추가 */}
                        </div>
                        <br /><div>
                            {accodionIndex === 6 && <AmdPatientDischarge />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Adm;