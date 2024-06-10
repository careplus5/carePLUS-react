import '../css/Adm.css';
import '../css/App.css';
import AmdPatientStorage from './Adm PatientStorage';  // 기타문서
import AmdPatientSurgeryDue from './Adm PatientSurgeryDue';  // 수술 
import AdmPatientAdmmission from './AdmPatientAdmmission';
import AmdPatientAdmmission from './AdmPatientAdmmission';  // 입원
import AmdPatientDischarge from './AdmPatientDischarge';
import AmdPatientPrescription from './AdmPatientPrescription';  // 처방전 발급
import AmdPatientTest from './AdmPatientTest';  // 검사
import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const Adm = () => {

    const [accodionIndex, setAccodionIndex] = useState(null);
    const [patient, setPatient] = useState('');

    const handleToggle = (index) => {
        setAccodionIndex(accodionIndex === index ? null : index);
    };

    // 진료예약
    const registSubmit = () => {
        alert("등록 & 접수 완료");
    }

    //환자 조회 (주민등록번호로)
    const patientSearch = () => {
        alert("조회완료");
        axios.post()
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
        <div className="Amdbackground">
            <div id="Lbox" style={{ height: "315px" }}>
                <br />

                {/* 진료 예약 */}
                <div className="boxHeader" style={{ marginLeft: "35px"}}>
                    <img id="boxIcon" style={{ marginTop: "-10px", width: "40px", height: "40px" }} src="./img/register.png" />&nbsp;
                    <h3 id="LboxHeader" style={{marginRight:"1150px"}}>진료 예약</h3>
                    <button style={{marginTop:"1px"}} onClick={registSubmit}>접수</button>
                </div><br/>
                <h4 style={{ color: "#5e5e5e", font: "bold", fontSize: "20px", textAlign:"left"}}>환자 정보 입력</h4>
                
                <div>
                    <div style={{marginLeft:"180px", textAlign:"left"}}>
                        <span>환자번호</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <button style={{marginLeft:"10px"}} onClick={patientSearch}>조회</button>
                        <span style={{marginLeft:"13px"}}>이름</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "100px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span style={{marginLeft:"13px"}}>주민등록번호</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "180px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span style={{marginLeft:"13px"}}>성별</span><input type="text"
                            style={{
                                marginLeft:"10px", width: "70px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span style={{marginLeft:"13px"}}>혈액형</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "70px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span style={{marginLeft:"13px"}}>연락처</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                    </div><br />
                    <div style={{marginLeft:"180px", textAlign:"left"}}>
                        <span>주소</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "520px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span style={{marginLeft:"60px"}}>과거병력</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                marginLeft:"10px", width: "520px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                    </div><br />
                    <div style={{marginLeft:"180px", textAlign:"left"}}>
                        <span>진료과</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "250px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                        <span style={{marginLeft:"10px"}}>주치의</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "140px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                            <button style={{marginLeft:"10px"}}>조회</button>
                        <span style={{marginLeft:"10px"}}>진료실</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                        <span style={{marginLeft:"10px"}}>예약일자</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "280px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                    </div><br/>
                </div>

                {/* 여기서 부터 아코디언 시작 */}
                <div style={{marginTop:"50px", height:'30px'}}>
                        {/* 여기서 부터 아코디언 형태  */}
                        {/* // 검사 */}
                        <div className={`LaccordionBox ${accodionIndex === 1 ? 'open' : ''}`} >
                            <div className="boxHeader" style={{ marginLeft: "35px"}} onClick={() => handleToggle(1)}>
                                <img id="boxIcon" style={{ marginTop: "30px", width: "40px", height: "40px" }} src="./img/test.png" />&nbsp;
                                <h3 id="LboxHeader" style={{marginTop: "34px", marginRight:"1230px"}}>검사</h3>
                                {accodionIndex === 1 && <button style={{marginTop:"35px"}} onClick={testSubmit}>접수</button>} {/* 접수 버튼 추가 */}
                            </div>
                            <br/><div>
                                {accodionIndex === 1 && <AmdPatientTest />}
                            </div>
                        </div>

                        {/* 입원 */}
                        <div className={`LaccordionBox ${accodionIndex === 2 ? 'open' : ''}`}>
                            <div className="boxHeader" style={{ marginLeft: "35px"}} onClick={() => handleToggle(2)}>
                                <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/admission.png" />&nbsp;
                                <h3 id="LboxHeader" style={{ marginTop: "20px", marginRight:"1230px"}}>입원</h3>
                                {accodionIndex === 2 && <button style={{marginTop:"22px"}} onClick={admissionSubmit}>접수</button>} {/* 접수 버튼 추가 */}
                            </div>
                            <br/><div>
                                {accodionIndex === 2 && <AdmPatientAdmmission />}
                            </div>
                        </div>

                         {/* 수술 */}
                         <div className={`LaccordionBox ${accodionIndex === 3 ? 'open' : ''}`}>
                            <div className="boxHeader" style={{ marginLeft: "35px"}} onClick={() => handleToggle(3)}>
                                <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/surgery.png" />&nbsp;
                                <h3 id="LboxHeader" style={{ marginTop: "20px", marginRight:"1230px"}}>수술</h3>
                                {accodionIndex === 3 && <button style={{marginTop:"22px"}} onClick={surgerySubmit}>접수</button>} {/* 접수 버튼 추가 */}
                            </div>
                            <br/><div>
                                {accodionIndex === 3 && <AmdPatientSurgeryDue />}
                            </div>
                        </div>

                         {/* 처방전 발급 */}
                         <div className={`LaccordionBox ${accodionIndex === 4 ? 'open' : ''}`}>
                            <div className="boxHeader" style={{ marginLeft: "35px"}} onClick={() => handleToggle(4)}>
                                <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/document.png" />&nbsp;
                                <h3 id="LboxHeader" style={{ marginTop: "19px", marginRight:"1155px"}}>처방전 발급</h3>
                                {accodionIndex === 4 && <button style={{marginTop:"20px"}} onClick={prescriptionSubmit}>접수</button>} {/* 접수 버튼 추가 */}
                            </div>
                            <br/><div>
                                {accodionIndex === 4 && <AmdPatientPrescription />}
                            </div>
                        </div>

                         {/* 기타 문서 발급 */}
                         <div className={`LaccordionBox ${accodionIndex === 5 ? 'open' : ''}`}>
                            <div className="boxHeader" style={{ marginLeft: "35px"}} onClick={() => handleToggle(5)}>
                                <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/document.png" />&nbsp;
                                <h3 id="LboxHeader" style={{ marginTop: "19px", marginRight:"1125px"}}>기타 문서 발급</h3>
                                {accodionIndex === 5 && <button style={{marginTop:"21px"}} onClick={storageSubmit}>접수</button>} {/* 접수 버튼 추가 */}
                            </div>
                            <br/><div>
                                {accodionIndex === 5 && <AmdPatientStorage />}
                            </div>
                        </div>

                         {/* 퇴원 */}
                         <div className={`LaccordionBox ${accodionIndex === 6 ? 'open' : ''}`}>
                            <div className="boxHeader" style={{ marginLeft: "35px"}} onClick={() => handleToggle(6)}>
                                <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/register.png" />&nbsp;
                                <h3 id="LboxHeader" style={{ marginTop: "20px", marginRight:"1230px"}}>퇴원</h3>
                                {accodionIndex === 6 && <button style={{marginTop:"21px"}} onClick={dischargeSubmit}>접수</button>} {/* 접수 버튼 추가 */}
                            </div>
                            <br/><div>
                                {accodionIndex === 6 && <AmdPatientDischarge />}
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Adm;