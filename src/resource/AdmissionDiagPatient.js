import axios from 'axios';
import '../css/DiagnosisPatient.css';
import '../css/AdmissionDiagPatient.css';
import {url} from '../config'
import {useState, useEffect} from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { accessTokenAtom, empAtom, usernameAtom} from '../config/Atom.js';
import AdmissionDiag from './AdmissionDiag.js';

const AdmissionDiagPatient = () => {

    const username = useAtomValue(usernameAtom);
    const [admPatList, setAdmPatList] = useState([]);
    const [admPatInfo, setAdmPatInfo] = useState({
        patNum:'', patName:'', patJumin:'', admissionDiagState:'', admPeriod:'', bedsNum:'', admReason:''
    });
    const [prevDiagList, setPrevDiagList] = useState([]);
    const [accodionIndex, setAccodionIndex] = useState(null);
    const [firstDiagRecord, setFirstDiagRecord] = useState({diseaseName:'', diagContent:''});
    const [admNurRecord, setAdmNurRecord] = useState([]);
    const [admDiagRecord, setAdmDiagRecord] = useState([]);
    const [docName, setDocName] = useState('');
    const [admDiagNum, setAdmDiagNum] = useState('');
    const [newRecordContent, setNewRecordContent] = useState('');
    const [newRecordDate, setNewRecordDate] = useState('');
    const [isAddButtonClick, setIsAddButtonClick] = useState(false);

    useEffect(()=>{
        axios.get(`${url}/admDiagPatientList?docNum=${username}`)
            .then(res=>{
                setAdmPatList([...res.data]);
                setDocName(res.data[0].docName);
            })
            .catch(err=>{
                console.log(err);
            })
    }, [username])

    const clickDiagnosis = (admPat) => {
        let admNum = admPat.admissionNum;
        let patNum = admPat.patNum;

        if(admPatInfo.admissionDiagState === 'ing') {
            alert('진료중입니다');
            return;
        }

        /* 입원 환자 정보 조회 */
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
                return 0;
            })
            setAdmPatList([...tadmPatList]);
            setAdmDiagNum(res.data.admDiagNum);
        })
        .catch(err=>{
            console.log(err);
        })

        /* 입원 환자 이전진료내역 조회 */
        axios.get(`${url}/prevDiagRecord?patNum=${patNum}`)
            .then(res=>{
                setPrevDiagList([...res.data]);
            })
            .catch(err=>{
                console.log(err);
            })

        /* 입원 환자 초기진단기록 조회 */
        axios.get(`${url}/firstDiagRecord?patNum=${patNum}`)
            .then(res=>{
                setFirstDiagRecord({...res.data});
            })
            .catch(err=>{
                console.log(err);
            })

        /* 입원 환자 간호사입원일지 조회 */
        axios.get(`${url}/admDiagNurRecord?admNum=${admNum}`)
            .then(res=>{
                setAdmNurRecord([...res.data]);
            })
            .catch(err=>{
                console.log(err);
            })

        /* 입원 환자 입원진단기록 조회 */
        axios.get(`${url}/admDiagRecord?admNum=${admNum}`)
            .then(res=>{
                setAdmDiagRecord([...res.data]);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    const handleToggle = (index) => {
        setAccodionIndex(accodionIndex === index ? null : index);
    }

    const addDocRecord = () => {
        if (isAddButtonClick) {
            alert("입원 진단 기록중입니다");
            return;
        }

        const today = new Date();
        const formatDate = today.toISOString().split('T')[0];
        const newAdmDiag = {admissionRecordDate:formatDate, docName:docName, docNum:username, 
                            admissionRecordContent: '', docDiagNum:admDiagNum, isNewRecord:true};
        setAdmDiagRecord([newAdmDiag, ...admDiagRecord]);
        setNewRecordDate(formatDate);
        setIsAddButtonClick(true);
    }

    const clearAdmPatInfo = () => {
        setAdmPatInfo({
            patNum:'', patName:'', patJumin:'', admissionDiagState:'', admPeriod:'', bedsNum:'', admReason:''
        });
        setAdmDiagRecord([]);
        setFirstDiagRecord({diseaseName:'', diagContent:''});
        setAdmNurRecord([]);
        setIsAddButtonClick(false);
        setNewRecordContent('');
    }

    return (
        <div className="background">
            <div id="firstRow" style={{height: "340px"}}>
                <div id="sboxLeft">
                    <div className="diagBoxHeader" style={{position:"sticky"}}>
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;입원 환자 목록</h3>
                    </div>
                    <div  className='docPatListScroll'>
                        <table className="docDiagList" borderless>
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
                                    <tr key={amdPat.admissionNum} className='docDiagTrHover'>
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
                                            amdPat.admissionDiagState}
                                        </td>
                                        <td>
                                            {
                                                amdPat.admissionDiagState === 'ing' ? '-' :
                                                <button className='buttonStyle' onClick={()=>clickDiagnosis(amdPat)}>진료</button>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="sboxRight">
                    <div className="diagBoxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;입원 환자 정보</h3>
                    </div>
                    <div style={{marginLeft:'45px'}}>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div style={{marginLeft:"35px"}}>이름 <input className='inputStyle' value={admPatInfo.patName} readOnly/></div>
                            <div style={{marginLeft:"-30px"}}>주민번호 <input className='inputStyle' value={admPatInfo.patJumin} readOnly/></div>
                        </div>
                        <div id="dueInfoRow" className='dueInfoRow' style={{marginLeft:'6px'}}>
                            <div>환자번호 <input className='inputStyle' value={admPatInfo.patNum} readOnly/></div>
                            <div>상태 <input className='inputStyle' style={{color:'#007212', fontWeight:'bold'}} 
                                        value={admPatInfo.admissionDiagState === 'ing' ? '진료중' : admPatInfo.admissionDiagState} readOnly/></div>
                        </div>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div style={{marginLeft:'7px'}}>
                                <div style={{marginBottom:'10px'}}>입원기간 <input className='inputStyle' style={{marginRight:'0', width: "217px"}} value={admPatInfo.admPeriod} readOnly/></div>
                                <div>병상번호 <input className='inputStyle' style={{marginRight:'0', width: "217px"}} value={admPatInfo.bedsNum} readOnly/></div>
                            </div>
                            <div style={{width:'55%'}}>
                                <div style={{display:'flex', marginLeft:'37px'}}>입원사유 <textarea className='inputStyle textareaStyle' style={{width: "63%", height:'78px', marginRight:'0'}} value={admPatInfo.admReason} readOnly/></div>
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
                        <table className="docDiagList" style={{marginBottom:'15px'}} borderless>
                            <tbody>
                                <tr>
                                    <th>진료일</th>
                                    <th>담당의사번</th>
                                    <th>담당의명</th>
                                    <th>병명</th>
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
                                        <tr key={prevDiag.docDiagNum} className='docDiagTrHover'>
                                            <td>{prevDiag.docDiagnosisDate}</td>
                                            <td>{prevDiag.docNum}</td>
                                            <td>{prevDiag.docName}</td>
                                            <td>{prevDiag.diseaseName}</td>
                                            <td className='longTdHidden'>{prevDiag.medName || '-'}</td>
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
                        <div>
                            <div>
                                <label className='admDiagLabelStyle' style={{paddingLeft:'35px'}}>병명 &nbsp;</label>{firstDiagRecord.diseaseName}
                            </div>
                            <div style={{paddingLeft:'25px'}}>
                                <textarea className='admRecordTextarea' value={firstDiagRecord.diagContent} readOnly/>
                            </div>
                        </div>
                    </div>
                    <div id="admDiag-nurAdmRecordBox">
                        <div className="diagBoxHeader" style={{position:"sticky"}}>
                            <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                            <h3 className="sboxHeader">&nbsp;간호사 입원 일지</h3>
                        </div>
                        <div style={{maxHeight:'200px', overflowY:'auto'}}>
                            {admNurRecord.map((record) => (
                                <div key={record.admissionRecordNum}>
                                    <div>
                                        <label className='admDiagLabelStyle' style={{ marginLeft: '10px' }}>날짜 &nbsp;</label>{record.admissionRecordDate}
                                        <label className='admDiagLabelStyle' style={{ marginLeft: '20px' }}>담당 간호사 &nbsp;</label>{`${record.nurName}(${record.nurNum})`}
                                    </div>
                                    <div>
                                        <textarea className='admRecordTextarea' value={record.admissionRecordContent} readOnly />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div id="admDiag-diagRecordBox">
                    <div className="admDiagBoxHeader" style={{position:"sticky"}}>
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;입원 진단 기록</h3>
                            <button className='buttonStyle' style={{ marginTop: "14px", marginLeft:"15px" }} onClick={addDocRecord}>추가</button>
                    </div>
                    <div style={{maxHeight:'395px', overflowY:'auto',paddingLeft:'20px'}}>
                        {admDiagRecord.map((record, index) => (
                            <div key={index}>
                                <div>
                                    <label className='admDiagLabelStyle' style={{ marginLeft: '10px' }}>날짜 &nbsp;</label>{record.admissionRecordDate}
                                    <label className='admDiagLabelStyle' style={{ marginLeft: '20px' }}>담당의 &nbsp;</label>{`${record.docName}(${record.docNum})`}
                                </div>
                                <div>
                                    <textarea className='admRecordTextarea' value={record.isNewRecord ? newRecordContent : record.admissionRecordContent} 
                                            readOnly={!record.isNewRecord} placeholder={record.isNewRecord ? '진단 기록을 입력해주세요' : ''} 
                                            onChange={(e) => {
                                                if (record.isNewRecord) {
                                                    setNewRecordContent(e.target.value);
                                                }}} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <AdmissionDiag username={username} admPatList={admPatList} setAdmPatList={setAdmPatList} admPatInfo={admPatInfo} 
                            clearAdmPatInfo={clearAdmPatInfo} newRecordContent={newRecordContent} newRecordDate={newRecordDate} admDiagNum={admDiagNum}/>
            </div>
        </div>
    )
}

export default AdmissionDiagPatient;