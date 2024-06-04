import {useState, useEffect} from 'react';


// 검사 예약
const AdmPatientTest = () => {
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
                        <span   style={{marginLeft:"10px"}}>이름</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "100px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span   style={{marginLeft:"10px"}}>주민등록번호</span>
                        <input type="text" style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span   style={{marginLeft:"10px"}}>성별</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span style={{marginLeft:"10px"}}>주치의</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                    </div><br />

                    <div>
                        <span >검사실</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                            <button style={{marginLeft:"10px"}}>조회</button>
                        <span style={{marginLeft:"150px"}}>검사예정일</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                        <span style={{marginLeft:"150px"}}>검사예약시간</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    </div><br />
                    <div>
                        <span >검사부위</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "970px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                        <span  style={{marginLeft:"35px"}}>원외검사기록여부</span>
                        <input type="checkbox"
                            style={{
                                marginLeft:"10px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                    </div><br/>
                </div>
            </div>
        
    )
}

export default AdmPatientTest;