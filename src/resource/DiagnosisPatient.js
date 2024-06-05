import axios from 'axios';
import '../css/DiagnosisPatient.css';
import DiagResult from './DiagResult';
import {useState, useEffect} from 'react';

const DiagnosisPatient = () => {

    const [diagPatList, setDiagPatList] = useState([]);
    const [diagDueInfo, setDiagDueInfo] = useState({patNum:'', patName:'', patJumin:'', docDiagState:'', diagnosisDueEtc:'', diagnosisDueState:''});

    useEffect(()=>{
        axios.get(`http://localhost:8090/diagPatientList?docNum=1016031201`)  /* 로그인한 아이디 넣어줄 예정 */
            .then(res=>{
                setDiagPatList([...res.data]);
            })
            .catch(err=>{
                console.log(err);
            })
    }, [])

    const clickDiagnosis = (docDiagNum) => {
        if(diagDueInfo.docDiagState === '진료중') {
            alert('진료중입니다');
            return;
        }
        axios.get(`http://localhost:8090/diagPatientInfo?docDiagNum=${docDiagNum}`)
        .then(res=>{
            setDiagDueInfo({...res.data});
            let tdiagPatList = [...diagPatList];
            tdiagPatList.map(item=>{
                if(item.docDiagNum === docDiagNum) {
                    item.docDiagState=res.data.docDiagState;
                    return item;
                } else {
                    return item;
                }
            })
            setDiagPatList([...tdiagPatList]);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className="background" style={{marginLeft:"200px", width:"1665px"}}>
            <div id="firstRow" style={{height: "340px"}}>
                <div id="sboxLeft">
                    <div className="diagBoxHeader" style={{position:"sticky"}}>
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;대기 환자 목록
                        </h3>
                    </div>
                    <table className="list" borderless>
                        <tbody>
                            <tr>
                                <th>환자번호</th>
                                <th>이름</th>
                                <th>진료 예약일</th>
                                <th>상태</th>
                                <th>진료</th>
                            </tr>
                            {diagPatList.map(diagPat=>(
                                <tr key={diagPat.diagnosisDueNum}>
                                    <td>{diagPat.patNum}</td>
                                    <td>{diagPat.patName}</td>
                                    <td>{diagPat.diagnosisDueDate}</td>
                                    <td style={{color: 
                                                    diagPat.docDiagState === '대기중' ? '#F09000' : 
                                                    diagPat.docDiagState === '진료중' ? '#007212' : 
                                                    '#848484', fontWeight:"bold"}}>{diagPat.docDiagState}</td>
                                    <td>
                                        {
                                            diagPat.docDiagState === '진료중' ? '-' :
                                            <button className='buttonStyle' onClick={()=>clickDiagnosis(diagPat.docDiagNum)}>진료</button>
                                        
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
                        <h3 className="sboxHeader">&nbsp;환자 예약 정보
                        </h3>
                    </div>
                    <div className='boxContent'>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div style={{marginLeft:"35px"}}>이름 <input className='inputStyle' value={diagDueInfo.patName} /></div>
                            <div style={{marginLeft:"-30px"}}>주민번호 <input className='inputStyle' value={diagDueInfo.patJumin} /></div>
                        </div>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div>환자번호 <input className='inputStyle' value={diagDueInfo.patNum} /></div>
                            <div>상태 <input className='inputStyle' style={{color:'#007212', fontWeight:'bold'}} value={diagDueInfo.docDiagState} /></div>
                        </div>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div style={{marginLeft:"35px"}}>증상 <input className='inputStyle' style={{height: "40px",width: "470px"}} value={diagDueInfo.diagnosisDueState}/></div>
                        </div>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div style={{marginLeft:"5px"}}>특이사항 <input className='inputStyle' style={{width: "470px"}} value={diagDueInfo.diagnosisDueEtc} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="secondRow"> 
                <div id="prevHistorybox">
                    <div className="diagBoxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp; 이전 진료 내역
                        </h3>
                    </div>
                    <table className="list" borderless>
                        <tbody>
                            <tr>
                                <th>진료일</th>
                                <th>진단명</th>
                                <th>처방 의약품 명칭</th>
                                <th>1회 투여랑</th>
                                <th>1회 투여 횟수</th>
                                <th>총투약 횟수</th>
                                <th>용법</th>
                                <th>검사내역</th>
                                <th>진료종류</th>
                            </tr>
                            <tr>
                                <td>2024-05-07</td>
                                <td>장알균에 의한 패혈증</td>
                                <td>64220135(씬지로이드정0.0...</td>
                                <td>1</td>
                                <td>2</td>
                                <td>180</td>
                                <td>아침 점심</td>
                                <td>MRI(복부)촬영</td>
                                <td>외래</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="diagResultRow"> 
                <DiagResult />
            </div>
        </div>
    )
}

export default DiagnosisPatient;