// 처방전 발급
const AmdPatientPrescription = () => {
    return (
        <div id="LaccordionBox">
                <div style={{ marginLeft: "150Px" }}>
                    <div>
                        <span className='admAccTitle'>환자번호</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }}></input>
                        <span className='admAccTitle'>주민등록번호</span><input type="text"
                            style={{
                                width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} /><button>조회</button>
                    </div><br/>
                </div>
            </div>
    )
}

export default AmdPatientPrescription;