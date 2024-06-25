import { url } from '../config';
import { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';


// 입원 예약
const AdmPatientAdmmission = ({ patient }) => {
    const [admission, setAdmission] = useState(null)
    const [admissionRequest, setAdmissionRequest] = useState('');
    const [bedsList, setBedsList] = useState(null);
    const [isModal, setIsModal] = useState(false);
    const [noReq, setNoReq] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setMessage('')
        setNoReq(false);
        if (patient === null) return;

        axios.post(`${url}/admissionRequest`, { patNum: patient.patNum })
            .then(res => {
                console.log(res.data);
                const resAdmissionRequest = res.data.admissionRequest;
                setAdmissionRequest(resAdmissionRequest);
                setBedsList(res.data.bedsList)
                setAdmission({
                    ...admission,
                    admissionRequestNum: resAdmissionRequest.admissionRequestNum,
                    docNum: resAdmissionRequest.docNum,
                    jobNum: resAdmissionRequest.jobNum,
                    patNum: resAdmissionRequest.patNum,
                    departmentNum: resAdmissionRequest.departmentNum,
                    admissionReason: resAdmissionRequest.admissionRequestReason,
                    admissionStatus: 'ing', //?
                })
            })
            .catch(err => {
                // alert("입원요청 환자인지 확인해주세요");
                setMessage('* 등록된 입원 요청이 없습니다. *');
                setNoReq(true);
            })

    }, [patient])

    const selectBed = (bed) => {
        setAdmission({ ...admission, bedsNum: bed.bedsNum, bedsWard: bed.bedsWard, bedsRoom: bed.bedsRoom })
    }

    const reserveAdmission = () => {
        console.log(admission);
        axios.post(`${url}/admission`, admission)
            .then(res => {
                if (res.data === true) {
                    alert('입원처리 되었습니다.');
                    setAdmission(null)
                    setAdmissionRequest(null)
                    setNoReq(true);
                } else {
                    alert('입원처리에 실패했습니다.')
                }
            })
            .catch(err => {
                console.log(err)
                alert('입원처리에 실패했습니다.')
            })
    }


    return (
        <div style={{ width: "98%" }}>
            <div style={{ marginLeft: "35px" }} >
                <div className="LboxHeader" style={{ display: 'flex', margin: '15px -5px' }}>
                <img id="boxIcon" style={{ marginTop: '15px', marginLeft: '15px', height: '25px' }} src="./img/admission.png" />
                <h3 className="admPat-boxHeader">입원</h3>
                <span style={{ color: 'red', margin: '12px 25px' }}>{message}</span>
            </div>
                <Table bordered>
                    <tbody>
                        <tr>
                            <th >환자번호</th>
                            <td style={{ width: '100px' }}>{patient && patient.patNum}</td>
                            <th>이름</th>
                            <td style={{ width: '100px' }}>{patient && patient.patName}</td>
                            <th>주민등록번호</th>
                            <td>{patient && patient.patJumin}</td>
                            <th style={{ width: '100px' }}>연락처</th>
                            <td style={{ width: '100px' }}>{patient && patient.patTel}</td>
                            <th >주소</th>
                            <td colSpan={2}>{patient && patient.patAddress}</td>
                        </tr>
                        <tr>
                            <th >성별</th>
                            <td>{patient && patient.patGender}</td>
                            <th>진료과</th>
                            <td>{admissionRequest && admissionRequest.departmentName}</td>
                            <th >주치의</th>
                            <td style={{ width: '150px' }}>{admissionRequest && admissionRequest.docName}</td>
                            <th >입원기간</th>
                            <td>
                                <input type="text" value={admissionRequest && admissionRequest.admissionRequestPeriod}
                                    style={{ border: 'none', display: 'inline-block', width: '100%', outline: 'none' }} />
                            </td>
                            <th >입원사유</th>
                            <td colSpan={2}>
                                <input type="text" value={admissionRequest && admissionRequest.admissionRequestReason}
                                    style={{ border: 'none', display: 'inline-block', width: '100%', outline: 'none' }} />
                            </td>
                        </tr>
                        <tr>
                            <th>병동번호</th>
                            <td onClick={() => { if (!noReq) setIsModal(true) }}>
                                {admission && admission.bedsWard}
                            </td>
                            <th >병실번호</th>
                            <td onClick={() => { if (!noReq) setIsModal(true) }}>{admission && admission.bedsRoom}</td>
                            <th>베드번호</th>
                            <td onClick={() => { if (!noReq) setIsModal(true) }}>{admission && admission.bedsNum}</td>
                            <th>입원예정일</th>
                            <td >
                                <Input type="date" min={new Date().toISOString().split('T')[0]} disabled={noReq} value={admission ? admission.admissionDate : ''} onChange={(e) => setAdmission(
                                    { ...admission, admissionDate: e.target.value, admissionDueDate: e.target.value })} />
                            </td>
                            <th >퇴원예정일</th>
                            <td >
                                <Input type="date" min={new Date().toISOString().split('T')[0]} disabled={noReq} value={admission ? admission.admissionDischargeDueDate : ''} onChange={(e) => setAdmission(
                                    { ...admission, admissionDischargeDueDate: e.target.value })} />
                            </td>
                            <th><Button onClick={reserveAdmission} disabled={noReq}>접수</Button></th>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <Modal isOpen={isModal} style={{ maxWidth: `500px` }} contentClassName='surgery-modal-style'>
                <ModalHeader toggle={() => setIsModal(false)} className='modalTitle' >
                    병실
                </ModalHeader>
                <ModalBody >
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>병동</th>
                                <th>병실</th>
                                <th>베드</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bedsList && bedsList.map(bed => (
                                <tr key={bed.bedsNUm}>
                                    <td style={{ cursor: 'not-allowed' }}>{bed.bedsWard}</td>
                                    <td style={{ cursor: 'not-allowed' }}>{bed.bedsRoom}</td>
                                    {bed.bedsIsUse ?
                                        <td style={{ backgroundColor: '#e0e0e0', cursor: 'not-allowed' }}>{bed.bedsNum}</td> :
                                        <td onClick={() => {
                                            selectBed(bed);
                                            setIsModal(false)
                                        }}>{bed.bedsNum}</td>}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default AdmPatientAdmmission;