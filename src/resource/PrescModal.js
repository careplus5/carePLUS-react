import React, {useState} from 'react';
import "../css/NurDailyPrescription.css";
const PrescModal = () =>{

    // 처방 일지 모달

    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);

    const handleClicks = [
        () => {setIsChecked1(!isChecked1)},
        () => {setIsChecked2(!isChecked2)},
        () => {setIsChecked3(!isChecked3)},
        () => {setIsChecked4(!isChecked4)}
    ]

     const handleClick1=()=>{
        setIsChecked1(!isChecked1);
    }
    
    const handleClick2=()=>{
        setIsChecked2(!isChecked2);
    }
    
    const handleClick3=()=>{
        setIsChecked3(!isChecked3);
    }

    const handleClick4=()=>{
        setIsChecked4(!isChecked4);
    }
    

    return(
        <div className="PrescModalbox">
            <br/>
            <div className="boxHeader">
                <h3 id="boxHeader" style={{margin:"0 auto"}}>처방 상태 변경</h3>
            </div>
            <br/>
            <div className="prescContent">
                
            <label className={isChecked1 ? 'labelL radio-checked':'labelL'}  style={{backgroundColor:"lightgray"}}for="presX1">
                        <input type="radio" id="presX1" style={{ height:"20px",display:"none", zIndex:"9999"}} onClick={handleClick1}/>미투약
                            </label>

                        <label className={isChecked2 ? 'labelL radio-checked':'labelL'} style={{backgroundColor:"#F7CE7E"}} for="presX2">
                        <input type="radio" id="presX2" style={{ height:"20px",display:"none", zIndex:"9999"}} onClick={handleClick2}/>정상 투약
                            </label>


                        <label className={isChecked3 ? 'labelL radio-checked':'labelL'} style={{backgroundColor:"#609E66"}} for="presX3">
                        <input type="radio" id="presX3" style={{ height:"20px",display:"none", zIndex:"9999"}} onClick={handleClick3}/>투약 X - 반환 가능
                            </label>

                        <label className={isChecked4 ? 'labelL radio-checked':'labelL'} style={{backgroundColor:"red", marginBottom:"15px"}} for="presX4">
                        <input type="radio" id="presX4" style={{ height:"20px",display:"none", zIndex:"9999"}} onClick={handleClick4}/>투약 X - 반환 불가
                            </label>
                            </div>               
                            <button id="button1" style={{margin:"0"}}>저장</button>
                </div>
    )
}

export default PrescModal;