import "../css/NurPatientInfo.css";
const DocAdmList = () => {
    return (
        <div className="longBox">
            <div className="boxHeader">
            <img id="boxIcon" src="/img/memo.png"/>
            <h3 id="LboxHeader">&nbsp;의사 입원 진료</h3>
        </div>
        <table borderless>
            <br/>
        <tr>
                    <td style={{color:"gray"}}>날짜&nbsp;</td> <td>2024-05-06&nbsp;&nbsp;</td>
                <td style={{color:"gray"}}>담당 의사&nbsp;</td> <td>김동동</td>
                </tr>
                <tr>
                    <td colSpan={5}><input id="docContent" type="text" disabled></input></td>
                </tr>
                
        </table>
        </div>
    )
}

export default DocAdmList;