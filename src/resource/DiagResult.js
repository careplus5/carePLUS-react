import '../DiagResult.css';

const DiagResult = () => {
    return (
        <div>
            <div id="thirdRow">
                <div id="diagRecordBox">
                    <div className="boxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;진단</h3>
                    </div>
                    <div className='boxContent'>
                        <div style={{marginLeft:"20px"}}>
                            <label className='labelStyle'>병명</label>
                            <select id="diagSelect" className="selectStyle">
                                <option value="default">병명 선택</option>
                                <option value="diagnosis1">병명1</option>
                                <option value="diagnosis2">병명2</option>
                                <option value="diagnosis3">병명3</option>
                            </select>
                        </div>
                        <div style={{marginLeft:"20px", display:"flex", marginTop:"10px"}}>
                            <label className='labelStyle'>내용</label>
                            <textarea id="diagContent" className="textareaStyle" placeholder="진단 내용"></textarea>
                        </div>
                    </div>
                </div>
                <div id="addDiagRecordBox">
                    <div className="boxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;추가 진단</h3>
                    </div>
                    <div className='boxContent' style={{display:"flex", justifyContent:'center'}}>
                        <div id='testCheck'>
                            <div className="checkboxStyle">
                                <input type='checkbox' id="test"/>
                                <label htmlFor="test">&nbsp;&nbsp;검사</label>
                            </div>
                            <div style={{display:"flex", marginBottom:"12px"}}>
                                <div className='radioStyle'>
                                    <input type='radio' id='mri' name='radio'/>
                                    <label htmlFor='mri'>MRI</label>
                                </div>
                                <div className='radioStyle'>
                                    <input type='radio' id='ct' name='radio'/>
                                    <label htmlFor='ct'>CT</label>
                                </div>
                                <div className='radioStyle'>
                                    <input type='radio' id='xray' name='radio'/>
                                    <label htmlFor='xray'>X-ray</label>
                                </div>
                            </div>
                            <div id="testRequest">
                                <input type='text' className='inputBoxStyle' style={{height:"90px"}} placeholder="요청사항"/>
                            </div>
                        </div>
                        <div id='adminssionCheck'>
                            <div className="checkboxStyle">
                                <input type='checkbox' id="adminssion"/>
                                <label htmlFor="adminssion">&nbsp;&nbsp;입원</label>
                            </div>
                            <div className="adminssionRequest">
                                <input type='text' className='inputBoxStyle' style={{height:"80px"}} placeholder="입원사유"/>
                            </div>
                            <div className="adminssionRequest">
                                <input type='text' className='inputBoxStyle' style={{marginTop:"10px"}} placeholder="입원 기간"/>
                            </div>
                        </div>
                        <div id='surgeryCheck'>
                            <div className="checkboxStyle">
                                <input type='checkbox' id="surgery"/>
                                <label htmlFor="surgery">&nbsp;&nbsp;수술</label>
                            </div>
                            <div className="surgeryRequest">
                                <input type='text' className='inputBoxStyle' style={{height:"45px", width:"185px"}} placeholder="수술사유"/>
                            </div>
                            <div className="surgeryRequest">
                            <label htmlFor="surgeryDate">희망 날짜</label>
                                <input type='date' className='inputBoxStyle' style={{marginTop:"5px", marginLeft:"10px"}} placeholder="희망 수술 날짜"/>
                            </div>
                            <div className="surgeryRequest">
                                <input type='text' className='inputBoxStyle' style={{marginTop:"4px", width:"185px"}} placeholder="예상 수술 시간"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="toNurseBox">
                    <div className="boxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;To 간호사</h3>
                    </div>
                    <div className='boxContent'>
                            <textarea id="diagnosisTextarea" className="textareaStyle" style={{width:"88%", height:"165px"}} placeholder="간호사에게 요청할 내용을 입력하세요"></textarea>
                    </div>
                </div>
            </div>
            <div id="fourthBox">
                <div id="prescriptionBox">
                    <div className="boxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;처방</h3>
                        <button className='buttonStyle' style={{ marginTop: "14px", marginLeft:"15px" }}>약품 선택</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiagResult;