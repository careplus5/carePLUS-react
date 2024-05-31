import '../css/App.css';
import '../css/NurPatientInfo.css';
import DocAdmList from './DocAdmList';
import NurDisAdmModal from './NurDisAdmModal';
import React, {useState} from 'react';
const NurDiagPatientInfo = () => {
    // 유형 1. 대기 중인 환자의 상세 정보

    // 유형 2. 입원 중인 환자의 상세 정보
    // --기능 1: 환자 입원 정보 옆에 퇴원 버튼이 있고, 퇴원 버튼을 누르면 퇴원 처리에 관한 모달이 나타남
    // --기능 2: 입원 일지에 작성 버튼 있으며, 작성 버튼을 누르면  작성 가능한 박스와 등록 버튼이 나타남
    // --기능 3: 작성하지 않으려면 원래 작성 버튼이었다가 접기 버튼으로 바뀐 접기 버튼을 누르면 박스와 등록 버튼이 사라지고, 아래로 내려간 이전 입원 일지 내용이 올라옴
    // --기능 4: 의사 입원 진료도 리스트 형식으로 들어오고, 스크롤로 확인 가능

    // 유형 3. 퇴원 완료인 환자의 상세 정보
    // --기능 1: 퇴원에 관한 컴포넌트가 위에 나타남

    //퇴원 모달
    const [disModalOpen, setDisModalOpen] = useState(false);

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
            <h3 id="LboxHeader">&nbsp;환자 접수 정보 </h3>
            {disModalOpen && <NurDisAdmModal closeDisModal={closeDisModal}/>}
        </div>
        <div style={{marginLeft:"60px"}}>
          <div className="admInfo">
                            <div>이름&nbsp; <input className='inputStyle' disabled/></div>
                            <div style={{marginLeft:"-30px"}}>생년월일 <input className='inputStyle' disabled/></div>
                        </div>
                            <div>환자 번호<input className='inputStyle' style={{width:"405px"}} disabled/></div>
                            <br/>
                            <div>접수 내용<input className='inputStyle' style={{width:"405px", height:"50px"}} disabled /></div>
                            <br/>
                            <div>특이 사항<input className='inputStyle' style={{width:"405px"}} disabled/></div>
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
        <input type="text" id="docOpin" disabled/>
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
 <DocAdmList/>
    </div>
    </div>
)

}
export default NurDiagPatientInfo;