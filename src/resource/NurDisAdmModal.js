import '../css/NurDisAdmModal.css';
import '../css/App.css';
import axios from 'axios';
import {useNavigate, Routes, Route, Link} from 'react-router-dom';
import { url } from '../config';
const NurDisAdmModal = ({ admissionNum }) => {
    // 퇴원 버튼 눌렀을 때 나오는 모달
    const navigate = useNavigate();
    function admDischargeSaved () {
        const admissionDischargeOpinion = document.getElementById('admissionDischargeOpinion').value;
        const currentDate = new Date(); // 현재 날짜와 시간을 포함하는 Date 객체 생성

const year = currentDate.getFullYear();
console.log(year);
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더함
console.log(month);
const day = String(currentDate.getDate()).padStart(2, '0');
console.log(day);
        const admissionDischargeDate = `${year}-${month}-${day}`;
        console.log(admissionNum);
        console.log(admissionDischargeDate);
        axios.post(`${url}/admissionDischarge`,{
            admissionNum:admissionNum,
            admissionDischargeOpinion:admissionDischargeOpinion,
            admissionDischargeDate:admissionDischargeDate,
            admissionDiagState:'end',
        })
        .then(res=>{
        console.log(admissionDischargeDate);
            console.log(res);
            navigate("/nurPatientInfo/"+admissionNum);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return (
        <div className="disAdmModal">
        <div className="boxHeader">
            <h3 id="boxHeader">퇴원</h3>
        </div>
        <div className="disSort">
           <p style={{fontWeight:"bold"}}>퇴원 이유</p>  &nbsp; &nbsp; &nbsp; &nbsp;
            <input type="text" id="admissionDischargeOpinion" name="admissionDischargeOpinion"/>
        </div><br/>
        <button id="button1" style={{marginLeft:"170px"}}onClick={admDischargeSaved}>저장</button>
        </div>
    )
}

export default NurDisAdmModal;