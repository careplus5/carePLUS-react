import '../css/App.css';
import '../css/NurPatientInfo.css';
import DocAdmList from './DocAdmList';
import axios from 'axios';
import NurDisAdmModal from './NurDisAdmModal';
import React, {useState, useEffect} from 'react';
import { admAtom } from '../config/Atom.js';
import { useAtomValue } from 'jotai';
import { url } from '../config.js';
const NurPatientInfo = () => {
    // 유형 1. 대기 중인 환자의 상세 정보
    const admission = useAtomValue(admAtom);
    const admissionState = admission.admissionState;
    // 유형 2. 입원 중인 환자의 상세 정보
    // --기능 1: 환자 입원 정보 옆에 퇴원 버튼이 있고, 퇴원 버튼을 누르면 퇴원 처리에 관한 모달이 나타남
    // --기능 2: 입원 일지에 작성 버튼 있으며, 작성 버튼을 누르면  작성 가능한 박스와 등록 버튼이 나타남
    // --기능 3: 작성하지 않으려면 원래 작성 버튼이었다가 접기 버튼으로 바뀐 접기 버튼을 누르면 박스와 등록 버튼이 사라지고, 아래로 내려간 이전 입원 일지 내용이 올라옴
    // --기능 4: 의사 입원 진료도 리스트 형식으로 들어오고, 스크롤로 확인 가능

    // 유형 3. 퇴원 완료인 환자의 상세 정보
    // --기능 1: 퇴원에 관한 컴포넌트가 위에 나타남

    //퇴원 모달
    const [disModalOpen, setDisModalOpen] = useState(false);

    const [docRecord, setDocRecord]=useState({
        admissionRecordContent:'',
        admissionRecordDate:'',
    })
//    const admission = location.admission.admission;
const admissionNum = admission.admissionNum;   

useEffect(()=>{
    console.log("넘어왔는가."+JSON.stringify(admission));
console.log("now:"+admissionState);
        axios.get(`${url}/nurPatientInfo`,{params: {admissionNum:admission.admissionNum}})
        .then(res=>{
            console.log("실행 중인 "+admissionNum);
            console.log(res.data[0].record);
            setDocRecord({
                admissionRecordContent:res.data[0].record.admissionRecordContent,
                admissionRecordDate:res.data[0].record.admissionRecordDate,
            })
        })
        .catch(err=>{
            console.log(admissionNum);
        })
   },[])
//   useEffect(()=>{
//    setAdmission(location.admission.admission);
//   },[])
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
{admissionState === "end" ? <div className="disChargeBox" style={{
width:"1590px"
,backgroundColor:"white"
,position:"relative"
,height:"100px"
,borderRadius:"15px"
,boxShadow:"0 1px 1px 0 lightgray"
}}><div className="boxHeader"><br/>
            <h3 id="LboxHeader" style={{fontSize:"18px"}}>퇴원 정보</h3></div>
            <div className="admInfo" style={{marginLeft:"10px",marginTop:"-20px"}}>해당 환자는 {admission.admissionDischargeDate}일에 퇴원하였습니다.
            <br/></div></div> : ''}
<br/>
    <div className="leftBox">
        <div className="patProfile">
        <div className="boxHeader">
            <img id="boxIcon" src="/img/memo.png"/>
            <h3 id="LboxHeader">환자 입원 정보 &nbsp;</h3>{
                admission.admissionState === 'ing'?
                <button style={{backgroundColor:"gray", color:"black", width:"50px", height: "24px", color:"white"}} onClick={openDisModal}>퇴원</button> :''}
            {disModalOpen && <NurDisAdmModal admissionNum={admissionNum} closeDisModal={closeDisModal}/>}
        </div>
        <div style={{marginLeft:"60px"}}>
          <div className="admInfo">
                            <div>이름&nbsp; <input className='inputStyle' value={admission.patName} disabled/></div>
                            <div style={{marginLeft:"-30px"}}>생년월일 <input className='inputStyle' disabled/></div>
                        </div>
                            <div>환자 번호<input className='inputStyle' value={admission.patNum}style={{width:"405px"}} disabled/></div>
                            <br/>
                            <div>입원 내용<input className='inputStyle' value={admission.admissionReason} style={{width:"405px", height:"50px"}} disabled /></div>
                            <br/>
                            <div>주요 증상<input className='inputStyle' style={{width:"405px"}} disabled/></div>
                            <br/>
                            <div>접수 메모<input className='inputStyle' style={{width:"405px"}} disabled/></div>
                            <br/>
                            </div>
                            
        </div>
        <div className="docOpinion">
        <div className="boxHeader">
            <img id="boxIcon" src="/img/memo.png"/> &nbsp;
            <h3 id="LboxHeader">담당의 소견</h3>
        </div>
        <input type="text" id="docOpin" value={admission.admissionDoctorOpinion} disabled/>
        </div>
    </div>
    <div className="rightBox">
        <div className="boxHeader">
            <img id="boxIcon" src="/img/memo.png"/>
            <h3 id="LboxHeader">입원 일지</h3>
            <br/>
            </div>
            <div className="nurseWrite">
                <div className="nurseInfo">
                    <p style={{color:"gray"}}>날짜</p>&nbsp;&nbsp;
                    <p>20204-05-07</p>&nbsp;&nbsp;&nbsp;&nbsp;
                    <p style={{color:"gray"}}>담당 간호사</p>&nbsp;&nbsp;
                    <p>김동현</p>&nbsp;&nbsp;
                    <button style={{backgroundColor:"#B9EDE7", color:"black", marginTop:"15px", width:"50px", height: "20px"}} onClick={clickWriteButton}>작성</button>
                    {!writeButton}
                </div>
                <div className={`writeContent ${writeButton ? 'visible' : 'hidden'}`}>
                <input id="dailyContent" type="text" disabled/><br/>
                <button id="writeSuccess"  className={`${writeButton ? 'visible' : 'hidden'}`}>등록</button>
                </div>
            </div>
            <br/>
            <br/>
            <div className="dailyList">
            <div className="nurseInfo">
                    <p style={{color:"gray"}}>날짜</p>&nbsp;&nbsp;
                    <p>20204-05-05</p>&nbsp;&nbsp;&nbsp;&nbsp;
                    <p style={{color:"gray"}}>담당 간호사</p>&nbsp;&nbsp;
                    <p>김민지</p>&nbsp;&nbsp;
                </div>
                <div className="writeContent">
                <input id="dailyContent" type="text" disabled/><br/>
                </div>
            </div>
            <div className="dailyList">
            <div className="nurseInfo">
                    <p style={{color:"gray"}}>날짜</p>&nbsp;&nbsp;
                    <p>20204-05-05</p>&nbsp;&nbsp;&nbsp;&nbsp;
                    <p style={{color:"gray"}}>담당 간호사</p>&nbsp;&nbsp;
                    <p>김민지</p>&nbsp;&nbsp;
                </div>
                <div className="writeContent">
                <input id="dailyContent" type="text" disabled/><br/>
                </div>
            </div>
  
    </div>
 <div className="bottomBox">
 <DocAdmList docRecord={docRecord}/>
    </div>
    </div>
)

}
export default NurPatientInfo;