
// 기타 문서 발급
const AdmPatientStorage = () => {
    return (
        <div id="LaccordionBox">
            <div>
                <div style={{marginLeft:"210px", textAlign:"left"}}>
                    <span>환자번호</span>
                    <input type="text"
                        style={{
                            marginLeft:"10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <span style={{marginLeft:"150px"}}>날짜</span>
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

export default AdmPatientStorage;