import { useState, useEffect } from 'react';

// 입원 예약
const AdmPatientAdmmission = () => {

    const [patientAdmission, setPatientAdmission] = useState({
        patName:'', patJumin:'', patGender:'', docNum:'', docName:'',
        patAddress:'', departmentNum:'', departmentName:''
    })
    return (
        <div id="LaccordionBox">
                <div style={{marginLeft:"210px", textAlign:"left"}}>
                    <div>
                        <span>환자번호</span>
                        <input type="text"  
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />&nbsp;
                            <button style={{marginLeft:"10px"}}>조회</button>
                        <span style={{marginLeft:"28px"}}>주민등록번호</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span style={{marginLeft:"28px"}}>이름</span>
                        <input type="text" style={{
                                marginLeft:"10px", width: "100px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span style={{marginLeft:"28px"}}>성별</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "70px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span style={{marginLeft:"28px"}}>연락처</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    </div><br />

                    <div>
                        <span>주소</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "550px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span style={{marginLeft:"60px"}}>진료과</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                        <span style={{marginLeft:"60px"}}>주치의</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                    </div><br />

                    <div>
                        <span>병실조회</span>
                        <button style={{marginLeft:"10px"}}>조회</button>
                        <span style={{marginLeft:"26px"}}>병동번호</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "70px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                        <span style={{marginLeft:"26px"}}>병실번호</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "70px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                        <span  style={{marginLeft:"26px"}}>병상번호</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "70px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                            <span style={{marginLeft:"26px"}}>입원일</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                            <span style={{marginLeft:"26px"}}>퇴원예정일</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                    </div><br />

                    <div>
                        <span  >입원사유</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "1145px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                    </div><br/>
                    
                </div>
            </div>
    )
}

export default AdmPatientAdmmission;