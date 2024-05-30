import '../css/App.css';
import '../css/NurPatientInfo.css';
import DocAdmList from './DocAdmList';
const NurPatientInfo = () => {
return (<div className="background">
<br/>
    <div className="leftBox">
        <div className="patProfile">
        <div className="boxHeader">
            <img id="boxIcon" src="/img/memo.png"/>
            <h3 id="LboxHeader">&nbsp;환자 입원 정보 &nbsp;<button style={{backgroundColor:"gray", color:"black", width:"50px", height: "20px"}}>퇴원</button> </h3>
        </div>
        <div style={{marginLeft:"60px"}}>
          <div className="admInfo">
                            <div>이름 <input className='inputStyle' disabled/></div>
                            <div style={{marginLeft:"-30px"}}>생년월일 <input className='inputStyle' disabled/></div>
                        </div>
                            <div>환자 번호<input className='inputStyle' style={{width:"405px"}} disabled/></div>
                            <br/>
                            <div>입원 내용<input className='inputStyle' style={{width:"405px", height:"50px"}} disabled /></div>
                            <br/>
                            <div>주요 증상<input className='inputStyle' style={{width:"405px"}} disabled/></div>
                            <br/>
                            <div>접수 메모<input className='inputStyle' style={{width:"405px"}} disabled/></div>
                            <br/>
                            </div>
                            
        </div>
        <div className="docOpinion">
        <div className="boxHeader">
            <img id="boxIcon" src="/img/memo.png"/> &nbsp;
            <h3 id="LboxHeader">담당의 소견</h3>
        </div>
        <input type="text" id="docOpin" disabled/>
        </div>
    </div>
    <div className="rightBox">
        <div className="boxHeader">
            <img id="boxIcon" src="/img/memo.png"/>
            <h3 id="LboxHeader">입원 일지</h3>
            <br/>
            </div>
            <table borderless>
                <tr>
                    <td style={{color:"gray"}}>날짜&nbsp;</td> <td>2024-05-07&nbsp;&nbsp;</td>
                <td style={{color:"gray"}}>담당 간호사&nbsp;</td> <td>김동현</td>
                <td><button style={{backgroundColor:"#B9EDE7", color:"black", width:"50px", height: "20px"}}>작성</button></td><td><input type="text" id="admDailyWrite" style={{display:"none"}}></input></td>
                </tr>
                <br/>

                <tr>
                    <td style={{color:"gray"}}>날짜&nbsp;</td> <td>2024-05-06&nbsp;&nbsp;</td>
                <td style={{color:"gray"}}>담당 간호사&nbsp;</td> <td>김동동</td>
                </tr>
                <tr>
                    <td colSpan={5}><input id="dailyContent" type="text" disabled></input></td>
                </tr>
                
                <br/>
                <tr className="dailyList">
                    <td style={{color:"gray"}}>날짜&nbsp;</td> <td>2024-05-06&nbsp;&nbsp;</td>
                <td style={{color:"gray"}}>담당 간호사&nbsp;</td> <td>김동동</td>
                </tr>
                <tr className="dailyList">
                    <td colSpan={5}><input id="dailyContent" type="text" disabled></input></td>
                </tr>
                
            </table>
    </div>
 <div className="bottomBox">
 <DocAdmList/>
    </div>
    </div>
)

}
export default NurPatientInfo;