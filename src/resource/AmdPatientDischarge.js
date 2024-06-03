
// 퇴원
const AmdPatientDischarge = () => {
    return (
        <div id="LaccordionBox">
                <div style={{marginLeft:"210px", textAlign:"left"}}>
                    <div>
                        <span className='admAccTitle'>주민등록번호</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} /><button>조회</button>
                        <span className='admAccTitle'>환자번호</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}></input>
                        <span className='admAccTitle'>입원일자</span><input type="text" style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}></input>
                        <span className='admAccTitle'>이름</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}></input>
                    </div><br />

                    <div>
                        <span className='admAccTitle'>주치의</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                        <span className='admAccTitle'>진료부서</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }}></input>
                        <span className='admAccTitle'>퇴원예정일</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }}></input>
                        <span className='admAccTitle'>퇴원일</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }}></input>
                    </div><br />
                </div>
            </div>
    );
}

export default AmdPatientDischarge;