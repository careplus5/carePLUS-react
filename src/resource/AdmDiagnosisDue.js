import { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';

const AdmDocDiagnosisDue = ({ patient }) => {

    // 환자번호
    const [patNum, setPatNum] = useState('');
    // 이름, 주민등록번호, 성별, 혈액형, 연락처, 주소, 과거병력
    const [patientData, setPatientData] = useState({
        patName: '', patJumin: '', patNum: '', patHeight: '', patWeight: '',
        patGender: '', patBloodType: '', patTel: '', patAddress: '', patHistory: ''
    });
    // 모달 (부서에 대한 정보 검색)
    const [admDiagDuedisModalIsOpen, setAdmDiagDuedisModalIsOpen] = useState(false);
    // select box (진료과, 주치의, 진료실)
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedDepartmentName, setSelectedDepartmentName] = useState('');
    // 의사관련
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    // 진료예약관련
    const [diagnosisDue, setDiagnosisDue] = useState([]);

    // 부서 변경
    const handleDepartmentChange = (e) => {
        const departmentNum = e.target.value;
        setSelectedDepartment(departmentNum);
        const department = departments.find(dep => dep.departmentNum === departmentNum);
        setSelectedDepartmentName(department ? department.departmentName : '');

    };

    // 모달 오픈
    const openAdmDiagDueModal = () => {
        if (selectedDepartment === '') {
            alert('진료과를 선택하세요');
            return;
        }
    
        // diagnosis 상태 업데이트 후에 의사 목록을 가져옴
        // let date = new Date();
        // let dateStr = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
        // let dateStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        // setSelectedDate(dateStr);
        // console.log(dateStr);

        const dateStr = selectedDate.toISOString().split('T')[0];

        axios.get(`http://localhost:8090/doctorDueList?departmentNum=${selectedDepartment}&diagnosisDueDate=${dateStr}`)
            .then(res => {
                setDoctors(res.data);
                console.log(res.data); // 업데이트된 의사 목록 출력
                setAdmDiagDuedisModalIsOpen(!admDiagDuedisModalIsOpen);
            })
            .catch(err => {
                alert('의사 조회 오류');
            });
    }

    //  부서의 정보를 가지고 옴
    useEffect(() => {
        axios.get('http://localhost:8090/departments')
            .then(res => {
                setDepartments([...res.data]);
                console.log(departments);
            })
            .catch(err => {
                alert("부서 조회 오류");
            })
    }, []);

    // 시간 배열 생성 시간을 제대로 비교하기 위해서 한자리 수의 경우에는 0을 붙어야 함
    const hours = [];
    for (let hour = 9; hour <= 18; hour++) {
        if(hour<10) {
            hours.push(`0${hour}:00`);    
        } else {
            hours.push(`${hour}:00`);
        }
        if (hour !== 18) {
            if(hour<10) {
                hours.push(`0${hour}:30`);    
            } else {
                hours.push(`${hour}:30`);
            }
        }
    }

    // 모달에서 시간 셀 클릭 핸들러 
    const handleTimeCellClick = (time, docName) => {
        console.log('Selected Time:', time);
        console.log('Selected Doctor Name:', docName);
        setSelectedTime(time);
        setSelectedDoctor(docName);
        setAdmDiagDuedisModalIsOpen(false); // 모달 닫기
    };

    // 모달 날짜변경 (pre, next 버튼) 
    const updateDoctorSchedule = (date) => {
        const dateStr = date.toISOString().split('T')[0];
        axios.get(`http://localhost:8090/doctorDueList?departmentNum=${selectedDepartment}&diagnosisDueDate=${dateStr}`)
            .then(res => {
                setDoctors(res.data); // 의사 목록 설정
                console.log(res.data); // 업데이트된 의사 목록 출력
            })
            .catch(err => {
                alert('의사 조회 오류');
            });
    }

    // 이전 날짜로 이동
    const admpreDiagDueDateList = () => {
        // setSelectedDate(dateStr-1);
        let previousDate = new Date(selectedDate);
        previousDate.setDate(previousDate.getDate() - 1);
        setSelectedDate(previousDate);
        updateDoctorSchedule(previousDate);
    }

    // 다음 날짜로 이동
    const admNextDiagDueDateList = () => {
        // setSelectedDate(dateStr+1);
        let nextDate = new Date(selectedDate);
        nextDate.setDate(nextDate.getDate() + 1);
        setSelectedDate(nextDate);
        updateDoctorSchedule(nextDate);
    }

    const patientDiagnosisRegist = () => {
        alert('aaa');
    }

    return (
        <div className='AdmLbox'>
            <div className="boxHeader" style={{ marginLeft: "35px" }}>
                <img id="boxIcon" style={{ marginTop: "0px", width: "40px", height: "40px" }} src="./img/register.png" />&nbsp;
                <h3 id="LboxHeader" style={{ marginTop: "34px", marginRight: "120px" }}>진료예약</h3>
                <button style={{ marginTop: "21px" }} onClick={patientDiagnosisRegist} >진료 접수</button>
                <div className="LrecodionBox">
                    {/* 진료 예약 */}
                    <br />
                    <h4 style={{ color: "#5e5e5e", font: "bold", fontSize: "20px", textAlign: "left" }}>환자 정보 입력</h4>
                    <div>
                        <div style={{ marginLeft: "180px", textAlign: "left" }}>
                            <span>환자번호</span>
                            <input type="text" name='patNum' value={patient && patient.patNum}
                                style={{
                                    marginLeft: "10px", width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                    textAlign: "center", border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                                }} onChange={(e) => setPatNum(e.target.value)} />
                            <span style={{ marginLeft: "13px" }}>환자 이름</span>
                            <input name='patName' type="text"
                                value={patient && patient.patName}
                                style={{
                                    marginLeft: "10px", width: "100px",
                                    height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                    boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }} />
                            <span style={{ marginLeft: "13px" }}>환자 주민등록번호</span>
                            <input name='patJumin' type="text" value={patient && patient.patJumin}
                                style={{
                                    marginLeft: "10px", width: "180px",
                                    height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                    boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }} />
                            <span style={{ marginLeft: "13px" }}>환자 성별</span>
                            <input name='patGender' type="text" value={patient && patient.patGender}
                                style={{
                                    marginLeft: "10px", width: "70px",
                                    height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                    boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }} />
                        </div><br />

                        <div style={{ marginLeft: "180px", textAlign: "left" }}>
                            <span>환자 연락처</span>
                            <input name='patAddress' type="text"
                                value={patient && patient.patAddress}
                                style={{
                                    marginLeft: "10px", width: "70px",
                                    height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                    boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }} />
                            <span style={{ marginLeft: "13px" }}>환자 키</span>
                            <input name='patHistory' type="text" value={patient && patient.patHeight}
                                style={{
                                    marginLeft: "10px", width: "70px",
                                    height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                    boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }} />
                            <span>환자 몸무게</span>
                            <input name='patAddress' type="text"
                                value={patient && patient.patWeight}
                                style={{
                                    marginLeft: "10px", width: "70px",
                                    height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                    boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }} />
                            <span>환자 혈액형</span>
                            <input name='patAddress' type="text"
                                value={patient && patient.patBloodType}
                                style={{
                                    marginLeft: "10px", width: "70px",
                                    height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                    boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }} />
                        </div><br />

                        <div style={{ marginLeft: "180px", textAlign: "left" }}>
                            <span>주소</span>
                            <input name='patAddress' type="text"
                                value={patient && patient.patAddress}
                                style={{
                                    marginLeft: "10px", width: "520px",
                                    height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                    boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }} />
                            <span style={{ marginLeft: "13px" }}>과거병력</span>
                            <input name='patHistory' type="text" value={patient && patient.patHistory}
                                style={{
                                    marginLeft: "10px", width: "520px",
                                    height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                    boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }} />
                        </div><br />

                        <div style={{ marginLeft: "180px", textAlign: "left" }}>
                            <span>진료과</span>
                            {/* 진료과 선택 selectbox */}
                            <select id="admStatus" value={selectedDepartment} onChange={handleDepartmentChange}
                                name="departmentName"
                            >
                                <option value=""> 진료과 선택 </option>
                                {departments.map((department) => (
                                    <option key={department.departmentNum} value={department.departmentNum}>
                                        {department.departmentName}
                                    </option>
                                ))}
                            </select>
                            <button onClick={openAdmDiagDueModal}>의사 스케줄 조회</button>
                            <span style={{ marginLeft: "10px" }}>주치의</span>
                            <input name='patHistory' type="text" value={selectedDoctor}
                                style={{
                                    marginLeft: "10px", width: "70px",
                                    height: "30px", backgroundColor: "#e0e0e0", textAlign: "center", border: "none",
                                    boxShadow: "1px lightgray inset", borderRadius: "10px"
                                }} />
                            <span style={{ marginLeft: "10px" }}>예약일자</span>
                            <input type="text" value={selectedDate.toISOString().split('T')[0]}
                                style={{
                                    marginLeft: "10px", width: "280px", height: "30px", backgroundColor: "#FFFEFB",
                                    textAlign: "center", border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                                }} />
                            <span style={{ marginLeft: "10px" }}>예약시간</span>
                            <input type="text" value={selectedTime}
                                style={{
                                    marginLeft: "10px", width: "280px", height: "30px", backgroundColor: "#FFFEFB",
                                    textAlign: "center", border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                                }} />
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
            </div>
            {/* 병명 선택 모달 */}
            <Modal isOpen={admDiagDuedisModalIsOpen} toggle={openAdmDiagDueModal} style={{ maxWidth: "1100px" }}>
                <ModalHeader toggle={openAdmDiagDueModal} className='modalTitle'>{selectedDepartmentName} 주치의 스케줄 조회</ModalHeader>
                <ModalBody className='amdDiagDueModalBodyStyle'>
                    <button onClick={admpreDiagDueDateList}>pre</button><button onClick={admNextDiagDueDateList}>next</button>
                    <table className="admDoctorDueSceduleList" style={{ maxWidth: '1035px', tableLayout: 'fixed', maxHeight: '200%', overflow: "scroll" }}>
                        <thead >
                            <tr style={{ position: 'sticky', height: '50px', top: 0, backgroundColor: '#FFFDF8', zIndex: 1, borderBottom: '1px solid black' }}>
                                <th style={{width:'100px'}}>예약시간</th>
                                {doctors.length > 0 && doctors.map(doctor => (
                                    <th key={doctor[0].docNum}>{doctor[0].docName}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {hours.map(time => (
                                <tr key={time}>
                                    <td style={{border: '1px solid lightgray'}}>{time}</td>
                                    {doctors.map(doctorDue => {
                                        const due = doctorDue.find(due => due.diagnosisDueTime === `${time}:00`);
                                        return (
                                            <td
                                                key={doctorDue[0].docNum}
                                                style={{border: '1px solid lightgray', cursor: due ? 'not-allowed' : 'pointer', backgroundColor: due ? '#e0e0e0' : '#fff'}}
                                                onClick={!due ? () => handleTimeCellClick(time, doctorDue[0].docName) : null}
                                            >
                                                {due ? '예약' : ''}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                        {/* <tbody>
                            {hours.map(time => (
                                <tr key={time}>
                                    <td style={{border: '1px solid lightgray'}}>{time}</td>
                                    { doctors && doctors.map(doctorDue=><td style={{border: '1px solid lightgray' }} onClick={(e) => {console.log(e.target.value)}}>{doctorDue.find(due=>due.diagnosisDueTime===`${time}:00`) && '진료예약불가'}</td>)}
                                </tr>
                            ))}

                        </tbody> */}
                    </table>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default AdmDocDiagnosisDue;