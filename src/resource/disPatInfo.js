import '../css/NurPatientList.css';
const DisPatInfo = () => {
    return (
        <div className="disBox">
            <div className="boxHeader">
                <img id="boxIcon" src="/img/write.png"/>
                <h3 id="boxHeader">환자 퇴원 정보 (2024-06-01 16:00)</h3>
            </div>
            <div className="disContent" style={{marginLeft:"25px"}}>
                퇴원 유형<input className='inputStyle' type="text" style={{width:"40px", height:"15px", textAlign:"center"}} value="정상" disabled />
                 의식 상태<input className='inputStyle' type="text" style={{width:"40px", height:"15px", textAlign:"center"}} value="Alert" disabled />
                퇴원 방법<input className='inputStyle' type="text" style={{width:"40px", height:"15px", textAlign:"center"}} value="도보" disabled />
                퇴원 후 갈 곳<input className='inputStyle' type="text" style={{width:"40px", height:"15px", textAlign:"center"}} value="자가" disabled />
            </div>
        </div>
    )
}

export default DisPatInfo;