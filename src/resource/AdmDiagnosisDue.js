import '../css/Admt.css';
import { useState, useEffect } from 'react';
import { Input, Modal, ModalHeader, ModalBody, Table, Button } from 'reactstrap';
import axios from 'axios';
import { url } from '../config';
import '../css/Adm.css';

const AdmDocDiagnosisDue = ({ patient }) => {
    const inputStyle = {
        display: "inlineBolck",
        height: "35px",
        marginLeft: "15px",
        textAlign: "center",
        border: "1px solid lightgray",
        borderRadius: "10px"
    }

    // 모달 (부서에 대한 정보 검색)
    const [admDiagDuedisModalIsOpen, setAdmDiagDuedisModalIsOpen] = useState(false);
    // select box (진료과, 주치의, 진료실)
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedDepartmentName, setSelectedDepartmentName] = useState('');
    // 의사관련
    const [doctors, setDoctors] = useState([]);
    const [diagnosisDueDtoList, setDiagnosisDueDtoList] = useState([]);
    const [selectedDate, setSelectedDate] = useState();

    // 진료예약관련
    const initDiagnosis = {
        diagnosisDueDate: '', diagnosisDueTime: '', diagnosisDueState: '', diagnosisDueEtc: '',
        patNum: 0, patName: '', patJumin: '', patGender: '', patTel: '', patHeight: '', patWeight: '', patBloodType: '', patAddress: '', patHistory: '',
        docNum: 0, docName: ''
    };
    const [diagnosisDue, setDiagnosisDue] = useState(initDiagnosis);

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
                setDiagnosisDue(initDiagnosis)
            })
            .catch(err => {
                console.error("진료예약 실패", err);
                alert("진료예약 실패");
            });
    };

    const dateChange = (e) => {
        setSelectedDate(new Date(e.target.value));
    }

    return (
        <div>
            <div style={{ paddingBottom:"34px" }}>
                <div className="LboxHeader" style={{ display: 'flex', margin:'15px 25px' }}>
                    <img id="boxIcon" style={{marginTop:'15px', marginLeft:'15px', height:'25px'}} src="./img/register.png" />
                    <h3 className="admPat-boxHeader">진료예약</h3>
                </div>
                <Table className='admDiagnosisDueInfoTable' bordered>
                    <tbody>
                        <tr>
                            <th style={{width:'150px'}}>등록번호</th>
                            <td style={{width:'100px'}}>{patient && patient.patNum}</td>
                            <th style={{width:'80px'}}>이름</th>
                            <td style={{width:'90px'}}>{patient && patient.patName}</td>
                            <th style={{width:'130px'}}>주민등록번호</th>
                            <td style={{width:'170px'}}>{patient && patient.patJumin}</td>
                            <th style={{width:'100px'}}>연락처</th>
                            <td style={{width:'170px'}}>{patient && patient.patTel}</td>
                            <th style={{width:'100px'}}>주소</th>
                            <td>{patient && patient.patAddress}</td>
                        </tr>
                        <tr>
                            <th>성별</th>
                            <td>{patient && patient.patGender}</td>
                            <th>키</th>
                            <td>{patient && patient.patHeight}</td>
                            <th>몸무게</th>
                            <td>{patient && patient.patWeight}</td>
                            <th>혈액형</th>
                            <td>{patient && patient.patBloodType}</td>
                            <th>과거병력</th>
                            <td>
                                <input name='patHistory' type="text" value={patient && patient.patHistory}
                                    style={{border:'none',display:'inline-block', width:'100%',outline:'none'}}
                                    onChange={changeValue} />                                
                            </td>
                        </tr>
                        <tr>
                            <th>증상</th>
                            <td colSpan={5}>
                                <input type="text" name="diagnosisDueState" value={diagnosisDue.diagnosisDueState}
                                    style={{border:'none',display:'inline-block', width:'100%',outline:'none'}} onChange={changeValue} />
                            </td>
                            <th>특이사항</th>
                            <td  colSpan={3}>
                                <input type="text" name="diagnosisDueEtc" value={diagnosisDue.diagnosisDueEtc}
                                    style={{border:'none',display:'inline-block', width:'100%',outline:'none'}} onChange={changeValue} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <select id="admStatus" style={{ ...inputStyle, margin:"0 5px", width: "150px" }}
                                    value={selectedDepartment} onChange={handleDepartmentChange}
                                    name="departmentName">
                                    <option value=""> 진료과 선택 </option>
                                    {departments.map((department) => (
                                        <option key={department.departmentNum} value={department.departmentNum}>
                                            {department.departmentName}
                                        </option>
                                    ))}
                                </select>
                            </th>
                            <td><Button style={{paddingBottom:'27px', height:'25px', borderRadius:'10px', backgroundColor:'#427889'}} onClick={openAdmDiagDueModal}>예약시간</Button></td>
                            <th>주치의</th>
                            <td>{diagnosisDue.docName}</td>
                            <th>예약일자</th>
                            <td>{diagnosisDue.diagnosisDueDate}</td>
                            <th>예약시간</th>
                            <td>{diagnosisDue.diagnosisDueTime}</td>
                            <th colSpan={2}><Button style={{paddingBottom:'27px', height:'25px', borderRadius:'10px', backgroundColor:'#427889'}} onClick={patientDiagnosisRegist}>진료접수</Button></th>
                        </tr>
                    </tbody>
                </Table>
            </div>

            <Modal isOpen={admDiagDuedisModalIsOpen} style={{ maxWidth: `${tableWidth + 180}px` }}>
                <ModalHeader toggle={() => setAdmDiagDuedisModalIsOpen(false)} className='modalTitle' >
                    {selectedDepartmentName}&nbsp;:&nbsp;{selectedDate && selectedDate.toISOString().split('T')[0]}
                </ModalHeader>
                <ModalBody className='amdDiagDueModalBodyStyle'>
                    <table style={{marginLeft:'22px'}}>
                        <thead>
                            <tr>
                                <td></td>
                                <td>
                               <Input type="date" min={new Date().toISOString().split('T')[0]} value={selectedDate && selectedDate.toISOString().split('T')[0]} onChange={dateChange}/>
                            </td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <button style={{backgroundColor:'unset'}} onClick={() => modalChangeDate(-1)}>
                                        <img src="./img/arrowLeft.png" className='admDiagModalArrowIcon' alt='' width="50px" />
                                    </button>&nbsp;
                                </td>
                                <td>
                                    <Table bordered style={{ width: `${tableWidth}px` }}>
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
                                    <button style={{backgroundColor:'unset'}} onClick={() => modalChangeDate(+1)}>
                                        <img src="./img/arrowRight.png" className='admDiagModalArrowIcon' alt='' width="50px" />
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