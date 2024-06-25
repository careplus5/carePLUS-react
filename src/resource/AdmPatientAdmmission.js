import { url } from '../config';
import { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';


// 입원 예약
const AdmPatientAdmmission = ({ patient }) => {
    const [patientAdmission, setPatientAdmission] = useState(null)
    const [admissionRequest, setAdmissionRequest] = useState('');
    const [bedsList, setBedsList] = useState(null);
    const [isModal, setIsModal] = useState(false);


    useEffect (()=> {
        axios.post(`${url}/admissionRequest`, {patNum:patient.patNum})
            .then(res => {
                setAdmissionRequest(res.data.admissionRequest);
                const resBedsList = res.data.bedsList;
                if(resBedsList===null || resBedsList.length===0) return;
                console.log(resBedsList)
                setBedsList(resBedsList)
                console.log(res.data);
                
            })
            .catch(err => {
                // alert("입원요청 환자인지 확인해주세요");
            })
        
    },[patient]);



    const selectBed = (bed) => {
        setPatientAdmission({...patientAdmission, bedsNum:bed.bedsNum, bedsWard:bed.bedsWard, bedsRoom:bed.bedsRoom})
        console.log(patientAdmission);
    }

    const patientAdmissionRegist = () => {
        const { bedsNum, bedsWard, bedsRoom } = patientAdmission || {};
        const { admissionRequestNum, admissionRequestPeriod, admissionRequestReason, departmentName, docName } = admissionRequest || {};
        const admissionData = admissionRequest.admissionData;

        const requestData = {
            patNum: patient.patNum,
            docNum: docName, // 이 부분은 백엔드와의 데이터 통신 규약에 맞게 수정해야 합니다.
            bedsNum: bedsNum,
            admissionRequestNum: admissionRequestNum,
            admissionReason: patientAdmission.admissionRequestReason,
            admissionDate: patientAdmission.admissionData, // 예제에서는 admissionDate 필드가 없으므로 실제 데이터 필드명으로 변경 필요
            admissionDueDate: patientAdmission.admissionData,
            admissionDischargeDate: patientAdmission.admissionData // 예제에서는 admissionDischargeDate 필드가 없으므로 실제 데이터 필드명으로 변경 필요
        };
        console.log(requestData);

        axios.post(`${url}/patientAdmissionRegist`, requestData)
            .then(res => {
                console.log(res.data);
                // 성공적으로 처리된 후의 로직 추가 (예: 화면 리로드, 메시지 출력 등)
            })
            .catch(err => {
                console.error("접수실패");
                // 오류 처리 (예: 사용자에게 알림 등)
            });
    }

    return (
        <div style={{width:"90%"}}>
            <div style={{ marginLeft: "35px" }} >
                <img id="boxIcon" alt='' style={{ marginTop:'-10px', width: "40px", height: "40px" }} src="./img/admission.png" />&nbsp;
                <h3 id="AmdLboxHeader" style={{ marginTop:'20px', marginRight: "120px" }}>입원</h3>               
                <br/><br/>
                <Table bordered>
                    <tbody>
                    <tr>
                        <td >환자번호</td>
                        <td style={{width:'100px'}}>{patient && patient.patNum}</td>
                        <td>이름</td>
                        <td style={{width:'100px'}}>{patient && patient.patName}</td>
                        <td>주민등록번호</td>
                        <td>{patient && patient.patJumin}</td>
                        <td style={{width:'100px'}}>연락처</td>
                        <td style={{width:'100px'}}>{patient && patient.patTel}</td>
                        <td >주소</td>
                        <td colSpan={2}>{patient && patient.patAddress}</td>
                    </tr>
                    <tr>
                        <td >성별</td>
                        <td>{patient && patient.patGender}</td>
                        <td>진료과</td>
                        <td>{admissionRequest && admissionRequest.departmentName}</td>
                        <td >주치의</td>
                        <td style={{width:'150px'}}>{admissionRequest && admissionRequest.docName}</td>
                        <td >입원기간</td>
                        <td>
                            <input type="text" value={admissionRequest && admissionRequest.admissionRequestPeriod}
                                style={{border:'none',display:'inline-block', width:'100%',outline:'none'}}/>
                        </td>
                        <td >입원사유</td>
                        <td colSpan={2}>
                            <input type="text" value={admissionRequest && admissionRequest.admissionRequestReason}
                                style={{border:'none',display:'inline-block', width:'100%',outline:'none'}}/>
                        </td>
                    </tr>
                    <tr>
                        <td>병동번호</td>
                        <td onClick={()=>setIsModal(true)}>
                            {patientAdmission&&patientAdmission.bedsWard}
                        </td>
                        <td >병실번호</td>
                        <td onClick={()=>setIsModal(true)}>{patientAdmission&&patientAdmission.bedsRoom}</td>
                        <td>베드번호</td>
                        <td onClick={()=>setIsModal(true)}>{patientAdmission&&patientAdmission.bedsNum}</td>
                        <td>입원예정일</td>
                        <td >
                            <Input type="date" onChange={(e)=>setPatientAdmission(
                                {...admissionRequest,admissionData:e.target.value, admissionDueData:e.target.value})}/>
                            </td>
                        <td >퇴원예정일</td>
                        <td >
                            <Input type="date" onChange={(e)=>setPatientAdmission(
                                {...admissionRequest,admissionDischargeDueData:e.target.value})}/>
                        </td>
                        <td><Button onClick={patientAdmissionRegist}>접수</Button></td>
                    </tr>
                    </tbody>
                </Table>
            </div>
            <Modal isOpen={isModal} style={{ maxWidth: `500px`}} contentClassName='surgery-modal-style'>
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
                            {bedsList && bedsList.map(bed=> (
                                <tr key={bed.bedsNUm}>
                                    <td style={{ cursor: 'not-allowed'}}>{bed.bedsWard}</td>
                                    <td style={{ cursor: 'not-allowed'}}>{bed.bedsRoom}</td>
                                    {bed.bedsIsUse? 
                                        <td style={{backgroundColor:'#e0e0e0',cursor: 'not-allowed'}}>{bed.bedsNum}</td>:
                                        <td onClick={()=>{
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