import {useState, useEffect} from 'react';
import axios from 'axios';
// 퇴원
const AdmPatientDischarge = ({patient}) => {

    // 환자 번호
    const [patNum, setPatNum] = useState(patient ? patient.patNum : '');
    console.log(patNum.type);
    console.log('출력이 될까요?');
    // 퇴원일자 입력 (환자번호, 주민등록번호, 이름, 주치의, 진료부서, 퇴근예정일, 퇴원일 )
    // const [admission, setAdmission] = useState({
    //     patNum:0, patName:'', patJumin:'',
    //     admissionDate:'', admissionDischargeDueDate:'', admissionDischargeDate:'',
    //     docNum:0, docName:'',departmentName: '', admissionDischargeDueDate: '', dischargeDate: ''});

    const admDischargeRegist = () => {

    }

    return (
        <div id="LaccordionBox">
            <div className="boxHeader" style={{ marginLeft: "35px" }} >
                <img id="boxIcon" style={{  width: "40px", height: "40px" }} src="./img/register.png" />&nbsp;
                <h3 id="LboxHeader" style={{ marginRight: "1000px" }}>퇴원</h3>
                <button onClick={admDischargeRegist} style={{ marginTop: "21px" }} >접수</button>
                <br/><br/><div>
                    <span >환자번호</span>
                    <input type="text" name='patNum' value={patient && patient.patNum}
                        className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}}/>
                    <span style={{ marginLeft: "21px" }}>주민등록번호</span>
                    <input type="text" value={patient && patient.patJumin}
                        className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}} />
                    <span style={{ marginLeft: "21px" }}>이름</span>
                    <input type="text" value={patient && patient.patName}
                    className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}}/>
                    <span style={{ marginLeft: "21px" }}>입원일자</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}} />
                </div><br />

                <div>
                    <span>주치의</span>
                    <input type="text"
                        // value={setAdmission.docName}
                        className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}} />
                    <span style={{ marginLeft: "55px" }}>진료부서</span>
                    <input type="text" name='departmentName' id='departmentName'
                        // value={setAdmission.departmentName}
                        className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}} />
                    <span style={{ marginLeft: "55px" }}>퇴원예정일</span>
                    <input type="text" name='admissionDischargeDueDate' id='admissionDischargeDueDate'
                        // value={setAdmission.admissionDischargeDueDate}
                        className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}} />
                    <span style={{ marginLeft: "55px" }}>퇴원일</span>
                    <input type="text" name='admissionDischargeDate' id='admissionDischargeDate'
                        onChange={(e) => e.target.value}
                        className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}} />
                </div><br />
            </div>
        </div>
    );
}

export default AdmPatientDischarge;