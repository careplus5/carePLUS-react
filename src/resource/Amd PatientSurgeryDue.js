
// 수술 예약
const AmdPatientSurgeryDue = () => {
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
                        <span className='admAccTitle'>이름</span><input type="text" style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}></input>
                        <span className='admAccTitle'>성별</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}></input>
                        <span className='admAccTitle'>주치의</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}></input>
                    </div><br />

                    <div>
                        <span className='admAccTitle'>검사실</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} /><button>조회</button>
                        <span className='admAccTitle'>담당의료기사</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }}></input>
                        <span className='admAccTitle'>검사예정일</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }}></input>
                        <span className='admAccTitle'>검사예약시간</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }}></input>
                    </div><br />
                    <div>
                        <span className='admAccTitle'>검사부위</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                        <span className='admAccTitle'>주치의</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/><button>조회</button>
                        <span className='admAccTitle'>진료실</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                        <span className='admAccTitle'>예약일자</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>
                    </div><br/>
                </div>
            </div>
    )
}

export default AmdPatientSurgeryDue;