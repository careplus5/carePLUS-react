import { Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
// import Prescription from './Prescription';
// import AdmissionAndDischarge from './AdmissionAndDischarge';
import { url } from '../config';

// 기타 문서 발급
const AdmPatientStorage = ({ patient }) => {

    // 모달 (부서에 대한 정보 검색)
    const [admStoredisModalIsOpen, setAdmStoredisModalIsOpen] = useState(false);
    const [diagnosisList, setDiagnosisList] = useState([]);
    const [admissionList, setAdmissionList] = useState([]);

    // 버튼 클릭시 테이블
    const [showTable, setShowTable] = useState(false);

    // 모달 오픈
    const openPatientPrescriptionModal = () => {
        setAdmStoredisModalIsOpen(true);
    }

    // 진료확인서 출력 버튼 클릭
    const handleDiagnosisCheck = () => {
        setAdmStoredisModalIsOpen(true);
    }

    // 입·퇴원확인서 출력 버튼 클릭 
    const handleAdmissionDischarge = () => {
        setAdmStoredisModalIsOpen(true);
    }

    // 진료확인서
    const getDocDiagnosis = () => {
        console.log(patient.patNum)
        axios.post(`${url}/confirmDiagnosis`, { patNum: patient.patNum })
            .then(res => {
                setDiagnosisList(res.data);
                setAdmissionList();
            })
        toggleTable('docDiagosis');
    }

    // 입퇴원확인서
    const getAdmissionDischarge = () => {
        console.log(patient.patNum)
        axios.post(`${url}/confirmAdmission`, { patNum: patient.patNum })
            .then(res => {
                setAdmissionList(res.data);
                setDiagnosisList('')
            })
        toggleTable('admissionDischarge');
    }

    // 버튼 클릭시 
    const toggleTable = (tableType) => {
        setShowTable(tableType); // 버튼 클릭 시 테이블 표시 상태 설정
    }

    return (
        <div id="LaccordionBox">
            <div>
                <div className="boxHeader" style={{ marginLeft: "35px" }} >
                    <img id="boxIcon" style={{ width: "40px", height: "40px" }} src="./img/document.png" />&nbsp;
                    <h3 id="LboxHeader" style={{ marginTop: "19px", marginRight: "125px" }}>기타 문서 발급</h3>
                </div>
                <br /><br />
                <div style={{marginLeft:'150px'}}>
                    <span >환자번호</span>
                    <input type="text" name='patNum' value={patient && patient.patNum}
                        className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}} />
                    <span style={{ marginLeft: "21px" }}>주민등록번호</span>
                    <input type="text" value={patient && patient.patJumin}
                        className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}} />
                    <span style={{ marginLeft: "21px" }}>이름</span>
                    <input type="text" value={patient && patient.patName}
                        className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}} />
                    <button onClick={() => getDocDiagnosis()} style={{ backgroundColor:'#0081b4', marginLeft: '20px', height: '35px' }}>진료확인서</button>
                    <button onClick={() => getAdmissionDischarge()} style={{ backgroundColor:'#0081b4', marginLeft: '20px', height: '35px' }}>입·퇴원확인서</button>
                    <br /><br />
                    {/* 진료확인서 */}
                    {showTable === 'docDiagosis' && patient && (
                        <Table bordered style={{ maxHeight:'300px', overflowY:'auto', width:'1050px', textAlign: 'center', backgroundColor:'#fbf9f2' }}>
                            <thead>
                                <tr>
                                    <th>환자번호</th>
                                    <th>이름</th>
                                    <th>의사번호</th>
                                    <th>진료일자</th>
                                    <th>진료확인서</th>
                                </tr>
                            </thead>
                            <tbody>
                                {diagnosisList.map(diagnosis => <tr>
                                    <td>{patient.patNum}</td>
                                    <td>{patient.patName}</td>
                                    <td>{diagnosis.docNum}</td>
                                    <td>{diagnosis.docDiagonsisDate}</td>
                                    <td><button style={{ backgroundColor: 'black' }} onClick={() => handleDiagnosisCheck(diagnosis)}>진료확인서 출력</button></td>
                                </tr>)}
                            </tbody>
                        </Table>
                    )}
                    {/* 입·퇴원확인서 */}
                    {showTable === 'admissionDischarge' && patient && (
                        <Table bordered style={{ textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <th>환자번호</th>
                                    <th>이름</th>
                                    <th>입원일자</th>
                                    <th>퇴원일자</th>
                                    <th>입·퇴원확인서</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{patient.patNum}</td>
                                    <td>{patient.patName}</td>
                                    <td>0</td>
                                    <td>0</td>
                                    <td><button style={{ backgroundColor: 'black' }} onClick={handleAdmissionDischarge}>입·퇴원확인서 출력</button></td>
                                </tr>
                            </tbody>
                        </Table>
                    )}
                </div>
            </div>
            {/* 진료확인서 */}
            <Modal isOpen={admStoredisModalIsOpen} toggle={openPatientPrescriptionModal} style={{ width: '100%', height: "100%" }}>
                <ModalHeader toggle={openPatientPrescriptionModal} className='modalTitle'>
                    <h1 style={{ textAlign: "center", marginTop: "100px" }}>&nbsp;진&nbsp;&nbsp;료&nbsp;&nbsp;확&nbsp;&nbsp;인&nbsp;&nbsp;서&nbsp;</h1>
                </ModalHeader>
                <ModalBody className='amdDiagDueModalBodyStyle'>
                    <button >pre</button><button >next</button>
                    <div className="tcBox">
                <table className="tcTable" border="1" cellSpacing="0" style={{fontSize:"20px"}}>
                    <tr style={{textAlign:"center"}}>
                        <td className="tableSbox"> 성 명 </td>
                        <td>(patient.patName)</td>
                        <td className="tableSbox"> 성 별 </td>
                        <td>(patient.patGender)</td>
                        <td className="tableSbox"> 연 령 </td>
                        <td>(?!?!, patient.patJumin)</td>
                    </tr>
                    <tr style={{textAlign:"center"}}>
                        <td className="tableSbox"> 주 소 </td>
                        <td colSpan="2">(patient.patAddress)</td>
                        <td style={{width:"150px"}}>주민등록번호</td>
                        <td colSpan="2">(patient.patJumin)</td>
                    </tr>
                    <tr style={{textAlign:"center"}}>
                        <td className="tableSbox"> 진료과 </td>
                        <td colSpan="2"> (doctor.departmentName) </td>
                        <td style={{width:"150px"}}> 진 료 일 </td>
                        <td colSpan="2">(diagnosis.diagnosisDate)</td>
                    </tr>
                    <tr style={{textAlign:"center"}}>
                        <td className="tableSbox"> 병 명 </td>
                        <td colSpan="5"><span> (disease.dieaseName + docDiagnosis.diseaseNum) </span></td>
                    </tr>
                    <tr className="tableSbox">
                        <td className="tableSbox" style={{height:"500px"}}> 진료내용 </td>
                        <td colSpan="5"> (docDiagnosis.docDiagnosisContent)</td>
                    </tr>
                    <tr style={{textAlign:"center"}}>
                        <td colSpan="6" style={{height:"400px"}}>
                            <span>위 진료 대상자에 대해여 위와 같이 진료하였음을 확인합니다.</span><br/><br/>
                            <span> 발행일 : </span><span> ("curdate()") </span><br/><br/>
                            <span> 담당의 : </span><span> (doctor.docName) </span>

                        </td>
                    </tr>
                </table>
            </div>
                </ModalBody>
            </Modal>
            {/* 입퇴원확인서 */}
            <Modal isOpen={admStoredisModalIsOpen} toggle={openPatientPrescriptionModal} style={{ width: '2000px', height: "100%" }}>
                <ModalHeader toggle={openPatientPrescriptionModal} className='modalTitle'>
                    <h1 style={{ textAlign: "center", marginTop: "100px" }}>&nbsp;입&nbsp;&nbsp;퇴&nbsp;&nbsp;원&nbsp;&nbsp;확&nbsp;&nbsp;인&nbsp;&nbsp;서&nbsp;</h1>
                </ModalHeader>
                <ModalBody className='amdDiagDueModalBodyStyle'>

                    <div className="tcBox">
                        <table className="tcTable" border="1" cellSpacing="0" style={{ fontSize: "20px" }}>
                            <tr style={{ textAlign: "center" }}>
                                <td className="tableSbox" style={{ width: '150px' }}> 환자번호 </td>
                                <td style={{ width: '280px' }}>(patient.patNum)</td>
                                <td className="tableSbox"> 이름 </td>
                                <td style={{ width: '280px' }}> (patient.patName) </td>
                            </tr>
                            <tr style={{ textAlign: "center" }}>
                                <td className="tableSbox"> 주민등록번호 </td>
                                <td>(patient.patJumin)</td>
                                <td style={{ textAlign: 'center' }}> 성 별 </td>
                                <td>(patient.patGender)</td>
                            </tr>
                            <tr>
                                <td className="tableSbox" style={{ textAlign: "center" }}> 주 소 </td>
                                <td colSpan="3"> &nbsp;&nbsp;&nbsp;&nbsp; ((patient.patAddress))</td>

                            </tr>
                            <tr style={{ textAlign: "center" }}>
                                <td className="tableSbox"> 입 원 일 </td>
                                <td> (admission.admissionDate) </td>
                                <td style={{ width: "150px" }}> 퇴 원 일 </td>
                                <td>(admission.admissionDischargeDate)</td>
                            </tr>
                            <tr style={{ textAlign: "center", height: '70px' }}>
                                <td colSpan="4"><span> 입 원 사 유 </span></td>
                            </tr>
                            <tr className="tableSbox">
                                <td className="tableSbox" style={{ height: "500px" }}> 입 원 내 용 </td>
                                <td colSpan="3">(admission.admissionReason)</td>
                            </tr>
                            <tr style={{ textAlign: "center" }}>
                                <td colSpan="4" style={{ height: "400px" }}>
                                    <span>위 진료 대상자에 대해여 위와 같이 입 · 퇴원하였음을 확인합니다.</span><br /><br />
                                    <span> 발행일 : </span><span> (curdate()) </span><br /><br />
                                    <span> 담당의 : </span><span> (doctor.docName) </span>

                                </td>
                            </tr>
                        </table>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default AdmPatientStorage;