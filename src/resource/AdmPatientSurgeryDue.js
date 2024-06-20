
// 수술 예약
const AdmPatientSurgeryDue = ({patient}) => {
    return (
        <div>
            <div className="boxHeader" style={{ marginLeft: "35px" }}>
                <img id="boxIcon" style={{ width: "40px", height: "40px" }} src="./img/surgery.png" />&nbsp;
                <h3 id="LboxHeader" style={{  marginTop:'20px', marginRight: "120px" }}>수술</h3>
                <button style={{backgroundColor:'#0081b4', height:'30px', marginLeft:"920px"}}>접수</button>
                <br/><br/>
                <div style={{marginLeft:'175px'}}>
                    <span >환자번호</span>
                    <input type="text" value={ patient && patient.patNum}
                        className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}} />
                    <span style={{ marginLeft: "26px" }}>주민등록번호</span>
                    <input type="text" value={ patient && patient.patJumin}
                        className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}} />
                    <span style={{ marginLeft: "26px" }}>이름</span>
                    <input type="text" value={ patient && patient.patName}
                    className='admInputType' style={{marginLeft: "10px", width: "150px", height: "30px"}} />
                    <span style={{ marginLeft: "26px" }}>성별</span>
                    <input type="text" value={ patient && patient.patGender}
                        className='admInputType' style={{marginLeft: "10px", width: "50px", height: "30px"}} />
                </div><br />

                <div style={{marginLeft:'175px'}}>
                    <span >진료과</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "150px", height: "30px"}} />
                    <span style={{ marginLeft: "20px" }}>주치의</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "150px", height: "30px"}} />
                    <span style={{ marginLeft: "20px" }}>수술사유</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "400px", height: "30px"}} />
                </div><br />
                <div style={{marginLeft:'175px'}}>
                    <span >수술날짜</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "150px", height: "30px"}} />
                    <button style={{backgroundColor:'#0081b4', height:'30px', marginLeft:'20px'}}>조회</button>
                    <span style={{ marginLeft: "32px" }}>수술실</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "100px", height: "30px"}} />
                    <span style={{ marginLeft: "32px" }}>수술시작시간</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "100px", height: "30px"}} />
                    <span style={{ marginLeft: "32px" }}>예상수술시간</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "100px", height: "30px"}} />
                </div><br />

                <div style={{marginLeft:'175px'}}>
                <span style={{fontStyle:'bold'}}>수술 간호사 조회 : </span>
                    <span style={{marginLeft:'30px'}}>수술 간호사1</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "100px", height: "30px"}} />
                    <span style={{ marginLeft: "87px" }}>수술 간호사2</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "100px", height: "30px"}} />
                    <span style={{ marginLeft: "87xp" }}>수술 간호사3</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "100px", height: "30px"}} />
                </div><br />
            </div>
        </div>
    )
}

export default AdmPatientSurgeryDue;