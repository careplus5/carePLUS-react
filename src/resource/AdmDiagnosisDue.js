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
        <div className='backgroud' >
            <div className="boxHeader" style={{ marginLeft: "30px" }}>
                <img id="boxIcon" alt='' style={{width: "40px", height: "40px" }} src="./img/register.png" />&nbsp;
                <h3 id="LboxHeader" style={{ marginTop: "20px", marginRight: "120px" }}>진료예약</h3>
                <button style={{backgroundColor:'#0081b4', height:'30px', marginLeft:"850px"}} onClick={patientDiagnosisRegist}>접수</button>
                <table style={{marginLeft:'150px', textAlign:'right'}}>
                <br/><tr>
                        <td >환자번호</td>
                        <td  style={{width:'150px'}}>
                        <input type="text" name='patNum' id='patNum' value={patient && patient.patNum}
                                 style={{border:'none',width: "100%", height: "30px"}}  onChange={changeValue} />
                        </td>
                        <td >이름</td>
                        <td  style={{width:'150px'}}>
                        <input type="text" name='patName' id='patName' value={patient && patient.patName}
                                 style={{border:'none',width: "100%", height: "30px"}}   onChange={changeValue}/>
                        </td>
                        <td >주민등록번호</td>
                        <td  colSpan={3}>
                        <input type="text" name='patJumin' id='patJumin' value={patient && patient.patJumin}
                                 style={{border:'none',width: "100%", height: "30px"}}  onChange={changeValue} />
                        </td>
                    </tr><br/>
                    <tr>
                        <td >연락처</td>
                        <td  colSpan={3}>
                        <input type="text" name='patTel' id='patTel' value={patient && patient.patTel}
                                 style={{border:'none',width: "100%", height: "30px"}}   onChange={changeValue}/>
                        </td>
                        <td >주소</td>
                        <td colSpan={3}>
                        <input name='patGender' id='patGender' type="text" value={patient && patient.patAddress}
                                 style={{border:'none',width: "100%", height: "30px"}} 
                                onChange={changeValue} />
                        </td>
                    </tr><br/>
                    <tr>
                        <td >성별</td>
                        <td  style={{width:'150px'}}>
                        <input name='patGender' id='patGender' type="text" value={patient && patient.patGender}
                                 style={{border:'none',width: "100%", height: "30px"}} 
                                onChange={changeValue} />
                        </td>
                        <td >키</td>
                        <td  style={{width:'150px'}}>
                        <input name='patHeight' id='patHeight' type="text" value={patient && patient.patHeight}
                                 style={{border:'none',width: "100%", height: "30px"}} 
                                onChange={changeValue} />
                        </td>
                        <td >몸무게</td>
                        <td  style={{width:'150px'}}>
                        <input name='patWeight' id='patWeight' type="text" value={patient && patient.patWeight}
                                 style={{border:'none',width: "100%", height: "30px"}} 
                                onChange={changeValue} />
                        </td>
                        <td >혈액형</td>
                        <td  style={{width:'150px'}}>
                        <input name='patBloodType' id='patBloodType' type="text" value={patient && patient.patBloodType}
                                 style={{border:'none',width: "100%", height: "30px"}} 
                                onChange={changeValue} />
                        </td>
                    </tr><br/>
                    <tr>
                        <td >과거병력</td>
                        <td  colSpan={7}>
                        <input name='patHistory' id='patHistory' type="text" value={patient && patient.patHistory}
                                 style={{border:'none',width: "100%", height: "30px"}} 
                                onChange={changeValue} />
                        </td>
                    </tr><br/>
                    <tr>
                        <td >진료과</td>
                        <td >
                            {/* 진료과 선택 selectbox */}
                            <select className='adminInputType' style={{width:'100%', textAlign:'center'}}
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
                        </td>
                        <td onClick={openAdmDiagDueModal} >주치의</td>
                        <td  style={{width:'150px'}}>
                        <input name='' type="text" value={diagnosisDue.docName}
                                 style={{border:'none',width: "100%", height: "30px"}}  />
                        </td>
                        <td >예약일자</td>
                        <td  style={{width:'150px'}}>
                        <input type="text" value={diagnosisDue.diagnosisDueDate}
                                 style={{border:'none',width: "100%", height: "30px"}}  />
                        </td>
                        <td >예약시간</td>
                        <td  style={{width:'150px'}}>
                        <input type="text" value={diagnosisDue.diagnosisDueDate}
                                style={{border:'none',width: "100%", height: "30px"}}  />
                        </td>
                    </tr><br/>
                    <tr>
                        <td >증상</td>
                        <td  colSpan={3}>
                        <input type="text" name="diagnosisDueState"
                                style={{border:'none',width: "100%", height: "30px"}} onChange={changeValue} />
                        </td>
                        <td >특이사항</td>
                        <td  colSpan={3}>
                        <input type="text" name="diagnosisDueEtc"
                                style={{border:'none',width: "100%", height: "30px"}} onChange={changeValue} />
                        </td>
                    </tr>
                </table>
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