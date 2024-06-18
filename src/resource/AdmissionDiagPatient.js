import axios from 'axios';
import '../css/DiagnosisPatient.css';
import '../css/AdmissionDiagPatient.css';
import {url} from '../config'
import {useState, useEffect} from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { accessTokenAtom, empAtom, usernameAtom} from '../config/Atom.js';

const AdmissionDiagPatient = () => {

    const [admPatList, setAdmPatList] = useState([]);
    const [admPatInfo, setAdmPatInfo] = useState({});
    const [prevDiagList, setPrevDiagList] = useState([]);
    const [accodionIndex, setAccodionIndex] = useState(null);
    const username = useAtomValue(usernameAtom);

    useEffect(()=>{
        axios.get(`${url}/admDiagPatientList?docNum=${username}`)
            .then(res=>{
                setAdmPatList([...res.data]);
            })
            .catch(err=>{
                console.log(err);
            })
    }, [])

    const clickDiagnosis = (admPat) => {
        let admNum = admPat.admissionNum;
        let patNum = admPat.patNum;

        if(admPatInfo.admissionDiagState === 'ing') {
            alert('진료중입니다');
            return;
        }
        axios.get(`${url}/admDiagPatientInfo?admNum=${admNum}`)
        .then(res=>{
            setAdmPatInfo({...res.data});
            let tadmPatList = [...admPatList];
            tadmPatList.map(item=>{
                if(item.admissionNum === admNum) {
                    item.admissionDiagState = res.data.admissionDiagState;
                }
                return item;
            })
            tadmPatList.sort((a,b)=>{
                if(a.admissionDiagState === 'ing' && b.admissionDiagState !== 'ing'){
                    return -1;
                }
                if (a.admissionDiagState !== 'ing' && b.admissionDiagState === 'ing') {
                    return 1;
                }
                if (a.admissionDiagState === 'end' && b.admissionDiagState !== 'end') {
                    return 1;
                }
                if (a.admissionDiagState !== 'end' && b.admissionDiagState === 'end') {
                    return -1;
                }
                return 0;
            })
            setAdmPatList([...tadmPatList]);
        })
        .catch(err=>{
            console.log(err);
        })
        axios.get(`${url}/prevDiagRecord?patNum=${patNum}`)
            .then(res=>{
                setPrevDiagList([...res.data]);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    const handleToggle = (index) => {
        setAccodionIndex(accodionIndex === index ? null : index);
    }

    return (
        <div className="background">
            <div id="firstRow" style={{height: "340px"}}>
                <div id="sboxLeft">
                    <div className="diagBoxHeader" style={{position:"sticky"}}>
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;입원 환자 목록</h3>
                    </div>
                    <table className="list" borderless>
                        <tbody>
                            <tr>
                                <th>환자번호</th>
                                <th>이름</th>
                                <th>입원일</th>
                                <th>퇴원예정일</th>
                                <th>상태</th>
                                <th>진료</th>
                            </tr>
                            {admPatList.map(amdPat=>(
                                <tr key={amdPat.admissionNum}>
                                    <td>{amdPat.patNum}</td>
                                    <td>{amdPat.patName}</td>
                                    <td>{amdPat.admissionDate}</td>
                                    <td>{amdPat.admissionDischargeDueDate}</td>
                                    <td style={{color: 
                                                    amdPat.admissionDiagState === 'wait' ? '#F09000' : 
                                                    amdPat.admissionDiagState === 'ing' ? '#007212' : 
                                                    '#848484', fontWeight:"bold"}}>
                                        {amdPat.admissionDiagState === 'wait' ? '대기중' : 
                                        amdPat.admissionDiagState === 'ing' ? '진료중' : 
                                        amdPat.admissionDiagState === 'end' ? '완료' : 
                                        amdPat.admissionDiagState}
                                    </td>
                                    <td>
                                        {
                                            amdPat.admissionDiagState === 'ing' || amdPat.admissionDiagState === 'end' ? '-' :
                                            <button className='buttonStyle' onClick={()=>clickDiagnosis(amdPat)}>진료</button>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div id="sboxRight">
                    <div className="diagBoxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;입원 환자 정보</h3>
                    </div>
                    <div className='boxContent' style={{marginLeft:'20px'}}>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div style={{marginLeft:"35px"}}>이름 <input className='inputStyle' value={admPatInfo.patName} readOnly/></div>
                            <div style={{marginLeft:"-30px"}}>주민번호 <input className='inputStyle' value={admPatInfo.patJumin} readOnly/></div>
                        </div>
                        <div id="dueInfoRow" className='dueInfoRow' style={{marginLeft:'6px'}}>
                            <div>환자번호 <input className='inputStyle' value={admPatInfo.patNum} readOnly/></div>
                            <div>상태 <input className='inputStyle' style={{color:'#007212', fontWeight:'bold'}} value={admPatInfo.admissionDiagState} readOnly/></div>
                        </div>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div style={{width:'55%'}}>
                                <div style={{marginBottom:'10px'}}>입원 기간 <input className='inputStyle' style={{width: "55%"}} value={admPatInfo.admPeriod} readOnly/></div>
                                <div>병상번호 <input className='inputStyle' style={{width: "55%"}} value={admPatInfo.bedsNum} readOnly/></div>
                            </div>
                            <div style={{width:'55%'}}>
                                <div style={{display:'flex'}}>입원 사유 <textarea className='inputStyle textareaStyle' style={{width: "59%", height:'78px'}} value={admPatInfo.admReason} readOnly/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="secondRow"> 
                <div id="prevHistorybox"  >
                    <div className="diagBoxHeader" onClick={() => handleToggle(1)}>
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp; 이전 진료 내역</h3>
                    </div>
                    {accodionIndex === 1 && (
                        <table className="list" style={{marginBottom:'15px'}} borderless>
                            <tbody>
                                <tr>
                                    <th>진료일</th>
                                    <th>담당의사번</th>
                                    <th>담당의명</th>
                                    <th>진단명</th>
                                    <th>처방 의약품 명칭</th>
                                    <th>1회 투여량</th>
                                    <th>1회 투여 횟수</th>
                                    <th>총투약 횟수</th>
                                    <th>용법</th>
                                    <th>검사내역</th>
                                    <th>진료종류</th>
                                </tr>
                                {prevDiagList.length === 0 ? (
                                    <tr>
                                        <td colSpan='11' style={{paddingTop:"15px"}}>
                                        <input className='preInputStyle' style={{marginTop:'0px', width:"100%", textAlign:"center"}} value="진료 내역이 존재하지 않습니다" readOnly />
                                        </td>
                                    </tr>
                                ) : (
                                    prevDiagList.map(prevDiag=>(
                                        <tr key={prevDiag.docDiagNum}>
                                            <td>{prevDiag.docDiagnosisDate}</td>
                                            <td>{prevDiag.docNum}</td>
                                            <td>{prevDiag.docName}</td>
                                            <td>{prevDiag.diseaseName}</td>
                                            <td>{prevDiag.medName || '-'}</td>
                                            <td>{prevDiag.preDosage || '-'}</td>
                                            <td>{prevDiag.preDosageTime || '-'}</td>
                                            <td>{prevDiag.preDosageTotal || '-'}</td>
                                            <td>{prevDiag.preHowTake || '-'}</td>
                                            <td>{prevDiag.testPart || '-'}</td>
                                            <td>
                                                {prevDiag.docDiagnosisKind === 'diag' ? '외래' : 
                                                prevDiag.docDiagnosisKind === 'adm' ? '입원' :
                                                prevDiag.docDiagnosisKind}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <div id="diagResultRow" style={{marginTop:'20px', display:'flex'}}> 
                <div>
                    <div id="admDiag-firstDiagBox">
                        <div className="diagBoxHeader" style={{position:"sticky"}}>
                            <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                            <h3 className="sboxHeader">&nbsp;초기 진단 기록</h3>
                        </div>
                    </div>
                    <div id="admDiag-diagRecordBox">
                        <div className="diagBoxHeader" style={{position:"sticky"}}>
                            <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                            <h3 className="sboxHeader">&nbsp;입원 진단 기록</h3>
                        </div>
                    </div>
                </div>
                <div id="admDiag-nurAdmRecordBox">
                    <div className="admDiagBoxHeader" style={{position:"sticky"}}>
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;간호사 입원 일지</h3>
                    </div>
                    <div className='boxContent'>
                        <div style={{marginTop:'5px'}}>
                            <label>날짜 &nbsp;</label>2024-06-15
                            <label style={{marginLeft:'20px'}}>담당 간호사 &nbsp;</label>김간호
                        </div>
                        <div>
                            <textarea className='admRecordTextarea' value='간호사의 입원일지' readOnly/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdmissionDiagPatient;