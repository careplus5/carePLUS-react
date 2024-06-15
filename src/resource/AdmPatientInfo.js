import { useState, useEffect } from 'react';
// 스크롤 관련 (npm-install-scroll-component)
import InfiniteScroll from 'react-infinite-scroll-component';
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

    const [patient, setPatient] = useState([]);
    const [selPatient, setSelPatient] = useState(null);
    const [menuIdx, setMenuIdx] = useState(0);

    // 환자 리스트 보기 + 스크롤
    useEffect(() => {

    }, [])

    const queryList = () => {
        if (type.trim() === '' || keyword.trim() === '') {
            alert('검색조건을 입력하세요');
            return;
        }
        axios.post('http://localhost:8090/patientSearch', { type: type, keyword: keyword })
            .then(res => {
                setPatient([...res.data]);
            })
            .catch(err => {
                alert("환자 조회 에러");
            });
    }

    return (
        <div id="background" >
            <div id="AdmLbox">
                <br />
                <div>
                    <img id="boxIcon" style={{ marginTop: "5px", marginLeft: "40px", height:'40px' }} src="./img/notice.png" />
                    <h3 id="LboxHeader">환자 목록
                    </h3>
                </div>
                <div className="searchLine">
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
                <table className="admPatientList" style={{ width: '100%', tableLayout: 'fixed', maxHeight: '200%', overflow: "scroll" }}>
                    <thead >
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
                            <tr key={item.patNum} style={{ height: "35px" }} onClick={() => setSelPatient(item)}>
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

                <div style={{ marginTop: '350px' }}>
                    <button className='admControllButton' onClick={() => setMenuIdx(1)}>진료예약</button>
                    <button onClick={() => setMenuIdx(2)}>검사</button>
                    <button onClick={() => setMenuIdx(3)}>입원</button>
                    <button onClick={() => setMenuIdx(4)}>수술</button>
                    <button onClick={() => setMenuIdx(5)}>처방전발급</button>
                    <button onClick={() => setMenuIdx(6)}>기타문서발급</button>
                    <button onClick={() => setMenuIdx(7)}>퇴원</button>
                    <hr></hr>
                </div>
                {menuIdx === 1 && <AdmDiagnosisDue patient={selPatient} />}
                {menuIdx === 2 && <AmdPatientTest patient={selPatient} />}
                {menuIdx === 3 && <AdmPatientAdmmission patient={selPatient} />}
                {menuIdx === 4 && <AmdPatientSurgeryDue patient={selPatient} />}
                {menuIdx === 5 && <AmdPatientPrescription patient={selPatient} />}
                {menuIdx === 6 && <AmdPatientStorage patient={selPatient} />}
                {menuIdx === 7 && <AmdPatientDischarge patient={selPatient} />}
            </div>
        </div>
    );
}
export default AdmPatientInfo;