import { useState } from 'react';

const AdmDocDiagnosis = () => {

    // 환자번호
    const [patNum, setPatNum] = useState('');
    // 이름, 주민등록번호, 성별, 혈액형, 연락처, 주소, 과거병력
    const [patientData, setPatientData] = useState({
        patName: '', patJumin: '',
        patGender: '', patBloodType: '', patTel: '', patAddress: '', patHistory: ''
    });
     // select box (진료과, 주치의, 진료실)
     const [departmentList, setDepartmentList] = useState([]);
     // const [selectedDepartment, setSelectedDepartment] = useState([]);
     const [selectedDepartment, setSelectedDepartment] = useState({ departmentNum: '', jobNum: '', departmentName: '' });
     const [doctorList, setDoctorList] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState({ docNum: '', jobNum: '', docName: '' });

    return (
        <div className="LrecodionBox">
            {/* 진료 예약 */}
            <br />
            <h4 style={{ color: "#5e5e5e", font: "bold", fontSize: "20px", textAlign: "left" }}>환자 정보 입력</h4>

            <div>
                <div style={{ marginLeft: "180px", textAlign: "left" }}>
                    <span>환자번호</span>
                    <input type="text" name='patNum'
                        style={{
                            marginLeft: "10px", width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                            textAlign: "center", border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} onChange={(e) => setPatNum(e.target.value)} />
                    <button style={{ marginLeft: "10px" }} >조회</button>
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
                        // value={selectedDoctroScheduleTime}
                        // onChange={(e) => setSelectedDoctroScheduleTime(e.target.value)}
                    >
                        <option value="">예약시간 선택</option>
                        {/* {timeSlots.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))} */}
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
        </div>
    );
}

export default AdmDocDiagnosis;