import { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import axios from 'axios';
import { url } from '../config';


const AdmDocDiagnosisDue = ({ patient }) => {

    // 모달 (부서에 대한 정보 검색)
    const [admDiagDuedisModalIsOpen, setAdmDiagDuedisModalIsOpen] = useState(false);
    // select box (진료과, 주치의, 진료실)
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedDepartmentName, setSelectedDepartmentName] = useState('');
    // 의사관련
    const [doctors, setDoctors] = useState([]);
    const [diagnosisDueDtoList, setDiagnosisDueDtoList] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState({ docNum: '', jobNum: '', docName: '' });
    const [selectedDate, setSelectedDate] = useState();
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDocNum, setSelectedDocNum] = useState('');

    // 진료예약관련
    const [diagnosisDue, setDiagnosisDue] = useState({
        diagnosisDueDate: '', diagnosisDueTime: '', diagnosisDueState: '', diagnosisDueEtc: '',
        patNum: 0, patName: '', patJumin: '', patGender: '', patTel: '', patHeight: '', patWeight: '', patBloodType: '', patAddress: '', patHistory: '',
        docNum: 0, docName: ''
    });

    const [tableWidth, setTableWidth] = useState(0);

    //  부서의 정보를 가지고 옴
    useEffect(() => {
        setSelectedDate(new Date());
        axios.get(`${url}/departments`)
            .then(res => {
                setDepartments([...res.data]);
                console.log(res.data);
            })
            .catch(err => {
                alert("부서 조회 오류");
            })
    }, []);

    // 부서 변경
    const handleDepartmentChange = (e) => {
        const departmentNum = e.target.value;
        setSelectedDepartment(departmentNum);
        const department = departments.find(dep => dep.departmentNum == departmentNum);
        setSelectedDepartmentName(department ? department.departmentName : '');
        setSelectedDate(new Date());
    };

    // 모달 오픈
    const openAdmDiagDueModal = () => {
        if (selectedDepartment === '') {
            alert('진료과를 선택하세요');
            return;
        }
        requestDueInfo();
    }

    // 모달날짜변경
    const modalChangeDate = (day) => {
        const newDate = selectedDate;
        newDate.setDate(newDate.getDate() + day);
        console.log(newDate);
        setSelectedDate(newDate);
        requestDueInfo();
    }

    const requestDueInfo = () => {
        const dateStr = selectedDate.toISOString().split('T')[0];
        console.log('일자' + dateStr);
        axios.get(`${url}/doctorDueList?departmentNum=${selectedDepartment}&diagnosisDueDate=${dateStr}`)
            .then(res => {
                setDoctors(res.data.doctors);
                setTableWidth((res.data.doctors.length + 1) * 100);
                console.log(res.data.doctorDiagnosisDueList)
                setDiagnosisDueDtoList(res.data.diagnosisDueDtoList);
                setAdmDiagDuedisModalIsOpen(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    // 시간 배열 생성 시간을 제대로 비교하기 위해서 한자리 수의 경우에는 0을 붙어야 함
    const hours = [];
    for (let hour = 9; hour <= 18; hour++) {
        if (hour < 10) {
            hours.push(`0${hour}:00`);
        } else {
            hours.push(`${hour}:00`);
        }
        if (hour !== 18) {
            if (hour < 10) {
                hours.push(`0${hour}:30`);
            } else {
                hours.push(`${hour}:30`);
            }
        }
    }

    // 모달에서 시간 셀 클릭 핸들러 
    const handleTimeCellClick = (time, doctor) => {
        // 선택된 의사의 정보 가져오기
        console.log(time)
        console.log(selectedDate.toISOString().split('T')[0])
        setDiagnosisDue({
            ...diagnosisDue,
            diagnosisDueDate: selectedDate.toISOString().split('T')[0],
            diagnosisDueTime: time,
            docNum: doctor.docNum,
            docName: doctor.docName
        })
        setAdmDiagDuedisModalIsOpen(false); // 모달 닫기
    };

    const changeValue = (e) => {
        setDiagnosisDue({ ...diagnosisDue, [e.target.name]: e.target.value });
    }

    // 진료 등록 버튼
    const patientDiagnosisRegist = () => {
        const sendDiagnosisDue = {
            ...diagnosisDue,
            diagnosisDueTime: diagnosisDue.diagnosisDueTime + ':00',
            patNum: patient != null ? patient.patNum : null
        }
        console.log(sendDiagnosisDue)
        axios.post(`${url}/patientDiagnosisDueRegist`, sendDiagnosisDue)
            .then(res => {
                alert("진료예약 완료");
            })
            .catch(err => {
                console.error("진료예약 실패", err);
                alert("진료예약 실패");
            });
    };

    return (
        <div className='AdmLbox'>
            <div className="boxHeader" style={{ marginLeft: "30px" }}>
                <img id="boxIcon" alt='' style={{width: "40px", height: "40px" }} src="./img/register.png" />&nbsp;
                <h3 id="LboxHeader" style={{ marginTop: "20px", marginRight: "120px" }}>진료예약</h3>
                <button style={{backgroundColor:'#0081b4', height:'30px', marginLeft:"850px"}} onClick={patientDiagnosisRegist}>진료 접수</button>
                <div className="LrecodionBox">
                    {/* 진료 예약 */}
                    <br />
                    <h4 style={{ marginLeft:"120px", color: "#5e5e5e", font: "bold", fontSize: "20px", textAlign: "left" }}>환자 정보 입력</h4><br/>
                    <div>
                        <div style={{ marginLeft: "180px", textAlign: "left" }}>
                            <span>환자번호</span>
                            <input type="text" name='patNum' id='patNum' value={patient && patient.patNum}
                                className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}} />
                            <span style={{ marginLeft: "13px" }}>환자 이름</span>
                            <input name='patName' id='patName' type="text"
                                value={patient && patient.patName}
                                className='admInputType' style={{marginLeft: "10px", width: "150px", height: "30px"}}
                                onChange={changeValue} />
                            <span style={{ marginLeft: "13px" }}>환자 주민등록번호</span>
                            <input name='patJumin' id='patJumin' type="text" value={patient && patient.patJumin}
                                className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}}
                                onChange={changeValue} />
                            <span style={{ marginLeft: "13px" }}>환자 성별</span>
                            <input name='patGender' id='patGender' type="text" value={patient && patient.patGender}
                                className='admInputType' style={{marginLeft: "10px", width: "50px", height: "30px"}}
                                onChange={changeValue} />
                        </div><br />

                        <div style={{ marginLeft: "180px", textAlign: "left" }}>
                            <span>환자 연락처</span>
                            <input name='patTel' id='patTel' type="text"
                                value={patient && patient.patTel}
                                className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}}
                                onChange={changeValue} />
                            <span style={{ marginLeft: "70px" }}>환자 키</span>
                            <input name='patHeight' id='patHeight' type="text" value={patient && patient.patHeight}
                                className='admInputType' style={{marginLeft: "10px", width: "100px", height: "30px"}}
                                onChange={changeValue} />
                            <span style={{ marginLeft: "70px" }}>환자 몸무게</span>
                            <input name='patWeight' id='patWeight' type="text"
                                value={patient && patient.patWeight}
                                className='admInputType' style={{marginLeft: "10px", width: "100px", height: "30px"}}
                                onChange={changeValue} />
                            <span style={{ marginLeft: "70px" }}>환자 혈액형</span>
                            <input name='patBloodType' id='patBloodType' type="text"
                                value={patient && patient.patBloodType}
                                className='admInputType' style={{marginLeft: "10px", width: "50px", height: "30px"}}
                                onChange={changeValue} />
                        </div><br />

                        <div style={{ marginLeft: "180px", textAlign: "left" }}>
                            <span>주소</span>
                            <input name='patAddress' id='patAddress' type="text"
                                value={patient && patient.patAddress}
                                className='admInputType' style={{marginLeft: "10px", width: "415px", height: "30px"}}
                                onChange={changeValue} />
                            <span style={{ marginLeft: "30px" }}>과거병력</span>
                            <input name='patHistory' type="text" value={patient && patient.patHistory}
                                className='admInputType' style={{marginLeft: "10px", width: "415px", height: "30px"}}
                                onChange={changeValue} />
                        </div><br />

                        <div style={{ marginLeft: "180px", textAlign: "left" }}>
                            <span>진료과</span>
                            {/* 진료과 선택 selectbox */}
                            <select id="admStatus" 
                                value={selectedDepartment} onChange={handleDepartmentChange}
                                name="departmentName"
                            >
                                <option value=""> 진료과 선택 </option>
                                {departments.map((department) => (
                                    <option key={department.departmentNum} value={department.departmentNum}>
                                        {department.departmentName}
                                    </option>
                                ))}
                            </select>
                            <button style={{marginLeft:'20px', height:'30px', backgroundColor:'427889'}} onClick={openAdmDiagDueModal}>조회</button>
                            <span style={{ marginLeft: "43px" }}>주치의</span>
                            <input name='' type="text" value={diagnosisDue.docName}
                                className='admInputType' style={{marginLeft: "10px", width: "150px", height: "30px"}} />
                            <span style={{ marginLeft: "43px" }}>예약일자</span>
                            <input type="text" value={diagnosisDue.diagnosisDueDate}
                                className='admInputType' style={{marginLeft: "10px", width: "150px", height: "30px"}} />
                            <span style={{ marginLeft: "43px" }}>예약시간</span>
                            <input type="text" value={diagnosisDue.diagnosisDueTime}
                                className='admInputType' style={{marginLeft: "10px", width: "100px", height: "30px"}} />
                        </div><br />

                        <div style={{ marginLeft: "180px", textAlign: "left" }}>
                            <span>증상</span>
                            <input type="text" name="diagnosisDueState"
                                className='admInputType' style={{marginLeft: "10px", width: "415px", height: "30px"}} onChange={changeValue} />
                            <span style={{ marginLeft: "30px" }}>특이사항</span>
                            <input type="text" name="diagnosisDueEtc"
                                className='admInputType' style={{marginLeft: "10px", width: "415px", height: "30px"}} onChange={changeValue} />
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={admDiagDuedisModalIsOpen} style={{ maxWidth: `${tableWidth + 180}px` }}>
                <ModalHeader toggle={() => setAdmDiagDuedisModalIsOpen(false)} className='modalTitle' >{selectedDepartmentName}&nbsp;:&nbsp;{selectedDate && selectedDate.toISOString().split('T')[0]}</ModalHeader>
                <ModalBody className='amdDiagDueModalBodyStyle'>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <button onClick={() => modalChangeDate(-1)}>
                                        <img src="img/prev.png" alt='' width="30px" height="30px" />
                                    </button>&nbsp;
                                </td>
                                <td>
                                    <Table bordered style={{width: `${tableWidth}px` }}>
                                        <thead >
                                            <tr >
                                                <th style={{ width: '100px' }}>예약시간</th>
                                                {doctors.length > 0 && doctors.map(doctor => (
                                                    <th key={doctor.docNum} >{doctor.docName}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {hours.map(time => (
                                                <tr key={time}>
                                                    <td>{time}</td>
                                                    {doctors.map(doctor => {
                                                        const due = diagnosisDueDtoList.find(due =>
                                                            due.diagnosisDueTime === `${time}:00` && due.docNum === doctor.docNum);
                                                        return (
                                                            due ?
                                                                <td
                                                                    key={due.diagnosisDueNum}
                                                                    style={{ border: '1px solid lightgray', cursor: due ? 'not-allowed' : 'pointer', backgroundColor: due ? '#e0e0e0' : '#fff' }}>
                                                                    {due ? '예약' : ''}
                                                                </td> :
                                                                <td onClick={(e) => handleTimeCellClick(time, doctor)}></td>
                                                        )
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </td>
                                <td>&nbsp;
                                    <button onClick={() => modalChangeDate(+1)}>
                                        <img src="img/next.png" alt='' width="30px" />
                                    </button>
                                </td>

                            </tr>
                        </tbody>
                    </table>


                </ModalBody>
            </Modal>
        </div>
    );
}

export default AdmDocDiagnosisDue;