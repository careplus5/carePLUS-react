import '../css/App.css';
import '../css/NurDailyPrescription.css';
const NurDailyPrescription = () => {
    return(
        <div className="background">
            <br/>
            <div className="leftBox1">
              <div className="NDsearchbar">
                    <input type="text"  id="keyword" placeholder=' 검색...'/>
                        <label id="searchButton" for="searchButton1"><button id="searchButton1"> </button></label>
                        <br/><br/>
                        <div className="patList">
                            <img style={{width:"50px"}}src="./img/pati.png"/>
                            <div style={{
                                position:"relative", top:"-9px", width:"200px", left:"-4px"
                            }} className="line"></div>
                            <table className="presList" borderless>
                                <tr>
                                    <th>병실</th>
                                    <th>환자명</th>
                                    <th>S/A</th>
                                </tr>
                                <tr style={{fontWeight:"normal"}}>
                                   <td>2552</td>
                                    <td>김동현</td>
                                    <td>F/100</td>
                                </tr>
                            </table>
                            </div>   
                    </div>
                   
            </div>
            <div className="rightBox1">
                <div className="boxHeader">
                    <img id="boxIcon" src="./img/write.png"/>
                    <h3 id="boxHeader"> 처방 일지</h3>
                </div>
                <br/>
                <div className="presDailyExp">
                            <div id="presX">미투약</div>&nbsp;&nbsp;&nbsp;
                            <div id="presO">정상 투약</div>&nbsp;&nbsp;&nbsp;
                            <div id="presXV">투약 X - 반환 가능</div>&nbsp;&nbsp;&nbsp;
                            <div id="presXVX">투약 X - 반환 불가</div>
                            <br/>
                            

                </div>
            </div>
        </div>
    )
}

export default NurDailyPrescription;