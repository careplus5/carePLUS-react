import '../NurPatientList.css';
const NurPatientList = () => {
    return (
        <div className="background">
            <div id="Lbox" style={{backgroundColor:"white"}}>
            <br/>
                <div className="boxHeader" style={{marginLeft:"35px"}}>
                <img id="boxIcon" style={{marginTop:"15px"}} src="./img/notice.png"/>&nbsp;
                <h3 id="LboxHeader">&nbsp;입퇴원 조회
                </h3>
                </div>
                <div className="searchLine">
                    <select id="status"> 
                        <option> 상태 </option>
                        <option id="wait"> 대기 중 </option>
                        <option id="ing"> 입원 중 </option>
                        <option id="exit"> 퇴원 </option>
                    </select>
                    <div className="searchbar">
                    <select id="keywordSort">
                    <option>구분</option>
                        <option>입원 번호</option>
                        <option>환자 번호</option>
                        <option>환자 이름(성별/나이)</option>
                        <option>입원 예정일</option>
                        <option>입원일</option>
                        <option>담당과</option>
                        <option>주치의</option>
                        <option>퇴원 예정일</option>
                        <option>퇴원일</option>

                        </select>&nbsp;|<input type="text"  id="keyword" placeholder=' 검색...'/>
                        <label id="searchButton" for="searchButton1"><button id="searchButton1"> </button></label>            
                    </div>
         
                </div>
                <br/>
                <br/>
                <br/><br/>
                <table className="list" borderless>
                    <tr>
                        <th>입원 번호</th>
                        <th>환자 번호</th>
                        <th>환자 이름(성별/나이)</th>
                        <th>입원 예정일</th>
                        <th>입원일</th>
                        <th>담당과</th>
                        <th>담당의</th>
                        <th>병실 일련 번호</th>
                        <th>퇴원 예정일</th>
                        <th>퇴원일</th>
                        <th>상태</th>
                    </tr>
                    <tr id="line"> 
                    </tr><br/>
                    <tr>
                        <td>100401041</td>
                        <td>012491211</td>
                        <td>김동현 (남/11)</td>
                        <td>24-04-08</td>
                        <td></td>
                        <td>정신과</td>
                        <td>김진솔</td>
                        <td>20488</td>
                        <td></td>
                        <td></td>
                        <td>대기중</td>

                    </tr>
                </table>
                </div>
            </div>
    )
}
export default NurPatientList;