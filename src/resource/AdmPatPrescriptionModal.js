import React, { useState, useEffect } from 'react';
import '../css/AdmDiagCheckModal.css';
import axios from 'axios';
import { url } from '../config';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const AdmDischargeCheckModal = ({admCheckModalIsOpen, openAdmCheckModal, admNum, getCurrentDate}) => {

    const [admCheckInfo, setAdmCheckInfo] = useState({
        admissionDate:'', admissionDischargeDate:'', admPeriod:'', docName:'',
        patName:'', patGender:'', patJumin:'', patTel:'', patAddress:'', deptName:'',
        admissionRecordDate:'', admissionRecordContent:'', diseaseName:''
    });
    const [admDiagList, setAdmDiagList] = useState([]);

    useEffect(()=>{
        axios.get(`${url}/patAdmCheckInfo?admNum=${admNum}`)
            .then(res=>{
                setAdmCheckInfo({...res.data});
            })
            .catch(err=>{
                console.log(err);
            })

        axios.get(`${url}/patAdmDiagList?admNum=${admNum}`)
            .then(res=>{
                setAdmDiagList([...res.data]);
            })
            .catch(err=>{
                console.log(err);
            })
    }, [admNum])

    return (
        <Modal isOpen={admCheckModalIsOpen} toggle={openAdmCheckModal} style={{ maxWidth: "850px" }}>
            <ModalBody className='diagCheckModalBody'>
                <div style={{ display: "flex" }}>
                    <div className='diagCheckContainer'>
                        <div className='diagCheckTitle'>입 · 퇴 원 확 인 서</div>
                        <table className="diagCheckFormat" border='1' style={{ padding: "var(--bs-modal-padding)", width: "95%", marginBottom:'20px' }}>
                            <tbody>
                                <tr>
                                    <td colSpan='6' className='diagCheckContentTitle'>1. 입원기간 </td>
                                </tr>
                                <tr>
                                    <td style={{width:'15%'}}>입원일자</td>
                                    <td style={{width:'15%'}}>{admCheckInfo.admissionDate}</td>
                                    <td style={{width:'15%'}}>퇴원일자</td>
                                    <td style={{width:'15%'}}>{admCheckInfo.admissionDischargeDate}</td>
                                    <td style={{width:'15%'}}>입원기간</td>
                                    <td>{admCheckInfo.admPeriod}일</td>
                                </tr>
                                <tr>
                                    <td colSpan='6' className='diagCheckContentTitle'>2. 환자 인적사항 </td>
                                </tr>
                                <tr>
                                    <td style={{width:'15%'}}>성명</td>
                                    <td style={{width:'15%'}}>{admCheckInfo.patName}</td>
                                    <td style={{width:'15%'}}>성별</td>
                                    <td style={{width:'15%'}}>{admCheckInfo.patGender}</td>
                                    <td style={{width:'15%'}}>주민등록번호</td>
                                    <td>{admCheckInfo.patJumin}</td>
                                </tr>
                                <tr>
                                    <td>전화번호</td>
                                    <td colSpan='2'>{admCheckInfo.patTel}</td>
                                    <td>주소</td>
                                    <td colSpan='2'>{admCheckInfo.patAddress}</td>
                                </tr>
                                <tr>
                                    <td colSpan='6' className='diagCheckContentTitle'>3. 입원내용</td>
                                </tr>
                                <tr>
                                    <td colSpan='1'>진료일자</td>
                                    <td colSpan='1'>진료과</td>
                                    <td colSpan='4'>진료이력</td>
                                </tr>
                                {admDiagList.length === 0 ? (
                                    <tr>
                                        <td colSpan='6'>
                                            진료 내역이 존재하지 않습니다
                                        </td>
                                    </tr>
                                ) : 
                                (admDiagList.map(admDiag => 
                                <tr key={admDiag.admRecordNum}>
                                    <td colSpan='1'>{admDiag.diagDate}</td>
                                    <td colSpan='1'>{admDiag.deptName}</td>
                                    <td colSpan='4'className='longTdHidden'>진단병명: ({admDiag.diseaseName}) / 진단내용: {admDiag.admRecord}</td>
                                </tr>))}
                                <tr>
                                    <td colSpan='6'>
                                        <div style={{padding:'40px'}}>
                                            <div style={{paddingBottom:'35px'}}>위 입원 대상자에 대해여 위와 같이 입·퇴원하였음을 확인합니다.</div>
                                            <div style={{float:'right', textAlign:'left', margin:'35px 0 40px 0'}}>
                                                <div style={{marginBottom:'5px'}}>{getCurrentDate()}</div>
                                                <div style={{marginBottom:'5px'}}>
                                                    <label style={{marginRight:'20px'}}>병원명</label>케어플러스
                                                </div>
                                                <div style={{marginBottom:'5px', display:'flex'}}>
                                                    <label style={{marginRight:'20px'}}>의사명</label>{admCheckInfo.docName}
                                                    <div style={{marginLeft:'50px'}}>(인)<img className='docStampStyle' src='./img/docStamp.png'/></div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default AdmDischargeCheckModal;