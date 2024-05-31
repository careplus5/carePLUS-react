import '../css/App.css';
import '../css/NurPatientInfo.css';
import DocAdmList from './DocAdmList';
import NurDisAdmModal from './NurDisAdmModal';
import React, {useState} from 'react';
const NurPatientInfo = () => {
    const [disModalOpen, setDisModalOpen] = useState(false);
    const [writeButton, setWriteButton] = useState(false);

    const openDisModal = () => {
        setDisModalOpen(true);
    }

    const closeDisModal = () => {
        setDisModalOpen(false);
    }

    const clickWriteButton = () => {
        setWriteButton(true);
    }

    const [OnWriteButton, setOnWriteButton] = useState(false);

return (<div className="background">
<br/>
    <div className="leftBox">
        <div className="patProfile">
        <div className="boxHeader">
            <img id="boxIcon" src="/img/memo.png"/>
            <h3 id="LboxHeader">&nbsp;환자 입원 정보 &nbsp;<button style={{backgroundColor:"gray", color:"black", width:"50px", height: "20px"}} onClick={openDisModal}>퇴원</button> </h3>
            {disModalOpen && <NurDisAdmModal closeDisModal={closeDisModal}/>}
        </div>
        <div style={{marginLeft:"60px"}}>
          <div className="admInfo">
                            <div>이름 <input className='inputStyle' disabled/></div>
                            <div style={{marginLeft:"-30px"}}>생년월일 <input className='inputStyle' disabled/></div>
                        </div>
                            <div>환자 번호<input className='inputStyle' style={{width:"405px"}} disabled/></div>
                            <br/>
                            <div>입원 내용<input className='inputStyle' style={{width:"405px", height:"50px"}} disabled /></div>
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
export default NurPatientInfo;