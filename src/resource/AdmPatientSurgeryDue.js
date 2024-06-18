
// 수술 예약
const AdmPatientSurgeryDue = ({patient}) => {
    return (
        <div id="LaccordionBox">
            <div className="boxHeader" style={{ marginLeft: "35px" }}>
                <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/surgery.png" />&nbsp;
                <h3 id="LboxHeader" style={{ marginTop: "20px", marginRight: "1230px" }}>수술</h3>
                <div>
                    <span >환자번호</span>
                    <input type="text" value={ patient && patient.patNum}
                        style={{
                            marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <span style={{ marginLeft: "25px" }}>주민등록번호</span>
                    <input type="text" value={ patient && patient.patJumin}
                        style={{
                            marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <span style={{ marginLeft: "25px" }}>이름</span>
                    <input type="text" value={ patient && patient.patName}
                    style={{
                        marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                        border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                    }} />
                    <span style={{ marginLeft: "25px" }}>성별</span>
                    <input type="text" value={ patient && patient.patGender}
                        style={{
                            marginLeft: "10px", width: "70px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <span style={{ marginLeft: "25px" }}>혈액형</span>
                    <input type="text" value={ patient && patient.patBloodType}
                        style={{
                            marginLeft: "10px", width: "70px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                </div><br />

                <div>
                    <span >진료과</span>
                    <input type="text"
                        style={{
                            marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <span style={{ marginLeft: "45px" }}>주치의</span>
                    <input type="text"
                        style={{
                            marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <span style={{ marginLeft: "45px" }}>수술사유</span>
                    <input type="text"
                        style={{
                            marginLeft: "10px", width: "560px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                </div><br />
                <div>
                    <span >수술날짜</span>
                    <input type="text"
                        style={{
                            marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <button style={{ marginLeft: "10px" }}>조회</button>
                    <span style={{ marginLeft: "42px" }}>수술실</span>
                    <input type="text"
                        style={{
                            marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <span style={{ marginLeft: "42px" }}>수술시작시간</span>
                    <input type="text"
                        style={{
                            marginLeft: "10px", width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <span style={{ marginLeft: "42px" }}>예상수술시간</span>
                    <input type="text"
                        style={{
                            marginLeft: "10px", width: "150px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                </div><br />

                <div>
                    <span >수술간호사 스케줄 조회</span>
                    <button style={{ marginLeft: "10px" }}>조회</button>
                    <span style={{ marginLeft: "35px" }}>수술 간호사1</span>
                    <input type="text"
                        style={{
                            marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <span style={{ marginLeft: "35px" }}>수술 간호사2</span>
                    <input type="text"
                        style={{
                            marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                    <span style={{ marginLeft: "35px" }}>수술 간호사3</span>
                    <input type="text"
                        style={{
                            marginLeft: "10px", width: "200px", height: "30px", backgroundColor: "#FFFEFB",
                            border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
                        }} />
                </div><br />
            </div>
        </div>
    )
}

export default AdmPatientSurgeryDue;