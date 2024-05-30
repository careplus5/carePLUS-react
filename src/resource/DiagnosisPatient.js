import '../css/DiagnosisPatient.css';

const DiagnosisPatient = () => {
    return (
        <div className="background">
            <div id="firstRow" style={{height: "340px"}}>
                <div id="sboxLeft">
                    <div className="boxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;대기 환자 목록
                        </h3>
                    </div>
                    <table className="list" borderless>
                        <tr>
                            <th>환자번호</th>
                            <th>이름</th>
                            <th>진료 예약일</th>
                            <th>상태</th>
                            <th>진료</th>
                        </tr>
                        <tr>
                            <td>8801071341</td>
                            <td>황한샘</td>
                            <td>2024-05-30</td>
                            <td>대기중</td>
                            <td><button className='buttonStyle'>진료</button></td>
                        </tr>
                    </table>
                </div>
                <div id="sboxRight">
                    <div className="boxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;환자 예약 정보
                        </h3>
                    </div>
                    <div className='boxContent'>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div style={{marginLeft:"35px"}}>이름 <input className='inputStyle' /></div>
                            <div style={{marginLeft:"-30px"}}>생년월일 <input className='inputStyle' /></div>
                        </div>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div>환자번호 <input className='inputStyle' /></div>
                            <div>상태 <input className='inputStyle' /></div>
                        </div>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div style={{marginLeft:"35px"}}>증상 <input className='inputStyle' style={{height: "40px",width: "470px"}} /></div>
                        </div>
                        <div id="dueInfoRow" className='dueInfoRow'>
                            <div style={{marginLeft:"5px"}}>특이사항 <input className='inputStyle' style={{width: "470px"}} /></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="secondRow"> 
                <div id="prevHistorybox">
                    <div className="boxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp; 이전 진료 내역
                        </h3>
                    </div>
                    <table className="list" borderless>
                        <tr>
                            <th>진료일</th>
                            <th>진단명</th>
                            <th>처방 의약품 명칭</th>
                            <th>1회 투여랑</th>
                            <th>1회 투여 횟수</th>
                            <th>총투약 횟수</th>
                            <th>용법</th>
                            <th>검사내역</th>
                            <th>진료종류</th>
                        </tr>
                        <tr>
                            <td>2024-05-07</td>
                            <td>장알균에 의한 패혈증</td>
                            <td>64220135(씬지로이드정0.0...</td>
                            <td>1</td>
                            <td>2</td>
                            <td>180</td>
                            <td>아침 점심</td>
                            <td>MRI(복부)촬영</td>
                            <td>외래</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DiagnosisPatient;