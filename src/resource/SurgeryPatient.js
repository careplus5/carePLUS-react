import axios from 'axios';
import '../css/DiagnosisPatient.css';
import {url} from '../config'
import {useState, useEffect} from 'react';
import SurgeryWrite from './SurgeryWrite';
import { useAtom, useAtomValue } from 'jotai';
import { accessTokenAtom, empAtom, usernameAtom} from '../config/Atom.js';

const SurgeryPatient = () => {

    const [surPatList, setSurPatList] = useState([]);
    const username = useAtomValue(usernameAtom);

    useEffect(()=>{
        console.log("그만하고시ㅠ다..."+ username)
        axios.get(`${url}/surPatientList?docNum=${username}`)
            .then(res=>{
                console.log(res.data);
                setSurPatList([...res.data]);
            })
            .catch(err=>{
                console.log(err);
            })
    })

    const clickSurgery = (surPat) => {

    }

    return (
        <div className="background">
            <div id="firstRow" style={{height: "340px"}}>
                <div id="sboxLeft">
                    <div className="diagBoxHeader" style={{position:"sticky"}}>
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;수술 환자 목록</h3>
                    </div>
                    <table className="list" borderless>
                        <tbody>
                            <tr>
                                <th>환자번호</th>
                                <th>이름</th>
                                <th>수술 예약일</th>
                                <th>수술 시작 시간</th>
                                <th>상태</th>
                                <th>수술</th>
                            </tr>
                            {surPatList.map(surPat=>(
                                <tr key={surPat.surgeryNum}>
                                    <td>{surPat.patNum}</td>
                                    <td>{surPat.patName}</td>
                                    <td>{surPat.surgeryDueDate}</td>
                                    <td>{surPat.surgeryStartTime}</td>
                                    <td style={{color: 
                                                    surPat.surgeryState === '대기중' ? '#F09000' : 
                                                    surPat.surgeryState === '진료중' ? '#007212' : 
                                                    '#848484', fontWeight:"bold"}}>{surPat.surgeryState}</td>
                                    <td>
                                        {
                                            surPat.surgeryState === '진료중' || surPat.surgeryState === '완료' ? '-' :
                                            <button className='buttonStyle' onClick={()=>clickSurgery(surPat)}>수술</button>
                                        
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
                        <h3 className="sboxHeader">&nbsp;환자 정보</h3>
                    </div>
                    <div className='boxContent'>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div style={{marginLeft:"35px"}}>이름 <input className='inputStyle'/></div>
                            <div style={{marginLeft:"-30px"}}>주민번호 <input className='inputStyle'/></div>
                        </div>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div>환자번호 <input className='inputStyle'/></div>
                            <div>상태 <input className='inputStyle' style={{color:'#007212', fontWeight:'bold'}}/></div>
                        </div>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div>성별 <input className='inputStyle'/></div>
                            <div>혈액형 <input className='inputStyle' style={{color:'#007212', fontWeight:'bold'}}/></div>
                        </div>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div style={{marginLeft:"5px"}}>기타메모 <input className='inputStyle' style={{width: "470px"}}/></div>
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
                            <div style={{marginRight:'-25px'}}>담당의 사번 <input className='surInfoInputStyle'/></div>
                            <div style={{marginRight:'-25px'}}>담당의 <input className='surInfoInputStyle'/></div>
                            <div style={{marginRight:'-25px'}}>수술일 <input className='surInfoInputStyle'/></div>
                            <div>상태 <input className='surInfoInputStyle'/></div>
                        </div>
                        <div className='surInfoRow'>
                            <div>수술 예상시간 <input className='surInfoInputStyle'/></div>
                            <div>수술실 <input className='surInfoInputStyle' style={{color:'#007212', fontWeight:'bold'}}/></div>
                            <div>수술 시작시간 <input className='surInfoInputStyle' style={{color:'#007212', fontWeight:'bold'}}/></div>
                        </div>
                        <div className='surInfoRow'>
                            <div>수술 내용 <input className='surInfoInputStyle' style={{width: "930px", height:"70px", marginBottom:'5px'}}/></div>
                        </div>
                    </div>
                </div>
                <div id='surNurseListBox'>
                    <div className="diagBoxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp; 참여 간호사</h3>
                    </div>
                    <table className="list" borderless>
                        <tbody>
                            <tr>
                                <th>사번</th>
                                <th>부서</th>
                                <th>이름(성별/나이)</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="diagResultRow"> 
                <SurgeryWrite />
            </div>
        </div>
    )
}

export default SurgeryPatient;