
// 퇴원
const AdmPatientDischarge = ({patient}) => {
    return (
        <div id="LaccordionBox">
            <div className="boxHeader" style={{ marginLeft: "35px" }} >
                <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/register.png" />&nbsp;
                <h3 id="LboxHeader" style={{ marginTop: "20px", marginRight: "1230px" }}>퇴원</h3>
                <button style={{ marginTop: "21px" }} >접수</button>
                <div>
                    <span >환자번호</span>
                    <input type="text" value={patient && patient.patNum}
                        style={{
                            marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <span style={{ marginLeft: "21px" }}>주민등록번호</span>
                    <input type="text" value={patient && patient.patJumin}
                        style={{
                            marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <span style={{ marginLeft: "21px" }}>이름</span>
                    <input type="text" value={patient && patient.patName}
                    style={{
                        marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                        border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                    }} />
                    <span style={{ marginLeft: "21px" }}>입원일자</span>
                    <input type="text"
                        style={{
                            marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                </div><br />

                <div>
                    <span>주치의</span>
                    <input type="text"
                        style={{
                            marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <span style={{ marginLeft: "55px" }}>진료부서</span>
                    <input type="text"
                        style={{
                            marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <span style={{ marginLeft: "55px" }}>퇴원예정일</span>
                    <input type="text"
                        style={{
                            marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <span style={{ marginLeft: "55px" }}>퇴원일</span>
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

export default AdmPatientDischarge;