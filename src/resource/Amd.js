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

    // const items = ['검사', '입원', '수술', '처방전 발급', '기타 문서 발급', '퇴원'];
    const [accodionIndex, setAccodionIndex] = useState(null);

    const handleToggle = (index) => {
        setAccodionIndex(accodionIndex === index ? null : index);
    };
    
    return (
        <div className="Amdbackground">
            <div id="Lbox" style={{ height: "315px" }}>
                <br />

                {/* 진료 예약 */}
                <div className="boxHeader" style={{ marginLeft: "35px" }}>
                    <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/register.png" />&nbsp;
                    <h3 id="LboxHeader">진료 예약</h3>
                </div>
                <h4 style={{ color: "#5e5e5e", font: "bold", fontSize: "20px", marginLeft: "130px" }}>환자 정보 입력</h4>
                <div style={{ marginLeft: "150Px" }}>
                    <div>
                        <span className='admAccTitle'>주민등록번호</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} /><button>조회</button>
                        <span className='admAccTitle'>환자번호</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}></input>
                        <span className='admAccTitle'>이름</span><input type="text" style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}></input>
                        <span className='admAccTitle'>성별</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}></input>
                        <span className='admAccTitle'>혈액형</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}></input>
                        <span className='admAccTitle'>연락처</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}></input>
                    </div><br />
                    <div>
                        <span className='admAccTitle'>주소</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}></input>
                        <span className='admAccTitle'>과거병력</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}></input>
                    </div><br />
                    <div>
                        <span className='admAccTitle'>진료과</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                        <span className='admAccTitle'>주치의</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/><button>조회</button>
                        <span className='admAccTitle'>진료실</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                        <span className='admAccTitle'>예약일자</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
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
                                <h3 id="AmdLboxHeader">검사</h3>
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