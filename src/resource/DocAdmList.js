import "../css/NurPatientInfo.css";
import '../css/App.css';
import axios from 'axios';
import NurDisAdmModal from './NurDisAdmModal';
import React, {useState, useEffect} from 'react';
import { admAtom } from '../config/Atom.js';
import { useAtomValue } from 'jotai';
import { url } from '../config.js';
const DocAdmList = ({docRecord}) => {
    const content = docRecord.admissionRecordContent;
    const date = docRecord.admissionRecordDate;
    useEffect(()=>{
        console.log("docRecord: "+content);
        console.log("d: "+JSON.stringify({docRecord}));
    })
    const admission = useAtomValue(admAtom);
    // 유형 2. 입원 중인 환자의 상세 정보
    // --기능 1: 환자 입원 정보 옆에 퇴원 버튼이 있고, 퇴원 버튼을 누르면 퇴원 처리에 관한 모달이 나타남
    // --기능 2: 입원 일지에 작성 버튼 있으며, 작성 버튼을 누르면  작성 가능한 박스와 등록 버튼이 나타남
    // --기능 3: 작성하지 않으려면 원래 작성 버튼이었다가 접기 버튼으로 바뀐 접기 버튼을 누르면 박스와 등록 버튼이 사라지고, 아래로 내려간 이전 입원 일지 내용이 올라옴
    // --기능 4: 의사 입원 진료도 리스트 형식으로 들어오고, 스크롤로 확인 가능

    // 유형 3. 퇴원 완료인 환자의 상세 정보
    // --기능 1: 퇴원에 관한 컴포넌트가 위에 나타남

    //퇴원 모달
    const [disModalOpen, setDisModalOpen] = useState(false);

//    const admission = location.admission.admission;
const admissionNum = admission.admissionNum;   
    return (
        <div className="longBox">
            <div className="boxHeader">
            <img id="boxIcon" src="/img/memo.png"/>
            <h3 id="LboxHeader">&nbsp;의사 입원 진료</h3>
        </div>
        <div className="dailyList">
            <div className="docInfo">
                    <p style={{color:"gray"}}>날짜</p>
                    <p>{date}</p>
                    <p style={{color:"gray"}}>담당 의사</p>
                    <p>{admission.docName}</p>
                </div>
                <div className="writeContent">
                <input id="docDailyContent" type="text" value={content} disabled/><br/>
                </div>
            </div>
  
        </div>
    )
}

export default DocAdmList;