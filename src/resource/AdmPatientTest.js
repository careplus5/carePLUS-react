import { useState, useEffect } from 'react';
import { Input, Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import { url } from '../config';

// 검사 예약
const AdmPatientTest = ({ patient }) => {
    // 원외 검사 추가 기능
    const [testRequestList, setTestRequestList] = useState([]);
    const [selTest, setSelTest] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeList, setTimeList] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [message, setMessage] = useState('')

    useEffect(() => {
        setSelectedDate(new Date());
        setMessage('')
        if (patient === null) return;
        axios.post(`${url}/testRequestList`, { patNum: patient.patNum })
            .then(res => {
                console.log(res.data)
                if (res.data === null || res.data.length === 0) {
                    setMessage('* 등록된 검사요청이 없습니다 *');
                }
                setTestRequestList(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [patient])

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

    const testReserveTime = (test, date) => {
        axios.get(`${url}/testTimeList?testName=${test.testName}&testDate=${date.toISOString().split('T')[0]}`)
            .then(res => {
                console.log(res.data)
                setTimeList(res.data);
                setIsModal(true)
            }).catch(err => {
                console.log(err)
            })
    }

    const testReserve = (test) => {
        console.log(test);
        const formData = new FormData();
        formData.append('docDiagnosisNum', test.docDiagnosisNum);
        formData.append('docNum', test.docNum);
        formData.append('patNum', test.patNum);
        formData.append('testAppointmentDate', test.testAppointmentDate);
        formData.append('testAppointmentTime', test.testAppointmentTime + ":00");
        formData.append('testName', test.testName);
        test.testFile && formData.append('testFile', test.testFile);
        test.testFile && formData.append('testOutInspectRecord', test.testName.name);
        formData.append('testPart', test.testPart);
        formData.append('testRequestNum', test.testRequestNum);
        formData.append('testStatus', 'wait');

        axios.post(`${url}/testReserve`, formData)
            .then(res => {
                if (res.data === true) {
                    setTestRequestList(testRequestList.filter(item => item.testRequestNum !== test.testRequestNum));
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const selectTime = (time) => {
        const updateTestList = testRequestList.map(testRequest => {
            if (testRequest.testRequestNum === selTest.testRequestNum) {
                return { ...testRequest, testAppointmentDate: selectedDate.toISOString().split('T')[0], testAppointmentTime: time }
            } else return testRequest;
        })
        setTestRequestList([...updateTestList])
        setIsModal(false);
    }

    const selectFile = (e) => {
        console.log(e.target.files[0].name)
        const updateTestList = testRequestList.map(testRequest => {
            if (testRequest.testRequestNum === selTest.testRequestNum) {
                return { ...testRequest, testFile: e.target.files[0] }
            } else return testRequest;
        })
        setTestRequestList([...updateTestList])
    }

    return (

        <div style={{ width: "90%" }}>
            <div className="LboxHeader" style={{ display: 'flex', margin: '15px 25px' }}>
                <img id="boxIcon" style={{ marginTop: '15px', marginLeft: '15px', height: '25px' }} src="./img/test.png" />
                <h3 className="admPat-boxHeader">검사예약</h3>
                <span style={{ color: 'red', margin: '15px 25px' }}>{message}</span>
            </div>
            <div>
                <div style={{marginLeft:'145px', marginTop:'-27px'}}>
                    <br /><span>환자번호</span>
                    <input type="text" name='patNum' value={patient && patient.patNum} readOnly
                        className='admInputStyle' />

                    <span style={{ marginLeft: "13px" }}>이름</span>
                    <input name='patName' type="text" value={patient && patient.patName}
                        className='admInputStyle'
                        readOnly />
                    <span style={{ marginLeft: "13px" }}>주민등록번호</span>
                    <input name='patJumin' type="text" value={patient && patient.patJumin}
                        className='admInputStyle'
                        readOnly />
                    <span style={{ marginLeft: "13px" }}>성별</span>
                    <input name='patGender' type="text" value={patient && patient.patGender}
                        className='admInputStyle'
                        readOnly />
                    <span style={{ marginLeft: "13px" }}>연락처</span>
                    <input name='patTel' type="text"
                        className='admInputStyle' readOnly
                        value={patient && patient.patTel} /><br /><br />

                    <Table bordered>
                        <thead>
                            <tr>
                                <th>요청번호</th>
                                <th>진료과</th>
                                <th>의사번호</th>
                                <th>의사명</th>
                                <th>검사항목</th>
                                <th>검사부위</th>
                                <th>검사일자</th>
                                <th>검사시간</th>
                                <th>원외검사기록</th>
                                <th>예약</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                testRequestList.map(test => <tr key={test.testRequestNum}>
                                    <td>{test.testRequestNum}</td>
                                    <td>{test.departmentName}</td>
                                    <td>{test.docNum}</td>
                                    <td>{test.docName}</td>
                                    <td>{test.testName}</td>
                                    <td>{test.testPart}</td>
                                    <td onClick={(e) => { setSelTest(test); testReserveTime(test, selectedDate) }}>{test.testAppointmentDate}</td>
                                    <td onClick={(e) => { setSelTest(test); testReserveTime(test, selectedDate) }}>{test.testAppointmentTime}</td>
                                    <td onClick={() => {
                                        setSelTest(test);
                                        document.getElementById('file').click();
                                    }}>{test.testFile && test.testFile.name}</td>
                                    <td><Button onClick={() => testReserve(test)}>예약</Button></td>
                                </tr>)
                            }
                        </tbody>
                    </Table>
                </div>

                <div>
                    <input type='file' name='file' id='file' hidden onChange={selectFile} />
                </div>
            </div>
            {/* 병명 선택 모달 */}
            <Modal isOpen={isModal} style={{ maxWidth: "380px" }}>
                <ModalHeader toggle={() => setIsModal(false)} className='modalTitle'>
                    {selTest && selTest.testName}&nbsp;:&nbsp;{selectedDate && selectedDate.toISOString().split('T')[0]}
                </ModalHeader>
                <ModalBody className='amdDiagDueModalBodyStyle'>
                    <table>
                        <thead>
                            <tr>
                                <td></td>
                                <td>
                                    <Input type="date" value={selectedDate && selectedDate.toISOString().split('T')[0]}
                                        onChange={(e) => {
                                            setSelectedDate(new Date(e.target.value))
                                            testReserveTime(selTest, new Date(e.target.value));
                                        }} />
                                </td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <button onClick={() => {
                                        const newDate = selectedDate;
                                        newDate.setDate(newDate.getDate() - 1);
                                        console.log(newDate);
                                        setSelectedDate(newDate);
                                        testReserveTime(selTest, newDate);
                                    }}
                                    style={{backgroundColor:'unset'}}
                                    >
                                        <img src="./img/arrowLeft.png" className='admDiagModalArrowIcon' alt='' width="50px" />
                                    </button>&nbsp;
                                </td>
                                <td>
                                    <Table bordered style={{ width: "200px" }}>
                                        <thead >
                                            <tr >
                                                <th style={{ width: '100px' }}>예약시간</th>
                                                <th>{selTest && selTest.testName}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {hours.map(time => (
                                                <tr key={time}>
                                                    <td>{time}</td>
                                                    {timeList.find(testTime => testTime === time + ':00') ?
                                                        <td style={{ border: '1px solid lightgray', cursor: 'not-allowed', backgroundColor: '#e0e0e0' }}>예약</td> :
                                                        <td onClick={() => selectTime(time)}></td>}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </td>
                                <td>&nbsp;
                                    <button onClick={() => {
                                        const newDate = selectedDate;
                                        newDate.setDate(newDate.getDate() + 1);
                                        console.log(newDate);
                                        setSelectedDate(newDate);
                                        testReserveTime(selTest, newDate);
                                    }}
                                        style={{backgroundColor:'unset'}}
                                    >
                                        <img src="./img/arrowRight.png" className='admDiagModalArrowIcon' alt='' width="50px" />
                                    </button>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </ModalBody>
            </Modal>
        </div>

    )
}

export default AdmPatientTest;