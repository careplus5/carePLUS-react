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
    const [dailyContent, setDailyContent] = useState('');
    // const admissionStatus = admission.admissionStatus;
    const [disModalOpen, setDisModalOpen] = useState(false);

    const [docRecords, setDocRecords]=useState([]);
    const [nurseRecords, setNurseRecords] = useState([]);
//    const admission = location.admission.admission;
const diagnosisNum = diagnosis.nurDiagNum;   

const writeSubmit = async () => {
    try {
        const nurDiagContent = document.getElementById('nurDiagContent').value;
        console.log(nurDiagContent);
        const currentDate = new Date();  // 현재 시간을 가져오는 Date 객체 생성
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


// useEffect(()=>{
//     console.log("넘어왔는가."+JSON.stringify(diagnosis));
//         axios.get(`${url}/nurDiagPatientInfo`,{params: {nurDiagNum:diagnosisNum}})
//         .then(res=>{;
          
//         })
//         .catch(err=>{
//             console.log("error가 낫습니다: "+diagnosisNum);
//         })
//    }, [diagnosis.nurDiagNum])

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
            <img id="boxIcon" src="/img/memo.png"/>
            <h3 id="LboxHeader">환자 접수 정보 &nbsp;</h3>
        </div>
        <div style={{marginLeft:"60px"}}>
          <div className="admInfo">
                            <div>이름&nbsp; <input className='inputStyle' value={diagnosis.patName} disabled/></div>
                            <div style={{marginLeft:"-30px"}}>생년월일 <input className='inputStyle' disabled/></div>
                        </div>
                            <div>환자 번호<input className='inputStyle' value={diagnosis.patNum}style={{width:"405px"}} disabled/></div>
                            <br/>
                            <div>주요 증상<input className='inputStyle' style={{width:"405px"}} value={diagnosis.docDiagnosisContent} disabled/></div>
                            <br/>
                            <div>접수 메모<input className='inputStyle' style={{width:"405px"}} disabled/></div>
                            <br/>
                            </div>
                            
        </div>
        <div className="docOpinion">
        <div className="boxHeader">
            <img id="boxIcon" src="/img/memo.png"/> &nbsp;
            <h3 id="LboxHeader">담당의 요청 사항</h3>
        </div>
        <input type="text" id="docOpin" value={diagnosis.docDiagnosisOrder} disabled/>
        </div>
    </div>
    <div className="rightBox">
        <div className="boxHeader">
            <img id="boxIcon" src="/img/memo.png"/>
            <h3 id="LboxHeader">입원 일지</h3>
            <br/>
            </div>
            <div className="nurseWrite" style={{position:"relative"}}>
                <div className="nurseInfo">
                    <p style={{color:"gray"}}>날짜</p>&nbsp;&nbsp;
                    <p>20204-05-07</p>&nbsp;&nbsp;&nbsp;&nbsp;
                    <p style={{color:"gray"}}>담당 간호사</p>&nbsp;&nbsp;
                    <p>{username}</p>&nbsp;&nbsp;
                    <button style={{backgroundColor:"#B9EDE7", color:"black", width:"50px", height: "25px"}} onClick={writeSubmit}>작성</button>
                </div>
                <button id="writeSuccess"  className={writeButton ? 'visible' : 'hidden'} onClick={writeSubmit}>등록</button>
            </div>
                <br/>
            <div className="dailyList">
          <NurseAdmList nurseRecords={nurseRecords}/>
</div>
</div>
 <div className="bottomBox2">
 <div className="boxHeader" style={{height:"30px"}}>
            <img id="boxIcon" src="/img/memo.png"/>
            <h3 id="LboxHeader">진료 기록</h3>
            <br/>
            </div>
            <br/>
            <div className="boxContent">
            <input id="nurDiagContent" type="text" />
            </div>&nbsp;
            <button style={{backgroundColor:"#B9EDE7", color:"black", width:"50px", height: "25px", float:"right", marginRight:"30px",marginTop:"10px"}} onClick={writeSubmit}>등록</button>
    </div>
    </div>
)
}
export default NurDiagPatientInfo;