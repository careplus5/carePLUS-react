import '../css/Amd.css';
import '../css/App.css';
import AmdPatientStorage from './Amd PatientStorage';  // 기타문서
import AmdPatientSurgeryDue from './Amd PatientSurgeryDue';  // 수술 
import AmdPatientAdmmission from './AmdPatientAdmmission';  // 입원
import AmdPatientDischarge from './AmdPatientDischarge';
import AmdPatientPrescription from './AmdPatientPrescription';  // 처방전 발급
import AmdPatientTest from './AmdPatientTest';  // 검사
import React from 'react'
import { useState } from 'react';

const Amd = () => {

    const [accodionIndex, setAccodionIndex] = useState(null);
    const [patient, setPatient] = useState();

    const handleToggle = (index) => {
        setAccodionIndex(accodionIndex === index ? null : index);
    };

    // 진료예약
    const registSubmit = () => {
        alert("등록 & 접수 완료");
    }

    //환자 조회 (주민등록번호로)
    const pSearch = () => {
        alert("조회완료");
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
                    <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/register.png" />&nbsp;
                    <h3 id="LboxHeader">진료 예약</h3>
                    <button style={{marginTop:"25px", marginLeft:"1230px"}} onClick={registSubmit}>접수</button>
                </div>
                <h4 style={{ color: "#5e5e5e", font: "bold", fontSize: "20px", textAlign:"left"}}>환자 정보 입력</h4>
                
                <div>
                    <div style={{marginLeft:"180px", textAlign:"left"}}>
                        <span >주민등록번호</span>&nbsp;&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "180px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />&nbsp;&nbsp;<button onClick={pSearch}>조회</button>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>환자번호</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />&nbsp;&nbsp;
                        <span>이름</span>&nbsp;&nbsp;<input type="text" style={{
                                width: "100px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />&nbsp;&nbsp;
                        <span>성별</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "50px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />&nbsp;&nbsp;
                        <span>혈액형</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "50px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />&nbsp;&nbsp;
                        <span>연락처</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                    </div><br />
                    <div style={{marginLeft:"180px", textAlign:"left"}}>
                        <span>주소</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "530px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span style={{marginLeft:"55px"}}>과거병력</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "530px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                    </div><br />
                    <div style={{marginLeft:"180px", textAlign:"left"}}>
                        <span>진료과</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "250px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>&nbsp;&nbsp;
                        <span>주치의</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "100px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>&nbsp;&nbsp;<button>조회</button>&nbsp;&nbsp;
                        <span>진료실</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>&nbsp;&nbsp;
                        <span>예약일자</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "300px", height: "30px", backgroundColor: "#FFFEFB",
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
                                <h3 id="LboxHeader">검사</h3>
                                {accodionIndex === 1 && <button style={{marginLeft:"1310px", marginTop:"25px"}} onClick={testSubmit}>접수</button>} {/* 접수 버튼 추가 */}
                            </div>
                            <br/><div>
                                {accodionIndex === 1 && <AmdPatientTest />}
                            </div>
                        </div>

                        {/* 입원 */}
                        <div className={`LaccordionBox ${accodionIndex === 2 ? 'open' : ''}`}>
                            <div className="boxHeader" style={{ marginLeft: "35px"}} onClick={() => handleToggle(2)}>
                                <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/admission.png" />&nbsp;
                                <h3 id="LboxHeader">입원</h3>
                                {accodionIndex === 2 && <button style={{marginLeft:"1300px", marginTop:"25px"}} onClick={admissionSubmit}>접수</button>} {/* 접수 버튼 추가 */}
                            </div>
                            <br/><div>
                                {accodionIndex === 2 && <AmdPatientAdmmission />}
                            </div>
                        </div>

                         {/* 수술 */}
                         <div className={`LaccordionBox ${accodionIndex === 3 ? 'open' : ''}`}>
                            <div className="boxHeader" style={{ marginLeft: "35px"}} onClick={() => handleToggle(3)}>
                                <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/surgery.png" />&nbsp;
                                <h3 id="LboxHeader">수술</h3>
                                {accodionIndex === 3 && <button style={{marginLeft:"1300px", marginTop:"25px"}} onClick={surgerySubmit}>접수</button>} {/* 접수 버튼 추가 */}
                            </div>
                            <br/><div>
                                {accodionIndex === 3 && <AmdPatientSurgeryDue />}
                            </div>
                        </div>

                         {/* 처방전 발급 */}
                         <div className={`LaccordionBox ${accodionIndex === 4 ? 'open' : ''}`}>
                            <div className="boxHeader" style={{ marginLeft: "35px"}} onClick={() => handleToggle(4)}>
                                <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/document.png" />&nbsp;
                                <h3 id="LboxHeader">처방전 발급</h3>
                                {accodionIndex === 4 && <button style={{marginLeft:"1230px", marginTop:"25px"}} onClick={prescriptionSubmit}>접수</button>} {/* 접수 버튼 추가 */}
                            </div>
                            <br/><div>
                                {accodionIndex === 4 && <AmdPatientPrescription />}
                            </div>
                        </div>

                         {/* 기타 문서 발급 */}
                         <div className={`LaccordionBox ${accodionIndex === 5 ? 'open' : ''}`}>
                            <div className="boxHeader" style={{ marginLeft: "35px"}} onClick={() => handleToggle(5)}>
                                <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/document.png" />&nbsp;
                                <h3 id="LboxHeader">기타 문서 발급</h3>
                                {accodionIndex === 5 && <button style={{marginLeft:"1200px", marginTop:"25px"}} onClick={storageSubmit}>접수</button>} {/* 접수 버튼 추가 */}
                            </div>
                            <br/><div>
                                {accodionIndex === 5 && <AmdPatientStorage />}
                            </div>
                        </div>

                         {/* 퇴원 */}
                         <div className={`LaccordionBox ${accodionIndex === 6 ? 'open' : ''}`}>
                            <div className="boxHeader" style={{ marginLeft: "35px"}} onClick={() => handleToggle(6)}>
                                <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/register.png" />&nbsp;
                                <h3 id="LboxHeader">퇴원</h3>
                                {accodionIndex === 6 && <button style={{marginLeft:"1300px", marginTop:"25px"}} onClick={dischargeSubmit}>접수</button>} {/* 접수 버튼 추가 */}
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

export default Amd;