import "../css/NurPatientInfo.css";
const DocAdmList = () => {
    return (
        <div className="longBox">
            <div className="boxHeader">
            <img id="boxIcon" src="/img/memo.png"/>
            <h3 id="LboxHeader">&nbsp;의사 입원 진료</h3>
        </div>
        <div className="dailyList">
            <div className="docInfo">
                    <p style={{color:"gray"}}>날짜</p>&nbsp;&nbsp;
                    <p>20204-05-05</p>&nbsp;&nbsp;&nbsp;&nbsp;
                    <p style={{color:"gray"}}>담당 의사</p>&nbsp;&nbsp;
                    <p>김민지</p>&nbsp;&nbsp;
                </div>
                <div className="writeContent">
                <input id="docDailyContent" type="text" disabled/><br/>
                </div>
            </div>
  
        </div>
    )
}

export default DocAdmList;