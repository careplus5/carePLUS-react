
// 수술 예약
const AdmPatientSurgeryDue = () => {
    return (
        <div id="LaccordionBox">
                <div style={{marginLeft:"210px", textAlign:"left"}}>
                    <div>
                        <span >환자번호</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                            <button style={{marginLeft:"10px"}}>조회</button>
                        <span  style={{marginLeft:"25px"}}>주민등록번호</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span  style={{marginLeft:"25px"}}>이름</span>
                        <input type="text" style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span  style={{marginLeft:"25px"}}>성별</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "70px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span  style={{marginLeft:"25px"}}>혈액형</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "70px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                    </div><br />

                    <div>
                        <span >진료과</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span  style={{marginLeft:"45px"}}>주치의</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                        <span  style={{marginLeft:"45px"}}>수술사유</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "560px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    </div><br />
                    <div>
                        <span >수술날짜</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                        <button style={{marginLeft:"10px"}}>조회</button>
                        <span  style={{marginLeft:"42px"}}>수술실</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                        <span  style={{marginLeft:"42px"}}>수술시작시간</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                        <span  style={{marginLeft:"42px"}}>예상수술시간</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                    </div><br/>

                    <div>
                        <span >수술간호사 스케줄 조회</span>
                        <button style={{marginLeft:"10px"}}>조회</button>
                        <span  style={{marginLeft:"35px"}}>수술 간호사1</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                        <span  style={{marginLeft:"35px"}}>수술 간호사2</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                        <span  style={{marginLeft:"35px"}}>수술 간호사3</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                    </div><br/>
                </div>
            </div>
    )
}

export default AdmPatientSurgeryDue;