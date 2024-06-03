
// 기타 문서 발급
const AmdPatientStorage = () => {
    return (
        <div id="LaccordionBox">
            <div>
                <div style={{marginLeft:"210px", textAlign:"left"}}>
                    <span className='admAccTitle'>주민등록번호</span><input type="text"
                        style={{
                            width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }}></input>
                    <span className='admAccTitle'>날짜</span><input type="text"
                        style={{
                            width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} /><button>조회</button>
                </div><br />
            </div>
        </div>
    );
}

export default AmdPatientStorage;