import '../css/NurDisAdmModal.css';
import '../css/App.css';
const NurDisAdmModal = () => {
    // 퇴원 버튼 눌렀을 때 나오는 모달
    return (
        <div className="disAdmModal">
        <div className="boxHeader">
            <h3 id="boxHeader">퇴원</h3>
        </div>
        <br/>
        <div className="disSort">
           <p style={{fontWeight:"bold"}}>퇴원 유형</p> 
            <input type="radio"/>정상 &nbsp;&nbsp;
            <input type="radio"/>자의&nbsp;&nbsp;
            <input type="radio"/>탈원&nbsp;&nbsp;
            <input type="radio"/>사망
        </div>
        <br/>
        <div className="disSort">
           <p style={{fontWeight:"bold"}}>의식 상태</p> 
            <input type="radio"/>Alert &nbsp;&nbsp;
            <input type="radio"/>Drowsy &nbsp;&nbsp;
            <input type="radio"/>Stupor &nbsp;&nbsp;
            <input type="radio"/>Semicoma 
            &nbsp;&nbsp;
            <input type="radio"/>Coma 
        </div>
        <br/>
        <div className="disSort">
           <p style={{fontWeight:"bold"}}>퇴원 방법</p> 
            <input type="radio"/>도보 &nbsp;&nbsp;
            <input type="radio"/>목발&nbsp;&nbsp;
            <input type="radio"/>휠체어&nbsp;&nbsp;
            <input type="radio"/>이동 침대
            &nbsp;&nbsp;
            <input type="radio"/>응급차
            &nbsp;&nbsp;
            <input type="radio"/>기타&nbsp;&nbsp;
            <input type="text"/> 
        </div>
        <br/>
        <div className="disSort">
           <p style={{fontWeight:"bold"}}>퇴원 후 갈 곳</p> 
            <input type="radio"/>자가 &nbsp;&nbsp;
            <input type="radio"/>친척&nbsp;&nbsp;
            <input type="radio"/>타병원&nbsp;&nbsp;
            <input type="radio"/>기타&nbsp;&nbsp;
            <input type="text"/> 
        </div>
        <br/>
        <button id="button1" style={{marginLeft:"260px"}}>저장</button>
        </div>
    )
}

export default NurDisAdmModal;