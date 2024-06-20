import axios from 'axios';
import '../css/DiagnosisPatient.css';
import {url} from '../config'
import {useState, useEffect} from 'react';
import SurgeryWrite from './SurgeryWrite';
import { useAtom, useAtomValue } from 'jotai';
import { accessTokenAtom, empAtom, usernameAtom} from '../config/Atom.js';

const SurgeryPatient = () => {

    const username = useAtomValue(usernameAtom);
    const [surPatList, setSurPatList] = useState([]);
    const [surgeryInfo, setSurgeryInfo] = useState({patNum:'', patName:'', patJumin:'', surgeryState:'', patGender:'', patBloodType:'',
        docNum:'', docName:'', surPeriod:'', surReason:'', surgeryDueDate:'', operationRoomNum:'', surgeryStartTime:''
    });
    const [surNurList, setSurNurList] = useState([]);

    useEffect(()=>{
        axios.get(`${url}/surPatientList?docNum=${username}`)
            .then(res=>{
                setSurPatList([...res.data]);
            })
            .catch(err=>{
                console.log(err);
            })
    },[username])

    const clickSurgery = (surPat) => {
        let surgeryNum = surPat.surgeryNum;
        console.log(surgeryNum);

        if(surgeryInfo.surgeryState === 'ing') {
            alert('수술중입니다');
            return;
        }
        axios.get(`${url}/surPatientInfo?surgeryNum=${surgeryNum}`)
            .then(res=>{
                setSurgeryInfo({...res.data});
                let tsurPatList = [...surPatList];
                tsurPatList.map(item=>{
                    if(item.surgeryNum === surgeryNum) {
                        item.surgeryState = res.data.surgeryState;
                    }
                    return item;
                })
                tsurPatList.sort((a,b)=>{
                    if(a.surgeryState === 'ing' && b.surgeryState !== 'ing'){
                        return -1;
                    }
                    if (a.surgeryState !== 'ing' && b.surgeryState === 'ing') {
                        return 1;
                    }
                    if (a.surgeryState === 'end' && b.surgeryState !== 'end') {
                        return 1;
                    }
                    if (a.surgeryState !== 'end' && b.surgeryState === 'end') {
                        return -1;
                    }
                    return 0;
                })
                setSurPatList([...tsurPatList]);
            })
            .catch(err=>{
                console.log(err);
            })
        
        axios.get(`${url}/surNurseList?surgeryNum=${surgeryNum}`)
            .then(res=>{
                setSurNurList([...res.data]);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    const clearSurgeryInfo = () => {
        setSurgeryInfo({patNum:'', patName:'', patJumin:'', surgeryState:'', patGender:'', patBloodType:'',
                    docNum:'', docName:'', surPeriod:'', surReason:'', surgeryDueDate:'', operationRoomNum:'', surgeryStartTime:''
        });
    }

    return (
        <div className="background">
            <div id="firstRow" style={{height: "340px"}}>
                <div id="sboxLeft">
                    <div className="diagBoxHeader" style={{position:"sticky"}}>
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;수술 환자 목록</h3>
                    </div>
                    <table className="docDiagList" borderless>
                        <tbody>
                            <tr>
                                <th>환자번호</th>
                                <th>이름</th>
                                <th>수술 예약일</th>
                                <th>수술 예정 시간</th>
                                <th>상태</th>
                                <th>수술</th>
                            </tr>
                            {surPatList.map(surPat=>(
                                <tr key={surPat.surgeryNum}>
                                    <td>{surPat.patNum}</td>
                                    <td>{surPat.patName}</td>
                                    <td>{surPat.surgeryDueDate}</td>
                                    <td>{surPat.surgeryDueStartTime}</td>
                                    <td style={{color: 
                                                    surPat.surgeryState === 'wait' ? '#F09000' : 
                                                    surPat.surgeryState === 'ing' ? '#007212' : 
                                                    '#848484', fontWeight:"bold"}}>
                                        {surPat.surgeryState === 'wait' ? '대기중' : 
                                        surPat.surgeryState === 'ing' ? '진료중' : 
                                        surPat.surgeryState === 'end' ? '완료' : 
                                        surPat.surgeryState}
                                    </td>
                                    <td>
                                        {
                                            surPat.surgeryState === 'ing' || surPat.surgeryState === 'end' ? '-' :
                                            <button className='buttonStyle' onClick={()=>clickSurgery(surPat)}>수술</button>
                                        
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div id="sboxRight" style={{height:"242px"}}>
                    <div className="diagBoxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;수술 환자 정보</h3>
                    </div>
                    <div className='boxContent' style={{marginLeft:'20px'}}>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div style={{marginLeft:"35px"}}>이름 <input className='inputStyle' value={surgeryInfo.patName} readOnly/></div>
                            <div style={{marginLeft:"-30px"}}>주민번호 <input className='inputStyle' value={surgeryInfo.patJumin} readOnly/></div>
                        </div>
                        <div id="dueInfoRow" className='dueInfoRow' style={{marginLeft:'7px'}}>
                            <div>환자번호 <input className='inputStyle' value={surgeryInfo.patNum} readOnly/></div>
                            <div>상태 <input className='inputStyle' style={{color:'#007212', fontWeight:'bold'}} 
                                    value={surgeryInfo.surgeryState === 'ing' ? '수술중' : surgeryInfo.surgeryState} readOnly/></div>
                        </div>
                        <div id="dueInfoRow" className='dueInfoRow' style={{marginLeft:'34px'}}>
                            <div>성별 <input className='inputStyle' value={surgeryInfo.patGender}  readOnly/></div>
                            <div style={{marginLeft:'-13px'}}>혈액형 <input className='inputStyle' value={surgeryInfo.patBloodType} readOnly/></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="surSecondRow"> 
                <div id="surInfoBox">
                    <div className="diagBoxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp; 수술 정보</h3>
                    </div>
                    <div className='boxContent'>
                        <div className='surInfoRow'>
                            <div style={{marginRight:'-25px'}}>담당의 사번 <input className='surInfoInputStyle' value={surgeryInfo.docNum} readOnly/></div>
                            <div style={{marginRight:'-25px'}}>담당의명 <input className='surInfoInputStyle' value={surgeryInfo.docName} readOnly/></div>
                            <div style={{marginRight:'-25px'}}>수술일 <input className='surInfoInputStyle' value={surgeryInfo.surgeryDueDate} readOnly/></div>
                            <div>상태 <input className='surInfoInputStyle' style={{color:'#007212', fontWeight:'bold'}} 
                                        value={surgeryInfo.surgeryState === 'ing' ? '수술중' : surgeryInfo.surgeryState} readOnly/></div>
                        </div>
                        <div className='surInfoRow'>
                            <div>수술 예상 시간 <input className='surInfoInputStyle' value={surgeryInfo.surPeriod} readOnly/></div>
                            <div>수술실 <input className='surInfoInputStyle' value={surgeryInfo.operationRoomNum} readOnly/></div>
                            <div>수술 예정 시간 <input className='surInfoInputStyle' value={surgeryInfo.surgeryStartTime} readOnly/></div>
                        </div>
                        <div className='surInfoRow'>
                            <div>수술 내용 <input className='surInfoInputStyle' style={{width: "930px", marginBottom:'5px'}} value={surgeryInfo.surReason} readOnly/></div>
                        </div>
                    </div>
                </div>
                <div id='surNurseListBox'>
                    <div className="diagBoxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp; 참여 간호사</h3>
                    </div>
                    <table className="docDiagList" style={{margin:'0'}} borderless>
                        <tbody>
                            <tr>
                                <th>사번</th>
                                <th>부서</th>
                                <th>이름</th>
                            </tr>
                            {surNurList.map(surNur=>(
                                <tr key={surNur.nurNum}>
                                    <td>{surNur.nurNum}</td>
                                    <td>{surNur.deptName}</td>
                                    <td>{surNur.nurName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="diagResultRow"> 
                <SurgeryWrite surgeryInfo={surgeryInfo} surPatList={surPatList} setSurPatList={setSurPatList} clearSurgeryInfo={clearSurgeryInfo} setSurNurList={setSurNurList}/>
            </div>
        </div>
    )
}

export default SurgeryPatient;