
// 기타 문서 발급
const AdmPatientStorage = () => {
    return (
        <div id="LaccordionBox">
            <div>
                <div className="boxHeader" style={{ marginLeft: "35px" }} >
                    <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/document.png" />&nbsp;
                    <h3 id="LboxHeader" style={{ marginTop: "19px", marginRight: "1125px" }}>기타 문서 발급</h3>
                    <button style={{ marginTop: "21px" }} >접수</button>
                    <span>환자번호</span>
                    <input type="text"
                        style={{
                            marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <span style={{ marginLeft: "150px" }}>날짜</span>
                    <input type="text"
                        style={{
                            marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                </div><br />
            </div>
        </div>
    );
}

export default AdmPatientStorage;