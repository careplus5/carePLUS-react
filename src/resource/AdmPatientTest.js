import { useState, useEffect } from 'react';
import axios from 'axios';

// 검사 예약
const AdmPatientTest = () => {

    // 환자번호
    const [patNum, setPatNum] = useState('');
    // 이름, 주민등록번호, 성별, 혈액형, 연락처, 주소, 과거병력
    // 환자, 의사, 검사 예약
    
    const [testRequsetData, setTestRequestData] = useState({
        patName:''
    })

    //환자 조회 (환자번호로)
    const testRequestPatientSearch = (e) => {
        e.preventDefault();

        // alert("AAA");
        // alert("조회완료");
        console.log(patNum)
        // console.log(patientData.patName);
        // axios.post(`http://192.168.0.251/patNumCheck`,
        //     {patNum:patNum}
        // )

        axios.post(`http://localhost:8080/testRequestPatientLatest`,
            { patNum: patNum }
        )
            .then(res => {
                // const [patient, doctor, testRequest] = res.data;
                setTestRequestData(res.data);
                console.log(res.data);
                
            })
            .catch(err => {
                alert("검사 요청 환자 조회 에러");
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
        <div id="LaccordionBox">
            <div style={{ marginLeft: "210px", textAlign: "left" }}>
                <div>
                    <span>환자번호</span>
                    <input type="text" name='patNum'
                        style={{
                            marginLeft: "10px", width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                            textAlign: "center", border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} onChange={(e) => setPatNum(e.target.value)} />
                    <button style={{ marginLeft: "10px" }} onClick={testRequestPatientSearch}>조회</button>
                    <span style={{ marginLeft: "13px" }}>이름</span>
                    { testRequsetData && testRequsetData.patName ? (
                        <input name='patName' type="text"
                            value={testRequsetData.patName}
                            readOnly 
                            style={{
                                marginLeft: "10px", width: "100px",
                                height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                boxShadow: "1px lightgray inset", borderRadius: "10px"
                            }} />
                    ) : (
                        <input type="text" name='patName'
                            onChange={(e) => e.target.value}
                            style={{
                                marginLeft: "10px", width: "100px", height: "30px", backgroundColor: "#FFFEFB",
                                textAlign: "center", border: "none", boxShadow: "1px lightgray inset", borderRadius: "10px"
                            }}
                        />
                    )}

                    <span style={{ marginLeft: "13px" }}>주민등록번호</span>
                    { testRequsetData && testRequsetData.patJumin ? (
                        <input name='patJumin' type="text" value={testRequsetData.patJumin}
                            readOnly
                            style={{
                                marginLeft: "10px", width: "180px",
                                height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                boxShadow: "1px lightgray inset", borderRadius: "10px"
                            }} />
                    ) : (
                        <input type="text"
                            onChange={(e) => e.target.value}
                            style={{
                                marginLeft: "10px", width: "180px", height: "30px", backgroundColor: "#FFFEFB",
                                textAlign: "center", border: "none", boxShadow: "1px lightgray inset", borderRadius: "10px"
                            }}
                        />
                    )}

                    <span style={{ marginLeft: "13px" }}>성별</span>
                    { testRequsetData && testRequsetData.patGender ? (
                        <input name='patGender' type="text" value={testRequsetData.patGender}
                            readOnly 
                            style={{
                                marginLeft: "10px", width: "70px",
                                height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                boxShadow: "1px lightgray inset", borderRadius: "10px"
                            }} />
                    ) : (
                        <input type="text"
                            onChange={(e) => e.target.value}
                            style={{
                                marginLeft: "10px", width: "70px", height: "30px", backgroundColor: "#FFFEFB",
                                textAlign: "center", border: "none", boxShadow: "1px lightgray inset", borderRadius: "10px"
                            }}
                        />
                    )}

                    <span style={{ marginLeft: "13px" }}>주치의</span>
                    { testRequsetData && testRequsetData.docName ? (
                        <input name='patTel' type="text" value={testRequsetData.docName}
                            readOnly 
                            style={{
                                marginLeft: "10px", width: "150px",
                                height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                boxShadow: "1px lightgray inset", borderRadius: "10px"
                            }} />
                    ) : (
                        <input type="text"
                            onChange={(e) => e.target.value}
                            style={{
                                marginLeft: "10px", width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                textAlign: "center", border: "none", boxShadow: "1px lightgray inset", borderRadius: "10px"
                            }}
                        />
                    )}
                </div><br />

                <div>
                    <span >검사실</span>
                    <select id="admStatus">
                        <option>검사실 선택</option>
                        <option>CT</option>
                        <option>MRI</option>
                        <option>X-Ray</option>
                    </select>
                    <span style={{ marginLeft: "150px" }}>검사예정일</span>
                    <input type="text"
                        style={{
                            marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <span style={{ marginLeft: "150px" }}>검사예약시간</span>
                    {/* 진료 시간 */}
                    <select
                        id="admStatus"
                        // value={selectedDoctroScheduleTime}
                        // onChange={(e) => setSelectedDoctroScheduleTime(e.target.value)}
                        value={''}
                        onChange={(e) => e.target.value}
                    >
                        <option value="">예약시간 선택</option>
                        {timeSlots.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                </div><br />
                <div>
                    <span >검사부위</span>
                    <input type="text"
                        style={{
                            marginLeft: "10px", width: "970px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <span style={{ marginLeft: "35px" }}>원외검사기록여부</span>
                    <input type="checkbox"
                        style={{
                            marginLeft: "10px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                </div><br />
            </div>
        </div>

    )
}

export default AdmPatientTest;