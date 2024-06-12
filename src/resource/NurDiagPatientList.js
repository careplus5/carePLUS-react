import '../css/NurPatientList.css';
const NurDiagPatientList = () => {
    // 기능 1. 상태에서 환자를 누르면 환자 상세 페이지로 넘어감
    // 기능 2. 상태를 고르면 해당 상태인 환자만 조회됨
    // 기능 3. 구분에서 키워드 종류를 고르고 검색하면 그 키워드를 갖고 있는 환자만 조회됨 
    
    return (
        <div className="background">
            <div id="Lbox" style={{backgroundColor:"white"}}>
            <br/>
                <div className="LboxHeader"
                >
                <img id="boxIcon" style={{marginTop:"15px", marginLeft:"15px"}} src="./img/notice.png"/>
                <h3 id="boxHeader">환자 목록
                </h3>
                </div>
                <div className="searchLine">
                    <select id="status"> 
                        <option> 상태 </option>
                        <option id="wait"> 대기 중 </option>
                        <option id="ing"> 완료 </option>
                    </select>
                    <div className="searchbar">
                    <select id="keywordSort">
                    <option>구분</option>
                        <option>진료 번호</option>
                        <option>환자 번호</option>
                        <option>환자 이름(성별/나이)</option>
                        <option>진료일</option>
                        <option>담당과</option>
                        <option>담당 의사</option>
                        <option>진료실</option>
                        <option>상태</option>
                        </select>&nbsp;|<input type="text"  id="keyword" placeholder=' 검색...'/>
                        <label id="searchButton" for="searchButton1"><button id="searchButton1"> </button></label>            
                    </div>
         
                </div>
                <br/>
                <br/>
                <br/><br/>
                <table className="admList" borderless>
                    <tr>
                        <th>진료 번호</th>
                        <th>환자 번호</th>
                        <th>환자 이름(성별/나이)</th>
                        <th>진료일</th>
                        <th>담당과</th>
                        <th>담당의</th>
                        <th>진료실</th>
                        <th>상태</th>
                        <th>진료</th>
                    </tr>
                    <tr id="line"> 
                    </tr><br/>
                    <tr>
                        <td>100401041</td>
                        <td>012491211</td>
                        <td>김동현 (남/11)</td>
                        <td>24-04-08</td>
                        <td>내과</td>
                        <td>김진솔</td>
                        <td>101호</td>
                        <td>대기중</td>
                        <td><button style={{backgroundColor:"#B9EDE7", color:"black"}}id="buttonStyle">진료</button></td>

                    </tr>
                </table>
                </div>
            </div>
    )
}
export default NurDiagPatientList;