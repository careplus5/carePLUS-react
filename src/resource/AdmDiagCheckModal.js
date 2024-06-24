import React, { useState, useEffect } from 'react';
import '../css/AdmDiagCheckModal.css';
import axios from 'axios';
import { url } from '../config';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const AdmDiagCheckModal = ({diagCheckModalIsOpen, openDiagCheckModal, docDiagNum, firstDiagDate, getCurrentDate}) => {

    const [diagCheckInfo, setDiagCheckInfo] = useState({
        patName:'', patGender:'', patJumin:'', patTel:'', patAddress:'', deptName:'', firstDiagDate:'', 
        docDiagnosisKind:'', docDiagnosisDate:'', diseaseNum:'', diseaseName:'', patHistory:'', docDiagnosisContent:'', docName:''
    });

    useEffect(()=>{
        axios.get(`${url}/patDiagCheckInfo?docDiagNum=${docDiagNum}`)
            .then(res=>{
                setDiagCheckInfo({...res.data});
            })
            .catch(err=>{
                console.log(err);
            })
    }, [docDiagNum])

    return (
        <Modal isOpen={diagCheckModalIsOpen} toggle={openDiagCheckModal} style={{ maxWidth: "850px" }}>
            {/* <ModalHeader toggle={openDiagCheckModal} className='modalTitle'>진료확인서</ModalHeader> */}
            <ModalBody className='diagCheckModalBody'>
                <div style={{ display: "flex" }}>
                    <div className='diagCheckContainer'>
                        <div className='diagCheckTitle'>진 료 확 인 서</div>
                        <table className="diagCheckFormat" border='1' style={{ padding: "var(--bs-modal-padding)", width: "95%", marginBottom:'20px' }}>
                            <tbody>
                                <tr>
                                    <td colSpan='6' className='diagCheckContentTitle'>1. 환자 인적사항</td>
                                </tr>
                                <tr>
                                    <td style={{width:'15%'}}>성명</td>
                                    <td style={{width:'15%'}}>{diagCheckInfo.patName}</td>
                                    <td style={{width:'15%'}}>성별</td>
                                    <td style={{width:'15%'}}>{diagCheckInfo.patGender}</td>
                                    <td style={{width:'15%'}}>주민등록번호</td>
                                    <td>{diagCheckInfo.patJumin}</td>
                                </tr>
                                <tr>
                                    <td>전화번호</td>
                                    <td colSpan='2'>{diagCheckInfo.patTel}</td>
                                    <td>주소</td>
                                    <td colSpan='2'>{diagCheckInfo.patAddress}</td>
                                </tr>
                                <tr>
                                    <td colSpan='6' className='diagCheckContentTitle'>2. 진료사항</td>
                                </tr>
                                <tr>
                                    <td>진료과</td>
                                    <td>{diagCheckInfo.deptName}</td>
                                    <td>초진일자</td>
                                    <td>{firstDiagDate}</td>
                                    <td>진료종류</td>
                                    <td>
                                        {diagCheckInfo.docDiagnosisKind === 'diag' ? '외래' : 
                                        diagCheckInfo.docDiagnosisKind === 'adm' ? '입원' :
                                        diagCheckInfo.docDiagnosisKind}
                                    </td>
                                </tr>
                                <tr>
                                    <td>진단일자</td>
                                    <td>{diagCheckInfo.docDiagnosisDate}</td>
                                    <td>질병 분류번호</td>
                                    <td>{diagCheckInfo.diseaseNum}</td>
                                    <td>진단병명</td>
                                    <td>{diagCheckInfo.diseaseName}</td>
                                </tr>
                                <tr>
                                    <td style={{height:'80px'}}>과거병력<br/>(치료병원)</td>
                                    <td colSpan='5' className='diagCheckBigContent'>{diagCheckInfo.patHistory}</td>
                                </tr>
                                <tr>
                                    <td style={{height:'100px'}}>진단내용<br/>(주요소견)</td>
                                    <td colSpan='5' className='diagCheckBigContent'>{diagCheckInfo.docDiagnosisContent}</td>
                                </tr>
                                <tr>
                                    <td colSpan='6'>
                                        <div style={{padding:'40px'}}>
                                            <div style={{paddingBottom:'35px'}}>위 진료 대상자에 대해여 위와 같이 진료하였음을 확인합니다.</div>
                                            <div style={{float:'right', textAlign:'left', margin:'35px 0 40px 0'}}>
                                                <div style={{marginBottom:'5px'}}>{getCurrentDate()}</div>
                                                <div style={{marginBottom:'5px'}}>
                                                    <label style={{marginRight:'20px'}}>병원명</label>케어플러스
                                                </div>
                                                <div style={{marginBottom:'5px', display:'flex'}}>
                                                    <label style={{marginRight:'20px'}}>의사명</label>{diagCheckInfo.docName}
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

export default AdmDiagCheckModal;