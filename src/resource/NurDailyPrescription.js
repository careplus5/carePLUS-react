import '../css/App.css';
import '../css/NurDailyPrescription.css';
import PrescModal from './PrescModal';
import React, {useState} from 'react';
const NurDailyPrescription = () => {
    // 모달은 하나만 쓰는 거고 이제 버튼을 눌렀을때 2차원 배열이라고 생각하고 
    // 데이터 변경될 값을 전송? 
    // 저장 눌렀을때 데이터가 바뀌어 true값을 나타내면 색도 바꿈
    const [isPrescModalOpen, setIsPrescModalOpen] = useState(false);

    const openPrescModal = () =>{
        setIsPrescModalOpen(true);
    }

    const closePrescModal = () =>{
        setIsPrescModalOpen(false);
    }

    return(
        <div className="background">
            <div className="leftBox1">
              <div className="NDsearchbar">
                    <input type="text"  id="keyword" style={{width:"50px", backgroundColor:"transparent",marginTop:"1px"}} placeholder=' 검색...'/>
                        <label style={{top:"0px"}}
                        id="searchButton" for="searchButton1"><button id="searchButton1"> </button></label>
                        <br/><br/>
                        <div className="patList">
                            <img style={{width:"50px"}}src="./img/pati.png"/>
                            <div style={{
                                position:"relative", top:"-24px", width:"210px"
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
                <div className="LboxHeader">
                    <img id="boxIcon" style={{marginTop:"-10px"}}src="./img/write.png"/>
                    <h3 id="LboxHeader" style={{marginLeft:"10px"}}> 처방 일지</h3>
                </div>
                <br/>
                <div className="presDailyExp">
                            <div id="presX">미투약</div>&nbsp;&nbsp;&nbsp;
                            <div id="presO">정상 투약</div>&nbsp;&nbsp;&nbsp;
                            <div id="presXV">투약 X - 반환 가능</div>&nbsp;&nbsp;&nbsp;
                            <div id="presXVX">투약 X - 반환 불가</div>
                            <br/>
                </div>
                <br/>
                <div>
                    <table className="presList1" borderless>
                        <tr>
                            <th>처방 일지 번호</th>
                            <th>처방 구분</th>
                            <th>처방명</th>
                            <th>수량</th>
                            <th>횟수</th>
                            <th>날짜</th>
                            <th>&nbsp;1&nbsp;</th>
                            <th>&nbsp;2&nbsp;</th>
                            <th>&nbsp;3&nbsp;</th>
                        </tr>
                <tr>
                    <td colSpan={9}>        <div style={{width:"1300px",marginTop:"5px"}}className="line"></div></td>
                </tr>
                <tr>
                    <td>2024020215</td>
                    <td>Tablet</td>
                    <td>NS nj 100ml(Normal Saline) 0.8/100ml/bag</td>
                    <td>2 bag</td>
                    <td># 3</td>
                    <td>2024-05-24</td>
                    <td><button id="prescSelect" onClick={openPrescModal}>00:00<br/>-</button>
                    {isPrescModalOpen && <PrescModal closeModal={closePrescModal}/>}
                    </td>
                    <td><button id="prescSelect" >00:00<br/>-</button></td>
                    <td><button id="prescSelect2">00:00<br/>-</button></td>
                </tr>
                <tr>
                    <td>2024020215</td>
                    <td>Tablet</td>
                    <td>NS nj 100ml(Normal Saline) 0.8/100ml/bag</td>
                    <td>2 bag</td>
                    <td># 3</td>
                    <td>2024-05-24</td>
                    <td><button id="prescSelect">00:00<br/>-</button></td>
                    <td><button id="prescSelect">00:00<br/>-</button></td>
                    <td><button id="prescSelect2">00:00<br/>-</button></td>
                </tr>
                <tr>
                    <td>2024020215</td>
                    <td>Tablet</td>
                    <td>NS nj 100ml(Normal Saline) 0.8/100ml/bag</td>
                    <td>2 bag</td>
                    <td># 3</td>
                    <td>2024-05-24</td>
                    <td><button id="prescSelect">00:00<br/>-</button></td>
                    <td><button id="prescSelect">00:00<br/>-</button></td>
                    <td><button id="prescSelect2">00:00<br/>-</button></td>
                </tr>
                <tr>
                    <td>2024020215</td>
                    <td>Tablet</td>
                    <td>NS nj 100ml(Normal Saline) 0.8/100ml/bag</td>
                    <td>2 bag</td>
                    <td># 3</td>
                    <td>2024-05-24</td>
                    <td><button id="prescSelect">00:00<br/>-</button></td>
                    <td><button id="prescSelect">00:00<br/>-</button></td>
                    <td><button id="prescSelect2">00:00<br/>-</button></td>
                </tr>
                <tr>
                    <td>2024020215</td>
                    <td>Tablet</td>
                    <td>NS nj 100ml(Normal Saline) 0.8/100ml/bag</td>
                    <td>2 bag</td>
                    <td># 3</td>
                    <td>2024-05-24</td>
                    <td><button id="prescSelect">00:00<br/>-</button></td>
                    <td><button id="prescSelect">00:00<br/>-</button></td>
                    <td><button id="prescSelect2">00:00<br/>-</button></td>
                </tr>
                <tr>
                    <td>2024020215</td>
                    <td>Tablet</td>
                    <td>NS nj 100ml(Normal Saline) 0.8/100ml/bag</td>
                    <td>2 bag</td>
                    <td># 3</td>
                    <td>2024-05-24</td>
                    <td><button id="prescSelect">00:00<br/>-</button></td>
                    <td><button id="prescSelect">00:00<br/>-</button></td>
                    <td><button id="prescSelect2">00:00<br/>-</button></td>
                </tr>

                    </table>
                </div>

            </div>
        </div>
    )
}

export default NurDailyPrescription;