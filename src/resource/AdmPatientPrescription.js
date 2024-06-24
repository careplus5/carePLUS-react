import { url } from "../config";
import { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from "axios";

// 처방전 발급
const AdmPatientPrescription = ({ prescriptionList }) => {

    const [prescription, setPrescription] = useState('');
    const [selectedDate, setSelectedDate] = useState();  // 교부년월일
    // 모달 (부서에 대한 정보 검색)
    const [admDiagDuedisModalIsOpen, setAdmDiagDuedisModalIsOpen] = useState(false);

    // 모달 오픈
    const openPatientPrescriptionModal = (prescriptionNum) => {
        setAdmDiagDuedisModalIsOpen(true);

    }
    // 해당 환자의 처방전 조회함수 
    useState(() => {
        axios.get(`${url}/patNumPrescriptionList`,{params:{
            patNum:patient.patNum
        }})
            .then(res => {
                setPrescription(res.data);
            })
            .catch(err => {
                setPrescription();
            })
    })
    // 환자(patient), 의사(doctor), 질병(disease), 의약품(medicine)

    return (
        <div id="LaccordionBox">
            <div className="boxHeader" style={{ marginTop: '30px', marginLeft: "35px" }} >
                <img id="boxIcon" style={{ width: "40px", height: "40px" }} src="./img/document.png" />&nbsp;
                <h3 id="LboxHeader" style={{ marginRight: "115px" }}>처방전 발급</h3>
            </div>
            <br />
            <ul className="admPrescriptionList" style={{marginLeft:'175px'}}>
                {prescriptionList.map((prescription) => (
                    <li key={prescription.prescriptionNum} className='admPatientPrescription-item'>
                        <div className="patientPrescription-info" onClick={openPatientPrescriptionModal}>
                            <p>처방 번호 : {prescription.prescriptionNum}</p>
                            <p>환자 이름 : {prescription.patNum}</p>
                            <p>처방 일자 : {prescription.prescriptionDate}</p>
                        </div>
                    </li>
                ))}
            </ul>

            {/* 처방전 */}
            <Modal isOpen={admDiagDuedisModalIsOpen} toggle={openPatientPrescriptionModal} className="modal-content">
                <ModalHeader toggle={openPatientPrescriptionModal} className='AdmModalTitle'>
                    <h1 style={{ textAlign: "center", marginTop: "100px" }}>&nbsp;처&nbsp;&nbsp;방&nbsp;&nbsp;전&nbsp;</h1>
                </ModalHeader>
                <ModalBody>
                    <button onClick={(e) => setAdmDiagDuedisModalIsOpen(false)}>pre</button><button >next</button>
                    <div >
                        <span>의료보험 [&nbsp;&nbsp;]</span>&nbsp;&nbsp;<span>의료보호 [&nbsp;&nbsp;]</span>&nbsp;&nbsp;
                        <span>산재보험 [&nbsp;&nbsp;]</span>&nbsp;&nbsp;<span>자동차보험 [&nbsp;&nbsp;]</span>&nbsp;&nbsp;
                        <span>기타 ( &nbsp;&nbsp; )</span>&nbsp;&nbsp;<span>요양기관기호 : </span>
                        <table className="tcTable" border="1" cellSpacing="0" style={{ fontSize: "20px" }}>
                            <tr>
                                <td style={{ textAlign: "center", fontSize: "20px" }} colSpan="2">
                                    교부 연월일<br />
                                    및 번호
                                </td>
                                <td colSpan="2">(교부연월일)</td>
                                <td rowSpan="4" style={{ textAlign: "center", fontSize: "20px", width: "70px" }}>
                                    <div>의</div>
                                    <div>료</div>
                                    <div>기</div>
                                    <div>관</div>
                                </td>
                                <td>명칭</td>
                                <td>케어플러스</td>
                            </tr>
                            <tr>
                                <td rowSpan="3" style={{ textAlign: "center", fontSize: "20px" }}>
                                    <div>환</div>
                                    <div>자</div>
                                </td>
                                <td style={{ textAlign: "center", width: "130px" }}> 성 명 </td>
                                <td colSpan="2">(patient.patNum)</td>
                                <td>전화번호</td>
                                <td>031-1111-2222</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "center", width: "130px" }}> 주민등록번호 </td>
                                <td colSpan="2">(patient.patJumin)</td>
                                <td>팩스번호</td>
                                <td>031-111-2222</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: "center", width: "130px" }}>연락처</td>
                                <td colSpan="2">(patient.patTel)</td>
                                <td>e-mail주소</td>
                                <td>careplue@kosta.kr</td>
                            </tr>
                            <tr>
                                <td style={{ textAlign: 'center' }}>
                                    질병<br />
                                    분류<br />
                                    기호
                                </td>
                                <td>
                                    (disease.dieaseNum)<br />
                                    (disease.dieaseName)
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    처&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;방<br />
                                    의료인의<br />
                                    성&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;명
                                </td>
                                <td>(doctor.docName)</td>
                                <td style={{ textAlign: 'center' }}>진료과</td>
                                <td colSpan="2">(doctor.departmentName)</td>
                            </tr>
                            <tr>
                                <td colSpan="7" style={{ height: "60px", textAlign: "center" }}>
                                    * 환자의 요구가 있을 때에는 질병분류기호를 기재하지 아니합니다.
                                </td>
                            </tr>
                            <tr style={{ fontSize: "15px", height: "70px" }}>
                                <th colSpan="3"> 처방 의약품의 명칭 및 코드 </th>
                                <th>1회 투여랑</th>
                                <th>1일 투여횟수</th>
                                <th>총 투약일수</th>

                                <th>용법</th>
                            </tr>
                            <tr style={{ textAlign: "center", fontSize: "15px" }}>
                                <th colSpan="3">(medicine.medicineNum + medicine.medicineName)</th>
                                <th>(prescription.prescriptionDosage)</th>
                                <th>(prescription.prescriptionDosageTime)</th>
                                <th>(prescription.prescriptionDosageTotal)</th>
                                <th>(prescription.prescriptionHowTake)</th>

                            </tr>
                            {/* <tr style={{ textAlign: "center", fontSize:"15px"}}>
                        <td colSpan="6">주사제 처방내역(원내조제&nbsp;&nbsp;[&nbsp;&nbsp;&nbsp;], &nbsp;&nbsp;&nbsp;원외처방&nbsp;&nbsp;[&nbsp;&nbsp;&nbsp;])</td>
                        <td style={{fontSize:"10px"}}>조제시 참고사항</td>
                    </tr> */}
                            <tr style={{ textAlign: "center", fontSize: "15px" }}>
                                <th colSpan="3">(medicine.medicineNum + medicine.medicineName)</th>
                                <th>(prescription.prescriptionDosage)</th>
                                <th>(prescription.prescriptionDosageTime)</th>
                                <th>(prescription.prescriptionDosageTotal)</th>
                                <th>(prescription.prescriptionHowTake)</th>
                            </tr>
                            {/* <tr style={{fontSize:"15px"}}>
                        <td>사용기간</td>
                        <td colSpan="2">교부일부터&nbsp;&nbsp;(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)일간</td>
                        <td colSpan="4">사용기간에 약국에 제출하여야 합니다.</td>
                    </tr> */}
                            {/* <tr style={{ textAlign: "center", fontSize:"15px"}}>
                        <td colSpan="7">의약품 조제내역</td>
                    </tr> */}
                            <tr>
                                <td rowSpan="4" style={{ textAlign: 'center' }}>조제<br />내역</td>
                                <td>조제기관의 명칭</td>
                                <td colSpan="3">케어플러스(주)</td>
                                <td colSpan="2" style={{ textAlign: 'center' }}>처방의 변경 · 수정 · 확인 · 대체시 그 내용 등</td>
                            </tr>
                            <tr>
                                <td>조제약사</td>
                                <td colSpan="3">
                                    <span>&nbsp;&nbsp;성명 : </span>
                                    <span>류선재&nbsp;&nbsp;</span>
                                    <span>(서명 또는 날인)</span>
                                </td>
                                <td colSpan="2" rowSpan="3"></td>
                            </tr>
                            <tr>
                                <td>조제일수</td>
                                <td colSpan="3">(prescription.prescriptionDosageTotal)</td>
                            </tr>
                            <tr>
                                <td>조제연월일</td>
                                <td colSpan="3">(prescription.prescriptionDate)</td>
                            </tr>
                        </table>
                    </div>
                </ModalBody>
            </Modal>
        </div>

    )
}

export default AdmPatientPrescription;