import '../css/App.css';
import '../css/NurPatientInfo.css';
import '../css/NurDiagPatientInfo.css';
import axios from 'axios';
import NurDisAdmModal from './NurDisAdmModal';
import React, {useState, useEffect} from 'react';
import { admAtom, usernameAtom,diagAtom } from '../config/Atom.js';
import { useAtomValue } from 'jotai';
import { url } from '../config.js';
import DocAdmList from './DocAdmList'; // DocAdmList 컴포넌트를 임포트
import NurseAdmList from './NurseAdmList';
const NurDiagPatientInfo = () => {
    // 유형 1. 대기 중인 환자의 상세 정보
    const username = useAtomValue(usernameAtom);
    const diagnosis = useAtomValue(diagAtom);
    const [nurDiagContent, setNurDiagContent] = useState('');
    const [dailyContent, setDailyContent] = useState('');
    // const admissionStatus = admission.admissionStatus;
    const [disModalOpen, setDisModalOpen] = useState(false);

    const [docRecords, setDocRecords]=useState([]);
    const [nurseRecords, setNurseRecords] = useState([]);
//    const admission = location.admission.admission;
const diagnosisNum = diagnosis.nurDiagNum;
const patNum = diagnosis.patNum;
const [prevDiagList, setPrevDiagList] = useState([]);
const writeSubmit = async () => {
    try {
        const currentDate = new Date().toISOString().split('T')[0];  // 현재 날짜를 yyyy-MM-dd 형식으로 변환
        const response = axios.post(`${url}/nurDiagPatientRecord`, {
            nurDiagnosisDate: currentDate,
            nurNum: username,
            nurDiagNum:diagnosisNum,
            nurDiagContent: nurDiagContent
        });

        console.log('데이터가 성공적으로 등록되었습니다.', response.data);

        // 등록 후 필요한 처리 (예: 입력창 초기화, 상태 업데이트 등)
        setDailyContent('');
        setWriteButton(false);
        window.location.href = `http://localhost:3000/nurDiagPatientInfo/${diagnosisNum}`; // 이동할 URL로 변경

    } catch (error) {
        console.error('데이터 등록 중 오류가 발생했습니다.', error);
    }
};

useEffect(()=>{
    axios.get(`${url}/prevDiagRecord?patNum=${patNum}`)
    .then(res=>{
        setPrevDiagList([...res.data]);
    })
    .catch(err=>{
        console.log(err);
    })
},[])

    const openDisModal = () => {
        setDisModalOpen(true);
    }
    const closeDisModal = () => {
        setDisModalOpen(false);
    }


    //작성 버튼 관련
    const [writeButton, setWriteButton] = useState(false);

    const [OnWriteButton, setOnWriteButton] = useState(false);

    const clickWriteButton = () => {
        setWriteButton(true);
    }
return (<div className="background">
<br/>
    <div className="leftBox">
        <div className="patProfile">
        <div className="boxHeader">
            <img id="boxIcons" src="/img/memo.png"/>
            <h3 id="sboxHeader">환자 접수 정보 &nbsp;</h3>
        </div><br/>
        <div style={{marginLeft:"60px", fontSize:"15px"}}>
          <div style={{display:"flex",marginBottom:"20px",marginLeft:"6px"}}>
                            <div>이름&nbsp; <input className='inputStyle' style={{backgroundColor:"white"}} value={diagnosis.patName} disabled/></div>
                            <div>생년월일 <input className='inputStyle' style={{backgroundColor:"white"}} value={diagnosis.patBirth} disabled/></div>
                        </div>
                            <div>환자 번호<input className='inputStyle' value={diagnosis.patNum} style={{width:"405px",backgroundColor:"white"}} disabled/></div>
                            <br/>
                            <div>주요 증상<input className='inputStyle' style={{width:"405px",backgroundColor:"white"}} value={diagnosis.docDiagnosisContent} disabled/></div>
                            <br/>
                            <div>접수 메모<input className='inputStyle' style={{width:"405px",backgroundColor:"white"}} disabled/></div>
                            <br/>
                            </div>
                            
        </div>
        <div className="docOpinion">
        <div className="boxHeader">
            <img id="boxIcons" src="/img/memo.png"/> &nbsp;
            <h3 id="sboxHeader">담당의 요청 사항</h3>
        </div>
        <input type="text" id="docOpin" value={diagnosis.docDiagnosisOrder} disabled/>
        </div>
    </div>
    <div className="rightBox">
        <div className="boxHeader">
            <img id="boxIcons" src="/img/memo.png"/>
            <h3 id="sboxHeader">이전 진료 내역</h3>
            <br/>
            </div>
            <br/>
            <div className="nurseWrite" style={{position:"relative"}}>
                <div className="nurInfo">
                <table className="diagList"borderless>
                            <tbody>
                                <tr>
                                    <th>진료일</th>
                                    <th>담당의사번</th>
                                    <th>담당의명</th>
                                    <th>진단명</th>
                                    <th>처방 의약품 명칭</th>
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
                                            <td>{prevDiag.testPart || '-'}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                </div>
            </div>
                <br/>
            <div className="dailyList">
          <NurseAdmList nurseRecords={nurseRecords}/>
</div>
</div>
 <div className="bottomBox2">
 <div className="boxHeader" style={{height:"30px"}}>
            <img id="boxIcons" src="/img/memo.png"/>
            <h3 id="sboxHeader">진료 기록</h3>
            <br/>
            </div>
            <br/>
            <div className="boxContent">
            <input id="nurDiagContent" name="nurDiagContent" type="text" onChange={(e) => setNurDiagContent(e.target.value)}/>
            </div>&nbsp;
            <button className="buttonStyle" style={{height: "25px", float:"right", marginRight:"30px",marginTop:"10px"}} onClick={writeSubmit}>등록</button>
    </div>
    </div>
)
}
export default NurDiagPatientInfo;