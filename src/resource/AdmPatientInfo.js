import { url } from '../config';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AdmPatientStorage from './AdmPatientStorage';  // 기타문서
import AdmPatientSurgeryDue from './AdmPatientSurgeryDue';  // 수술 
import AdmPatientAdmmission from './AdmPatientAdmmission';  // 입원
import AdmPatientDischarge from './AdmPatientDischarge';  // 청구서
import AdmPatientPrescription from './AdmPatientPrescription';  // 처방전 발급
import AdmDiagnosisDue from './AdmDiagnosisDue'; // 진료 예약 ?
import '../css/Adm.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import AdmPatientTest from './AdmPatientTest';

const AdmPatientInfo = (props) => {
    const [type, setType] = useState('');
    const [keyword, setKeyword] = useState('');

    // 버튼에 해당 파라미터 넘겨주기 위해 설정
    const [patNum, setPatNum] = useState('');
    const [nextPatNum, setNextPatNum] = useState('');
    const [patient, setPatient] = useState([]);
    const [selPatient, setSelPatient] = useState(null);
    const [menuIdx, setMenuIdx] = useState(0);
    const [prescription, setPrescription] = useState('');
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
                setPatient([]);
            });
    }

    // 버튼을 통한 컨트롤 구현 (1이면 진로예약, 2면 검사예약 ....)
    const patientClick = (patient) => {
        console.log("patient info:"+JSON.stringify(patient));
        setPatNum(patient.patNum);
        setSelPatient(patient);
        
        if (menuIdx === 1) {  // 진료예약

        } else if (menuIdx === 2) {  // 검사예약

        } else if (menuIdx === 3) {  // 입원예약
        } else if (menuIdx === 4) {  // 수술예약 
        } else if (menuIdx === 5) {  // 처방전 발급
            // axios.get(`${url}/patNumPrescriptionList?patNum=${patient.patNum}`)
            //     .then(res => {
            //         setPrescriptionList([...res.data]);
            //     })
            //     .catch(err => {
            //         alert('조회에러')
            //     })
        } else if (menuIdx === 6) {  // 기타 문서 발급
            // axios.get(`http://locathost:8090/patientStorageList?patNum=${patient.patNum}`)
            //         .then(res => {
            //             setPatientDto([...res.data]);
            //         })
            //         .catch(err => {
            //             alert('조회오류');
            //         })
        } else if (menuIdx === 7) {  // 퇴원
            // axios.get(`http://localhost:8090/patientAdmissionState?patNum=${patient.patNum}`)
            //     .then(res => {
            //         setAdmissionDto(res.data); 
            //         ;
            //     })
            //     .catch(err => {
            //         alert('조회에러');
            //     })
        }

    }
    // Tab 메뉴
    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    }
    const menu1Click = () => {
        toggle('1');
        setMenuIdx(1);
    }
    const menu2Click = () => {
        toggle('2');
        setMenuIdx(2);
    }
    const menu3Click = () => {
        toggle('3');
        setMenuIdx(3);
    }
    const menu4Click = () => {
        toggle('4');
        setMenuIdx(4);
    }
    const menu5Click = () => {
        toggle('5');
        setMenuIdx(5);
    }
    const menu6Click = () => {
        toggle('6');
        setMenuIdx(6);
    }

    return (
        <div className="background" >
            <div id="Lbox" style={{ backgroundColor: "#FFFDF8" }}>
                <div className="LboxHeader" style={{ display: 'flex' }}>
                    <img id="boxIcon" style={{ marginTop: "15px", marginLeft: "15px" }} src="./img/notice.png" />
                    <h3 className="docPat-boxHeader">환자 목록</h3>
                </div>
                <div className="searchLine" style={{display:'flex', marginBottom:'20px'}}>
                    <div className="admPatSearchbar">
                        <select className="admPatKeywordSort" name="type" onChange={(e) => setType(e.target.value)}>
                            <option>구분</option>
                            <option value={"patNum"}>환자 번호</option>
                            <option value={"patName"}>환자 이름</option>
                            <option value={"patJumin"}>주민등록번호</option>
                        </select> |
                        <input type="text" id="keyword" placeholder=' 검색...' style={{ width: "480px", backgroundColor: "#f7f7f7", paddingLeft: "20px" }} name='keyword' onChange={(e) => setKeyword(e.target.value)} />
                        <label class="admPatSearchButton" for="searchButton1" style={{ marginTop: "5px" }}>
                            <button id="searchButton1" onClick={queryList}></button>
                        </label>
                    </div>
                </div>
                <div className='admPatListScroll'>
                    <table className="admPatientList" style={{ marginLeft: '40px', width: '95%' }}>
                        <tbody style={{ textAlign: 'center' }}>
                            <tr style={{height: '40px'}}>
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
                            {patient.length === 0 ? (
                                <tr>
                                    <td className='preInputStyle' colSpan='10'>검색 조건에 맞는 환자가 존재하지 않습니다</td>
                                </tr>
                            ) : (
                            patient.map((item) => (
                                <tr key={item.patNum} className='admDiagTrHover' style={{ height: "35px", textAlign: 'center' }} onClick={() => patientClick(item)}>
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
                            )))}
                        </tbody>
                    </table>
                </div>

                <div style={{ marginTop: '50px', marginLeft: '35px' }}>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: activeTab === '1' })} onClick={menu1Click}
                                style={{ color: activeTab === '1' ? '#427889' : 'black', cursor:'pointer' }}>진료예약</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: activeTab === '2' })} onClick={menu2Click}
                                style={{ color: activeTab === '2' ? '#427889' : 'black', cursor:'pointer' }}>검사</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: activeTab === '3' })} onClick={menu3Click}
                                style={{ color: activeTab === '3' ? '#427889' : 'black', cursor:'pointer' }}>입원</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: activeTab === '4' })} onClick={menu4Click}
                                style={{ color: activeTab === '4' ? '#427889' : 'black', cursor:'pointer' }}>수술</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: activeTab === '5' })} onClick={menu5Click}
                                style={{ color: activeTab === '5' ? '#427889' : 'black', cursor:'pointer' }}>처방전발급</NavLink> 
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: activeTab === '6' })} onClick={menu6Click}
                                style={{ color: activeTab === '6' ? '#427889' : 'black', cursor:'pointer' }}>기타문서발급</NavLink>
                    </NavItem>
                </Nav>
                </div>
                {menuIdx === 1 && <AdmDiagnosisDue patient={selPatient} />}
                {menuIdx === 2 && <AdmPatientTest patient={selPatient} />}
                {menuIdx === 3 && <AdmPatientAdmmission patient={selPatient} />}
                {menuIdx === 4 && <AdmPatientSurgeryDue patient={selPatient} />}
                {menuIdx === 5 && <AdmPatientPrescription patNum={patNum} patients={selPatient}/>}
                {menuIdx === 6 && <AdmPatientStorage patient={selPatient} />}
            </div>
        </div>
    );
}
export default AdmPatientInfo;