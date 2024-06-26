import { Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { url } from '../config';
import AdmDiagCheckModal from './AdmDiagCheckModal';
import AdmDischargeCheckModal from './AdmDischargeCheckModal';
import '../css/Adm.css';

// 기타 문서 발급
const AdmPatientStorage = ({ patient }) => {

    const [diagCheckModalIsOpen, setDiagCheckModalIsOpen] = useState(false);
    const [patDiagCheckList, setPatDiagCheckList] = useState([]);
    const [docDiagNum, setDocDiagNum] = useState('');
    const [firstDiagDate, setFirstDiagDate] = useState('');

    const [admCheckModalIsOpen, setAdmCheckModalIsOpen] = useState(false);
    const [patAdmCheckList, setPatAdmCheckList] = useState([]);
    const [admNum, setAdmNum] = useState('');


    // 버튼 클릭시 테이블
    const [showTable, setShowTable] = useState(false);

    // 진료확인서 모달 오픈
    const openDiagCheckModal = (diagCheck) => {
        setDiagCheckModalIsOpen(!diagCheckModalIsOpen);
        setDocDiagNum(diagCheck.docDiagnosisNum);
        setFirstDiagDate(diagCheck.firstDiagDate);
    }
    
    // 입퇴원확인서 모달 오픈
    const openAdmCheckModal = (admCheck) => {
        setAdmCheckModalIsOpen(!admCheckModalIsOpen);
        setAdmNum(admCheck.admissionNum);
    }

    // 진료확인서
    const getPatDiagCheckList = () => {
        console.log("ggg");
        axios.post(`${url}/patDiagCheckList`, { patNum: patient.patNum })
            .then(res => {
                setPatDiagCheckList([...res.data]);
            })
        toggleTable('diagCheck');
    }

    // 입퇴원확인서
    const getPatAdmCheckList = () => {
        axios.post(`${url}/patAdmCheckList`, { patNum: patient.patNum })
            .then(res => {
                setPatAdmCheckList([...res.data]);
            })
        toggleTable('admCheck');
    }

    // 버튼 클릭시 
    const toggleTable = (tableType) => {
        setShowTable(tableType); // 버튼 클릭 시 테이블 표시 상태 설정
    }

    // 오늘 날짜
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        return `${year}년 ${month}월 ${day}일`;
      };
      

    return (
        <div id="LaccordionBox">
            <div>
                <div className="LboxHeader" style={{ display: 'flex', margin:'15px 25px' }}>
                    <img id="boxIcon" style={{ marginTop: "15px", marginLeft: "15px" }} src="./img/notice.png" />
                    <h3 className="admPat-boxHeader">기타문서발급</h3>
                </div>
                <div style={{marginLeft:'145px'}}>
                    <span >환자번호</span>
                    <input type="text" name='patNum' value={patient && patient.patNum}
                        className='admInputStyle' style={{width:"90px"}} readOnly/>
                    <span style={{ marginLeft: "20px" }}>주민등록번호</span>
                    <input type="text" value={patient && patient.patJumin}
                        className='admInputStyle' readOnly/>
                    <span style={{ marginLeft: "20px" }}>이름</span>
                    <input type="text" value={patient && patient.patName}
                        className='admInputStyle' style={{width:"90px"}} readOnly/>
                    <span style={{ marginLeft: "20px" }}>성별</span>
                    <input type="text" value={patient && patient.patGender}
                        className='admInputStyle' style={{width:"45px"}} readOnly/>
                    <span style={{ marginLeft: "20px" }}>전화번호</span>
                    <input type="text" value={patient && patient.patTel}
                        className='admInputStyle' readOnly/>
                    <button onClick={() => getPatDiagCheckList()} className='admStorButtonStyle' style={{marginLeft:'40px'}}>진료확인서</button>
                    <button onClick={() => getPatAdmCheckList()} className='admStorButtonStyle'>입·퇴원확인서</button>
                    <br /><br />
                    {/* 진료확인서 */}
                    {showTable === 'diagCheck' && patient && (
                        <div className='admPatStorageScroll'>
                            <Table bordered style={{ textAlign: 'center', backgroundColor:'#fbf9f2' }}>
                                <thead>
                                    <tr>
                                        <th>환자번호</th>
                                        <th>이름</th>
                                        <th>진료과</th>
                                        <th>담당의사번</th>
                                        <th>담당의</th>
                                        <th>검사종류</th>
                                        <th>초진일자</th>
                                        <th>진단일자</th>
                                        <th>진료종류</th>
                                        <th>진료확인서</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patDiagCheckList.map(diagCheck => 
                                    <tr key={diagCheck.docDiagnosisNum}>
                                        <td>{diagCheck.patNum}</td>
                                        <td>{diagCheck.patName}</td>
                                        <td>{diagCheck.deptName}</td>
                                        <td>{diagCheck.docNum}</td>
                                        <td>{diagCheck.docName}</td>
                                        <td>{diagCheck.testName === null ? '-' : diagCheck.testName}</td>
                                        <td>{diagCheck.firstDiagDate}</td>
                                        <td>{diagCheck.docDiagnosisDate}</td>
                                        <td>
                                            {diagCheck.docDiagnosisKind === 'diag' ? '외래' : 
                                            diagCheck.docDiagnosisKind === 'adm' ? '입원' :
                                            diagCheck.docDiagnosisKind}
                                        </td>
                                        <td><button style={{ backgroundColor: 'black' }} onClick={() => openDiagCheckModal(diagCheck)}>진료확인서</button></td>
                                    </tr>)}
                                </tbody>
                            </Table>
                        </div>
                    )}
                    {/* 입·퇴원확인서 */}
                    {showTable === 'admCheck' && patient && (
                        <div className='admPatStorageScroll'>
                            <Table bordered style={{ textAlign: 'center'}}>
                                <thead>
                                    <tr>
                                        <th>환자번호</th>
                                        <th>이름</th>
                                        <th>입원부서</th>
                                        <th>담당의사번</th>
                                        <th>담당의</th>
                                        <th>간호사사번</th>
                                        <th>담당간호사</th>
                                        <th>입원일자</th>
                                        <th>퇴원일자</th>
                                        <th>입원상태</th>
                                        <th>입·퇴원확인서</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patAdmCheckList.map(AdmCheck => 
                                    <tr key={AdmCheck.admissionNum}>
                                        <td>{AdmCheck.patNum}</td>
                                        <td>{AdmCheck.patName}</td>
                                        <td>{AdmCheck.deptName}</td>
                                        <td>{AdmCheck.docNum}</td>
                                        <td>{AdmCheck.docName}</td>
                                        <td>{AdmCheck.nurNum}</td>
                                        <td>{AdmCheck.nurName}</td>
                                        <td>{AdmCheck.admissionDate}</td>
                                        <td>{AdmCheck.admissionDischargeDate}</td>
                                        <td>{AdmCheck.admissionStatus === 'ing' ? '입원중' : 
                                            AdmCheck.admissionStatus === 'end' ? '퇴원' :
                                            AdmCheck.admissionStatus}
                                        </td>
                                        <td><button style={{ backgroundColor: 'black' }} onClick={() => openAdmCheckModal(AdmCheck)}>입·퇴원확인서</button></td>
                                    </tr>)}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </div>
            </div>
            <AdmDiagCheckModal diagCheckModalIsOpen={diagCheckModalIsOpen} openDiagCheckModal={openDiagCheckModal} docDiagNum={docDiagNum} firstDiagDate={firstDiagDate} getCurrentDate={getCurrentDate}/>
            <AdmDischargeCheckModal admCheckModalIsOpen={admCheckModalIsOpen} openAdmCheckModal={openAdmCheckModal} admNum={admNum} getCurrentDate={getCurrentDate} />
        </div>
    );
}

export default AdmPatientStorage;