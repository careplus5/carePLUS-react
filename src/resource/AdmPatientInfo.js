import { url } from '../config';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AmdPatientStorage from './AdmPatientStorage';  // 기타문서
import AmdPatientSurgeryDue from './AdmPatientSurgeryDue';  // 수술 
import AdmPatientAdmmission from './AdmPatientAdmmission';  // 입원
import AmdPatientDischarge from './AdmPatientDischarge';  // 청구서
import AmdPatientPrescription from './AdmPatientPrescription';  // 처방전 발급
import AdmDiagnosisDue from './AdmDiagnosisDue'; // 진료 예약 ?
import AmdPatientTest from './AdmPatientTest';  // 검사

const AdmPatientInfo = () => {
    const [type, setType] = useState('');
    const [keyword, setKeyword] = useState('');

    // 버튼에 해당 파라미터 넘겨주기 위해 설정
    const [patient, setPatient] = useState([]);
    const [selPatient, setSelPatient] = useState(null);
    const [menuIdx, setMenuIdx] = useState(0);
    const [prescriptionList, setPrescriptionList] = useState([]);
    const [admissionDto, setAdmissionDto] = useState('');
    // 기타문서 발급
    const [patientDto, setPatientDto] = useState([]);

    // 검색 조건 -> 검색바
    const queryList = () => {
        if (type.trim() === '' || keyword.trim() === '') {
            alert('검색조건을 입력하세요');
            return;
        }
        axios.post(`${url}/patientSearch`, { type: type, keyword: keyword })
            .then(res => {
                setPatient([...res.data]);
            })
            .catch(err => {
                alert("환자 조회 에러");
            });
    }

    // 버튼을 통한 컨트롤 구현 (1이면 진로예약, 2면 검사예약 ....)
    const patientClick = (patient) => {
        setSelPatient(patient);
        if(menuIdx===1) {  // 진료예약
            
        } else if(menuIdx===2) {  // 검사예약

        } else if(menuIdx===3) {  // 입원예약
        } else if(menuIdx===4) {  // 수술예약 
        } else if(menuIdx===5) {  // 처방전 발급
            axios.get(`${url}/patNumPrescriptionList?patNum=${patient.patNum}`)
            .then(res => {
                setPrescriptionList([...res.data]);
            })
            .catch(err => {
                alert('조회에러')
            })
        } else if(menuIdx===6) {  // 기타 문서 발급
            // axios.get(`http://locathost:8090/patientStorageList?patNum=${patient.patNum}`)
            //         .then(res => {
            //             setPatientDto([...res.data]);
            //         })
            //         .catch(err => {
            //             alert('조회오류');
            //         })
        } else if(menuIdx===7) {  // 퇴원
            // axios.get(`http://localhost:8090/patientAdmissionState?patNum=${patient.patNum}`)
            //     .then(res => {
            //         setAdmissionDto(res.data); 
            //         ;
            //     })
            //     .catch(err => {
            //         alert('조회에러');
            //     })
        }
        console.log(patient)

    }

    return (
        <div id="background" >
            <div id="AdmLbox">
                <br />
                <div>
                    <img id="boxIcon" alt='' style={{ marginTop: "5px", marginLeft: "40px", height:'40px' }} src="./img/notice.png" />
                    <h3 id="LboxHeader">환자 목록
                    </h3>
                </div>
                <br/><div className="searchLine" style={{marginLeft:'35px'}}>
                    <select id="admPatientSearchKeywordSort" name="type" onChange={(e) => setType(e.target.value)}>
                        <option>구분</option>
                        <option value={"patNum"}>환자 번호</option>
                        <option value={"patName"}>환자 이름</option>
                        <option value={"patJumin"}>주민등록번호</option>
                    </select>
                    &nbsp;|&nbsp;
                    <input type="text" placeholder=' 검색...' style={{ padding: "10px", border: "none", width: '300px', borderRadius: '10px' }} name='keyword' onChange={(e) => setKeyword(e.target.value)} />
                    <button style={{ backgroundColor: 'transparent', marginLeft: "-35px", padding: "10px", border: "none", width: "30px", height: "30px", backgroundImage: "url('/img/search.png')" }} onClick={queryList} />
                </div>
                <br />
                <br />
                <br /><br />

                {/* <div className='pat-scroll'> */}
                <table className="admPatientList" style={{ marginLeft:'35px', width: '94%', tableLayout: 'fixed', maxHeight: '200%', overflow: "scroll" }}>
                    <thead style={{textAlign:'center'}}>
                        <tr style={{ position: 'sticky', height: '50px', top: 0, backgroundColor: '#FFFDF8', zIndex: 1, borderBottom: '1px solid black' }}>
                            <th>환자 번호</th>
                            <th>환자 이름</th>
                            <th>환자 주민등록번호</th>
                            <th>환자 성별</th>
                            <th>환자 주소</th>
                            <th>환자 혈액형</th>
                            <th>환자 전화번호</th>
                            <th>환자 몸무게</th>
                            <th>환자 키</th>
                            <th>환자 과거병력</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patient.map((item) => (
                            <tr key={item.patNum} style={{ height: "35px", textAlign:'center' }} onClick={() => patientClick(item)}>
                                <td>{item.patNum}</td>
                                <td>{item.patName}</td>
                                <td>{item.patJumin}</td>
                                <td>{item.patGender}</td>
                                <td>{item.patAddress}</td>
                                <td>{item.patBloodType}</td>
                                <td>{item.patTel}</td>
                                <td>{item.patWeight}</td>
                                <td>{item.patHeight}</td>
                                <td>{item.patHistory}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ marginTop: '350px', marginLeft:'35px' }}>
                    <button style={{backgroundColor:'lightgray',marginRight:"10px", height:'45px'}} className='admControllButton' onClick={() => setMenuIdx(1)}>진료예약</button>
                    <button style={{backgroundColor:'lightgray',marginRight:"10px", height:'45px'}} className='admControllButton' onClick={() => setMenuIdx(2)}>검사</button>
                    <button style={{backgroundColor:'lightgray',marginRight:"10px", height:'45px'}} className='admControllButton' onClick={() => setMenuIdx(3)}>입원</button>
                    <button style={{backgroundColor:'lightgray',marginRight:"10px", height:'45px'}} className='admControllButton' onClick={() => setMenuIdx(4)}>수술</button>
                    <button style={{backgroundColor:'lightgray',marginRight:"10px", height:'45px'}} className='admControllButton' onClick={() => setMenuIdx(5)}>처방전발급</button>
                    <button style={{backgroundColor:'lightgray',marginRight:"10px", height:'45px'}} className='admControllButton' onClick={() => setMenuIdx(6)}>기타문서발급</button>
                    <button style={{backgroundColor:'lightgray',marginRight:"10px", height:'45px'}} className='admControllButton' onClick={() => setMenuIdx(7)}>퇴원</button>
                    <hr></hr>
                </div>
                {menuIdx === 1 && <AdmDiagnosisDue patient={selPatient} />}
                {menuIdx === 2 && <AmdPatientTest patient={selPatient} />}
                {menuIdx === 3 && <AdmPatientAdmmission patient={selPatient} />}
                {menuIdx === 4 && <AmdPatientSurgeryDue patient={selPatient} />}
                {menuIdx === 5 && <AmdPatientPrescription prescriptionList={prescriptionList} />}
                {menuIdx === 6 && <AmdPatientStorage patient={selPatient} />}
                {menuIdx === 7 && <AmdPatientDischarge patient={selPatient} />}
                
            </div>
        </div>
    );
}
export default AdmPatientInfo;