import { url } from '../config';
import { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';


// 입원 예약
const AdmPatientAdmmission = ({ patient }) => {

    const [patNum, setPatNum] = useState(patient ? parseInt(patient.patNum) : '');
    console.log(patNum);
    console.log("1");
    // 시간 관련
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');

    // 모달 (부서에 대한 정보 검색)
    const [admDiagDuedisModalIsOpen, setAdmDiagDuedisModalIsOpen] = useState(false);

    // 모달 오픈
    const openAdmDiagDueModal = () => {
        setAdmDiagDuedisModalIsOpen(true);
        // setAdmDiagDuedisModalIsOpen(false);
    }

    const [patientAdmission, setPatientAdmission] = useState({
        patName: '', patJumin: '', patGender: '', docNum: '', docName: '',
        patAddress: '', departmentNum: '', departmentName: ''
    })

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

    // 이전 날짜로 이동
    const admpreDiagDueDateList = () => {
        // setSelectedDate(dateStr-1);
        let previousDate = new Date(selectedDate);
        previousDate.setDate(previousDate.getDate() - 1);
        // console.log('하루전 완료' + previousDate);
        setSelectedDate(previousDate);
        // updateDoctorSchedule(previousDate);
    }

    // 다음 날짜로 이동
    const admNextDiagDueDateList = () => {
        // setSelectedDate(dateStr+1);
        let nextDate = new Date(selectedDate);
        nextDate.setDate(nextDate.getDate() + 1);
        // console.log('하루뒤 완료' + nextDate);
        setSelectedDate(nextDate);
        // updateDoctorSchedule(nextDate);
    }

    return (
        <div>
            <div className="boxHeader" style={{ marginLeft: "35px" }} >
                <img id="boxIcon" style={{ marginTop:'-10px', width: "40px", height: "40px" }} src="./img/admission.png" />&nbsp;
                <h3 id="LboxHeader" style={{ marginTop:'20px', marginRight: "120px" }}>입원</h3>
                <button style={{backgroundColor:'#0081b4', height:'30px', marginLeft:"920px"}}>접수</button>
                <br/><br/><div style={{marginLeft:'175px'}}>
                    <span>환자번호</span>
                    <input type="text" value={patient && patient.patNum}
                        className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}} />&nbsp;
                    <span style={{ marginLeft: "28px" }}>이름</span>
                    <input type="text" value={patient && patient.patName}
                        className='admInputType' style={{marginLeft: "10px", width: "150px", height: "30px"}}/>
                    <span style={{ marginLeft: "28px" }}>주민등록번호</span>
                    <input type="text" value={patient && patient.patJumin}
                        className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}} />
                    <span style={{ marginLeft: "28px" }}>성별</span>
                    <input type="text" value={patient && patient.patGender}
                        className='admInputType' style={{marginLeft: "10px", width: "50px", height: "30px"}} />
                </div><br />

                <div style={{marginLeft:'175px'}}>
                <span>연락처</span>
                    <input type="text" value={patient && patient.patTel}
                        className='admInputType' style={{marginLeft: "10px", width: "150px", height: "30px"}} />
                    <span style={{ marginLeft: "20px" }}>주소</span>
                    <input type="text" value={patient && patient.patAddress}
                        className='admInputType' style={{marginLeft: "10px", width: "320px", height: "30px"}} />
                    <span style={{ marginLeft: "20px" }}>진료과</span>
                    <input type="text" s
                        className='admInputType' style={{marginLeft: "10px", width: "100px", height: "30px"}} />
                    <span style={{ marginLeft: "20px" }}>주치의</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "100px", height: "30px"}} />
                </div><br />

                <div style={{marginLeft:'175px'}}>
                    <span>병실조회</span>
                    <button onClick={openAdmDiagDueModal} style={{ marginLeft: "10px" }}>조회</button>
                    <span style={{ marginLeft: "28px" }}>담당과</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "50px", height: "30px"}} />
                    <span style={{ marginLeft: "28px" }}>병동번호</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "50px", height: "30px"}} />
                    <span style={{ marginLeft: "28px" }}>병실번호</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "50px", height: "30px"}} />
                    <span style={{ marginLeft: "28px" }}>베드번호</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "50px", height: "30px"}}/>
                    <span style={{ marginLeft: "28px" }}>퇴원예정일</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "150px", height: "30px"}} />
                </div><br />

                <div style={{marginLeft:'175px'}}>
                    <span >입원사유</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "855px", height: "30px"}}/>
                </div><br />
            </div>
            {/* 병명 선택 모달 */}
            <Modal isOpen={admDiagDuedisModalIsOpen} toggle={openAdmDiagDueModal} style={{ maxWidth: "1100px" }}>
                <ModalHeader toggle={openAdmDiagDueModal} className='modalTitle'>주치의 스케줄 조회</ModalHeader>
                <ModalBody className='amdDiagDueModalBodyStyle'>
                    <button onClick={admpreDiagDueDateList}>pre</button><button onClick={admNextDiagDueDateList}>next</button>
                    <table className="admDoctorDueSceduleList" style={{ maxWidth: '1035px', tableLayout: 'fixed', maxHeight: '200%', overflow: "scroll" }}>
                        <thead >
                            <tr style={{ position: 'sticky', height: '50px', top: 0, backgroundColor: '#FFFDF8', zIndex: 1, borderBottom: '1px solid black' }}>
                                <th style={{ width: '100px' }}>예약시간</th>
                                {/* {doctors.length > 0 && doctors.map(doctor => (
                                    <th key={doctor[0].docNum}>{doctor[0].docName}</th>
                                ))} */}
                            </tr>
                        </thead>
                        <tbody>
                            {hours.map(time => (
                                <tr key={time}>
                                    <td style={{ border: '1px solid lightgray' }}>{time}</td>
                                    {/* {doctors.map(doctorDue => {
                                        const due = doctorDue.find(due => due.diagnosisDueTime === `${time}:00`);
                                        return (
                                            <td
                                                key={doctorDue[0].docNum}
                                                style={{ border: '1px solid lightgray', cursor: due ? 'not-allowed' : 'pointer', backgroundColor: due ? '#e0e0e0' : '#fff' }}
                                                onClick={!due ? () => handleTimeCellClick(time, doctorDue[0].docName) : null}
                                            >
                                                {due ? '예약' : ''}
                                            </td>
                                        );
                                    })} */}
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
    )
}

export default AdmPatientAdmmission;