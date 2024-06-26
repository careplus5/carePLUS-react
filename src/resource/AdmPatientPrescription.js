import { url } from "../config";
import { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import { Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from "axios";

// 처방전 발급
const AdmPatientPrescription = ({patNum, patients}) => {
    const printRef = useRef();
    console.log("next patNum:"+patNum);
    const patient = patNum;
    console.log(patients);
    const patInfo = patients;
    console.log(patInfo);
     const [prescriptionList, setPrescriptionList] = useState([]);
    const [prescription, setPrescription] = useState('');
    const [selectedDate, setSelectedDate] = useState();  // 교부년월일
    // 모달 (부서에 대한 정보 검색)

    const [prescCheckModalIsOpen,setPrescCheckModalIsOpen] = useState(false);

    // 모달 오픈
    const openPatientPrescriptionModal = (prescription) => {
        setPrescCheckModalIsOpen(true);
        setPrescription(prescription);
        console.log("modal's content:"+JSON.stringify(prescription));

    }

    const closedPatientPrescriptionModal = ()=>{
        setPrescCheckModalIsOpen(false);
        setPrescription('');
    }
    // 해당 환자의 처방전 리스트
    useEffect(()=>{
        axios.post(`${url}/patNumPrescriptionList`,{patNum:patient})
        .then(res => {
            console.log("관련 데이터는;"+JSON.stringify(res));
            setPrescriptionList(res.data); // 데이터를 prescriptionList에 설정
        })
        .catch(err => {
            console.log(patNum+"이 왜 조회안될까염?");
        },[])
    },[patNum])
    
    const getPrescriptionList = () => {
        axios.post(`${url}/patPrescription`,{patNum:patient})
        .then(res=>{
            console.log("이 처방전의 약품 리스트일까요? "+res);
        })
        .catch(err=>{
            console.log(err);
        })
    }


    return (
            <div className="" style={{ marginLeft: "35px", paddingBottom: "34px" }}>
                <div className="LboxHeader" style={{ display: 'flex', margin: '15px -5px' }}>
                <img id="boxIcon" style={{ marginTop: '15px', marginLeft: '15px', height: '25px' }} src="./img/document.png" />
                <h3 className="admPat-boxHeader">처방전발급</h3>
            </div>
            <br />
            <div style={{marginLeft:'145px', marginTop:'-25px'}}>
                    <span >환자번호</span>
                    <input type="text" name='patNum' value={patInfo.patNum}
                        className='admInputStyle' style={{width:"90px"}} disabled/>
                    <span style={{ marginLeft: "20px" }}>주민등록번호</span>
                    <input type="text" disabled value={patInfo.patJumin}
                        className='admInputStyle'/>
                    <span style={{ marginLeft: "20px" }}>이름</span>
                    <input type="text" disabled  value={patInfo && patInfo.patName}
                        className='admInputStyle' style={{width:"90px"}}/>
                    <span style={{ marginLeft: "20px" }}>성별</span>
                    <input type="text" disabled value={patInfo && patInfo.patGender}
                        className='admInputStyle' style={{width:"45px"}}/>
                    <span style={{ marginLeft: "20px" }}>전화번호</span>
                    <input type="text" disabled value={patInfo && patInfo.patTel}
                        className='admInputStyle'/>
                        </div>
            <br/>
            <div className="prescScrollBox">
                            <Table bordered style={{ textAlign: 'center', backgroundColor:'#fbf9f2', width:'95%', marginLeft:'20px' }}>
                                <thead>
                                    <tr>
                                        <th>환자 이름</th>
                                        <th>처방전 번호</th>
                                        <th>처방전 발급일</th>
                                        <th>처방 발급 상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prescriptionList.map(prescription => 
                                    <tr>
                                        <td>{prescription.patName}</td>
                                        <td>{prescription.prescription.prescriptionNum}</td>
                                        <td>{prescription.prescription.prescriptionDate}</td>
                                        <td><button style={{ backgroundColor: 'black' }} onClick={() => openPatientPrescriptionModal(prescription.prescription)}>발급</button></td>
                                    </tr>)}
                                </tbody>
                            </Table>
                        </div>
            {/* 처방전 */}
            <Modal isOpen={prescCheckModalIsOpen} toggle={closedPatientPrescriptionModal} style={{maxWidth:"629px"}}>
                <div className="prescriptionBackground" ref={printRef}>
                <div className="empty"></div>
                                        <div id="presInfo">
                                            <p id="prescDate">{prescription.prescriptionDate}</p><br/>
                                            <p id="prescName">{patInfo.patName}</p><br/>
                                            <p id="prescJumin">{patInfo.patJumin}</p>
                                            </div>
                                            <div className="empty" style={{height:"102px"}}></div>
                                            <table className="medList" borderless>
                                        <thead>
                                            <tr id="listTop">
                                                <td>처방 의약품의 명칭 및 코드</td>
                                                <td>1회 투약량</td>
                                                <td>1일 투여 횟수</td>
                                                <td>총 투약 일수</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr id="listContent">
                                                <td>{prescription.medicineNum}</td>
                                                <td>{prescription.prescriptionDosage}</td>
                                                <td>{prescription.prescriptionDosageTimes}</td>
                                                <td>{prescription.prescriptionDosageTotal}</td>
                                            </tr>
                                        </tbody>

                                            </table>
                </div>
               <button style={{width:"230px",margin:"0 auto",color:"black"}} onClick={closedPatientPrescriptionModal}>닫기</button>
                <ReactToPrint
                    trigger={() => <button className="printButton">프린트</button>}
                    content={() => printRef.current
                    }
                    pageStyle="@page { size: A4; margin: 20mm; } body { -webkit-print-color-adjust: exact; width: 210mm; height: 297mm; display: flex; justify-content: center; align-items: center; }"
                />
            </Modal>
        </div>

    )
}

export default AdmPatientPrescription;