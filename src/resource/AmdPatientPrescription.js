// 처방전 발급
const AmdPatientPrescription = () => {
    return (
        <div id="LaccordionBox">
                <div style={{marginLeft:"210px", textAlign:"left"}}>
                    <div>
                        <span className='admAccTitle'>주민등록번호</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "180px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />&nbsp;&nbsp;
                        <span className='admAccTitle' style={{marginLeft:"150px"}}>처방일시</span>&nbsp;&nbsp;<input type="text"
                            style={{
                                width: "180px", height: "30px", backgroundColor: "#FFFEFB",
                                border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                            }} />
                    </div><br/>
                </div>
            </div>
    )
}

export default AmdPatientPrescription;