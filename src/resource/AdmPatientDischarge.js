
// 퇴원
const AdmPatientDischarge = () => {
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
                        <span  style={{marginLeft:"21px"}}>주민등록번호</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span  style={{marginLeft:"21px"}}>입원일자</span>
                        <input type="text" style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span  style={{marginLeft:"21px"}}>이름</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                    </div><br />

                    <div>
                        <span>주치의</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span style={{marginLeft:"55px"}}>진료부서</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                        <span  style={{marginLeft:"55px"}}>퇴원예정일</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                        <span  style={{marginLeft:"55px"}}>퇴원일</span>
                        <input type="text"
                            style={{
                                marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    </div><br />
                </div>
            </div>
    );
}

export default AdmPatientDischarge;