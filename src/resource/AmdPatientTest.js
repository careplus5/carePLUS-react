import {useState, useEffect} from 'react';


// 검사 예약
const AmdPatientTest = () => {
    return (
            <div id="LaccordionBox">
                <div style={{marginLeft:"210px", textAlign:"left"}}>
                    <div>
                        <span className='admAccTitle'>주민등록번호</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />&nbsp;&nbsp;<button>조회</button>
                        <span className='admAccTitle'>환자번호</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />&nbsp;&nbsp;
                        <span className='admAccTitle'>이름</span>&nbsp;&nbsp;<input type="text" style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />&nbsp;&nbsp;
                        <span className='admAccTitle'>성별</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />&nbsp;&nbsp;
                        <span className='admAccTitle'>주치의</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />&nbsp;&nbsp;
                    </div><br />

                    <div>
                        <span className='admAccTitle'>검사실</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />&nbsp;&nbsp;<button>조회</button>
                        <span className='admAccTitle'>담당의료기사</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }}></input>
                        <span className='admAccTitle'>검사예정일</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />&nbsp;&nbsp;
                        <span className='admAccTitle'>검사예약시간</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />&nbsp;&nbsp;
                    </div><br />
                    <div>
                        <span className='admAccTitle'>검사부위</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>&nbsp;&nbsp;
                        <span className='admAccTitle'>주치의</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>&nbsp;&nbsp;<button>조회</button>
                        <span className='admAccTitle'>진료실</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>&nbsp;&nbsp;
                        <span className='admAccTitle'>예약일자</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}/>&nbsp;&nbsp;
                    </div><br/>
                </div>
            </div>
        
    )
}

export default AmdPatientTest;