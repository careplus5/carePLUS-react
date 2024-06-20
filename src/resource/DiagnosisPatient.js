import axios from 'axios';
import '../css/DiagnosisPatient.css';
import DiagResult from './DiagResult';
import {url} from '../config'
import {useState, useEffect} from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { accessTokenAtom, empAtom, usernameAtom} from '../config/Atom.js';

const DiagnosisPatient = () => {

    const username = useAtomValue(usernameAtom);
    const [diagPatList, setDiagPatList] = useState([]);
    const [diagDueInfo, setDiagDueInfo] = useState({patNum:'', patName:'', patJumin:'', docDiagState:'', diagnosisDueEtc:'', diagnosisDueState:''});
    const [prevDiagList, setPrevDiagList] = useState([]);
    const [accodionIndex, setAccodionIndex] = useState(null);
    const [selectPrevDis, setSelectPrevDis] = useState({diseaseNum:'' ,diseaseName:''});

    useEffect(()=>{
        axios.get(`${url}/diagPatientList?docNum=${username}`)  /* 로그인한 아이디 넣어줄 예정 */
            .then(res=>{
                setDiagPatList([...res.data]);
            })
            .catch(err=>{
                console.log(err);
            })
    }, [username])

    const clickDiagnosis = (diagPat) => {
        let docDiagNum = diagPat.docDiagNum;
        let patNum = diagPat.patNum;

        if(diagDueInfo.docDiagState === 'ing') {
            alert('진료중입니다');
            return;
        }
        axios.get(`${url}/diagPatientInfo?docDiagNum=${docDiagNum}`)
        .then(res=>{
            setDiagDueInfo({...res.data});
            let tdiagPatList = [...diagPatList];
            tdiagPatList.map(item=>{
                if(item.docDiagNum === docDiagNum) {
                    item.docDiagState = res.data.docDiagState;
                }
                return item;
            })
            tdiagPatList.sort((a,b)=>{
                if(a.docDiagState === 'ing' && b.docDiagState !== 'ing'){
                    return -1;
                }
                if (a.docDiagState !== 'ing' && b.docDiagState === 'ing') {
                    return 1;
                }
                if (a.docDiagState === 'end' && b.docDiagState !== 'end') {
                    return 1;
                }
                if (a.docDiagState !== 'end' && b.docDiagState === 'end') {
                    return -1;
                }
                return 0;
            })
            setDiagPatList([...tdiagPatList]);
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
            handleToggle(1);
    }

    const handleToggle = (index) => {
        setAccodionIndex(accodionIndex === index ? null : index);
    }

    const clearDiagDueInfo = () => {
        setDiagDueInfo({
            patNum:'', patName:'', patJumin:'', docDiagState:'', diagnosisDueEtc:'', diagnosisDueState:''
        });
        setPrevDiagList([]);
        setSelectPrevDis({diseaseNum:'' ,diseaseName:''});
    }

    return (
        <div className="background">
            <div id="firstRow" style={{height: "340px"}}>
                <div id="sboxLeft">
                    <div className="diagBoxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;대기 환자 목록
                        </h3>
                    </div>
                    <div className='docPatListScroll'>
                        <table className="docDiagList" borderless>
                            <tbody>
                                <tr>
                                    <th>환자번호</th>
                                    <th>이름</th>
                                    <th>진료 예약일</th>
                                    <th>예약 시간</th>
                                    <th>상태</th>
                                    <th>진료</th>
                                </tr>
                                {diagPatList.map(diagPat=>(
                                    <tr key={diagPat.diagnosisDueNum} className='docDiagTrHover'>
                                        <td>{diagPat.patNum}</td>
                                        <td>{diagPat.patName}</td>
                                        <td>{diagPat.diagnosisDueDate}</td>
                                        <td>{diagPat.diagnosisDueTime}</td>
                                        <td style={{color: 
                                                        diagPat.docDiagState === 'wait' ? '#F09000' : 
                                                        diagPat.docDiagState === 'ing' ? '#007212' : 
                                                        '#848484', fontWeight:"bold"}}>
                                            {diagPat.docDiagState === 'wait' ? '대기중' : 
                                            diagPat.docDiagState === 'ing' ? '진료중' : 
                                            diagPat.docDiagState === 'end' ? '완료' : 
                                            diagPat.docDiagState}
                                        </td>
                                        <td>
                                            {
                                                diagPat.docDiagState === 'ing' || diagPat.docDiagState === 'end' ? '-' :
                                                <button className='buttonStyle' onClick={()=>clickDiagnosis(diagPat)}>진료</button>
                                            
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
                        <h3 className="sboxHeader">&nbsp;환자 예약 정보
                        </h3>
                    </div>
                    <div style={{marginLeft:'45px'}}>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div style={{marginLeft:"35px"}}>이름 <input className='inputStyle' value={diagDueInfo.patName} readOnly/></div>
                            <div style={{marginLeft:"-30px"}}>주민번호 <input className='inputStyle' value={diagDueInfo.patJumin} readOnly/></div>
                        </div>
                        <div id="dueInfoRow" className='dueInfoRow' style={{marginLeft:'6px'}}>
                            <div>환자번호 <input className='inputStyle' value={diagDueInfo.patNum} readOnly/></div>
                            <div>상태 <input className='inputStyle' style={{color:'#007212', fontWeight:'bold'}} 
                                        value={diagDueInfo.docDiagState === 'ing' ? '진료중' : diagDueInfo.docDiagState} readOnly/></div>
                        </div>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div style={{marginLeft:"32px"}}>증상 <input className='inputStyle' style={{width: "549px"}} value={diagDueInfo.diagnosisDueState} readOnly/></div>
                        </div>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div style={{marginLeft:"5px"}}>특이사항 <input className='inputStyle' style={{width: "549px"}} value={diagDueInfo.diagnosisDueEtc} readOnly/></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="secondRow"> 
                <div id="prevHistorybox"  >
                    <div className="diagBoxHeader" onClick={() => handleToggle(1)}>
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp; 이전 진료 내역
                        </h3>
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
                                        <tr key={prevDiag.docDiagNum} className='docDiagTrHover' onClick={() => setSelectPrevDis({diseaseNum:prevDiag.diseaseNum, diseaseName:prevDiag.diseaseName})}>
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
            <div id="diagResultRow"> 
                <DiagResult username={username} diagPatList={diagPatList} setDiagPatList={setDiagPatList} diagDueInfo={diagDueInfo} 
                            clearDiagDueInfo={clearDiagDueInfo} selectPrevDis={selectPrevDis} />
            </div>
        </div>
    )
}

export default DiagnosisPatient;