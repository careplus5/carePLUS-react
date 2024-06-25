import axios from 'axios';
import '../css/SurgeryWrite.css';
import {url} from '../config'
import {useState, useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

const SurgeryWrite = ({surgeryInfo, surPatList, setSurPatList, clearSurgeryInfo, setSurNurList}) => {

    const [isUsed, setIsUsed] = useState(true);  //혈액팩 사용여부
    const [surRecord, setSurRecord] = useState({surAnesthesia:'', surAnesthesiaPart:'', surBloodPack:'', surBloodPackCnt:'', 
            surStartTime:'', surEndTime:'', surTotalTime:'', surResult:'', surEtc:''});
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [totalTime, setTotalTime] = useState('');

    const useBloodPack = (e) => {
        setIsUsed(e.target.value === 'used');
    }

    const formatTime = (time) => {
        return time.toString().padStart(2, '0');
    }

    const clickSurStart = () => {
        const curTime = new Date();
        const formattedTime = `${formatTime(curTime.getHours())}:${formatTime(curTime.getMinutes())}:${formatTime(curTime.getSeconds())}`;
        setStartTime(formattedTime);
        setSurRecord(prevState => ({
            ...prevState,
            surStartTime: formattedTime
        }));
    }
    
    const clickSurEnd = () => {
        const curTime = new Date();
        const formattedTime = `${formatTime(curTime.getHours())}:${formatTime(curTime.getMinutes())}:${formatTime(curTime.getSeconds())}`;
        setEndTime(formattedTime);
        setSurRecord(prevState => ({
            ...prevState,
            surEndTime: formattedTime
        }));

        if (startTime) {
            calculateTotalTime(startTime, formattedTime);
        }
    }

    const calculateTotalTime = (start, end) => {
        const startTimePart = start.split(':');
        const endTimePart = end.split(":");

        const startDate = new Date();
        startDate.setHours(parseInt(startTimePart[0]));
        startDate.setMinutes(parseInt(startTimePart[1]));
        startDate.setSeconds(parseInt(startTimePart[2]));

        const endDate = new Date();
        endDate.setHours(parseInt(endTimePart[0]));
        endDate.setMinutes(parseInt(endTimePart[1]));
        endDate.setSeconds(parseInt(endTimePart[2]));

        const totalTimeMs = endDate.getTime() -startDate.getTime();

        const totalHours = Math.floor(totalTimeMs / (1000 * 60 * 60));
        const totalMinutes = Math.floor((totalTimeMs % (1000 * 60 * 60)) / (1000 * 60));
        const totalSeconds = Math.floor((totalTimeMs % (1000 * 60)) / 1000);
        const formattedTotalTime = `${formatTime(totalHours)}:${formatTime(totalMinutes)}:${formatTime(totalSeconds)}`;

        setTotalTime(formattedTotalTime);
        setSurRecord(prevState => ({
            ...prevState,
            surTotalTime: formattedTotalTime
        }));
    }

    const inputChange = (e)=> {
        const {name, value} = e.target;
        setSurRecord(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const submitSurRecord = () => {
        if(window.confirm(`${surgeryInfo.patName}(${surgeryInfo.patNum})환자 수술을 완료하시겠습니까?`)) {
            const requestData = {
                ...surRecord,
                surgeryNum: surgeryInfo.surgeryNum
            }
    
            axios.post(`${url}/surRecordSubmit`, requestData)
                .then(res=>{
                    alert(`${surgeryInfo.patName}(${surgeryInfo.patNum})환자 수술 완료`);
                    window.scrollTo(0, 0);
                    
                    clearSurgeryInfo();
                    setStartTime('');
                    setEndTime('');
                    setTotalTime('');
                    setSurNurList([]);
                    setSurRecord({surAnesthesia:'', surAnesthesiaPart:'', surBloodPack:'', surBloodPackCnt:'', 
                        startTime:'', endTime:'', totalTime:'', surResult:'', surEtc:''});
    
                    const updateSurPatList = surPatList.map(item => {
                        if(item.surgeryNum === surgeryInfo.surgeryNum) {
                            item.surgeryState = 'end';
                        }
                        return item;
                    })
    
                    updateSurPatList.sort((a, b) => {
                        if (a.surgeryState === 'ing' && b.surgeryState !== 'ing') {
                            return -1;
                        }
                        if (a.surgeryState !== 'ing' && b.surgeryState === 'ing') {
                            return 1;
                        }
                        if (a.surgeryState === 'end' && b.surgeryState !== 'end') {
                            return 1;
                        }
                        if (a.surgeryState !== 'end' && b.surgeryState === 'end') {
                            return -1;
                        }
                        return 0;
                    });
    
                    setSurPatList([...updateSurPatList]);
                })
                .catch(err=>{
                    console.log(err);
                })   
        }
    }

    return (
        <div>
            <div id="surWriteBox">
                <div className="diagBoxHeader">
                    <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                    <h3 className="sboxHeader">&nbsp;수술 기록</h3>
                </div>
                <div style={{marginLeft:"100px"}}>
                    <div className='surInfoRow'>
                        <div className='surTimeStyle'>수술 시작 시간 <input className='surRecordInputStyle' name='startTime' value={startTime} onChange={inputChange} readOnly/>
                            <button className='buttonStyle' onClick={clickSurStart}>수술 시작</button>
                        </div>
                        <div className='surTimeStyle' style={{marginLeft:"100px"}}>수술 종료 시간 <input className='surRecordInputStyle' name='endTime' value={endTime} onChange={inputChange} readOnly/>
                            <button className='buttonStyle' onClick={clickSurEnd}>수술 종료</button>
                        </div>
                        <div style={{width:'30%', marginLeft:"100px"}}>총 수술시간 <input className='surRecordInputStyle' name='surTotalTime' value={totalTime} readOnly/></div>
                    </div>
                    <div className='surInfoRow'>
                        <div style={{width:'25%'}}>마취 종류 
                            <select className="surRecordInputStyle" name='surAnesthesia' value={surRecord.surAnesthesia} onChange={inputChange}>
                                    <option disabled value="">마취 종류 선택</option>
                                    <option>전신 마취 (General Anesthesia)</option>
                                    <option>국소 마취 (Local Anesthesia)</option>
                                    <option>척추 마취 (Spinal Anesthesia)</option>
                                    <option>경막외 마취 (Epidural Anesthesia)</option>
                                    <option>신경 차단 (Nerve Block)</option>
                                    <option>진정 마취 (Sedation)</option>
                                </select>
                        </div>
                        <div style={{width:'22%', marginLeft:"65px"}}>마취 부위 
                            <input className='surRecordInputStyle' name='surAnesthesiaPart' value={surRecord.surAnesthesiaPart} onChange={inputChange}/>
                        </div>
                        <div style={{width:'44%', display:"flex", alignItems:'center'}}>혈액팩 사용 여부
                            <div className='radioStyle' style={{marginLeft:'25px' ,display:"flex", alignItems:'center'}}>
                                <input type='radio' id='used' name='radio' style={{marginRight:"5px"}} value='used' checked={isUsed} onChange={useBloodPack}/>
                                <label htmlFor='used'>사용</label>
                                <select className="surRecordInputStyle" disabled={!isUsed} name='surBloodPack' value={surRecord.surBloodPack} onChange={inputChange}>
                                    <option disabled={!isUsed} selected={!isUsed}>사용 혈액팩</option>
                                    <option>Type A Rh+</option>
                                    <option>Type B Rh+</option>
                                    <option>Type O Rh+</option>
                                    <option>Type AB Rh+</option>
                                    <option>Type A Rh-</option>
                                    <option>Type B Rh-</option>
                                    <option>Type O Rh-</option>
                                    <option>Type AB Rh-</option>
                                </select>
                                <input type='number' className='surRecordInputStyle' placeholder="사용 개수" disabled={!isUsed} name='surBloodPackCnt' style={{width:"168px"}} value={surRecord.surBloodPackCnt} onChange={inputChange}/>
                            </div>
                            <div className='radioStyle'>
                                <input type='radio' id='unused' name='radio' style={{marginRight:"5px"}} value='unused' checked={!isUsed} onChange={useBloodPack}/>
                                <label htmlFor='unused'>미사용</label>
                            </div>
                        </div>
                    </div>
                    <div className='surInfoRow'>
                        <div style={{width:'48%', display:'flex'}}>수술 기록 <textarea className='surRecordInputStyle textareaStyle' style={{width:'60%', height:'70px'}} name='surResult' value={surRecord.surResult} onChange={inputChange}/></div>
                        <div style={{width:'48%', marginRight:"30px", display:'flex'}}>특이사항 <textarea className='surRecordInputStyle textareaStyle' style={{width:'76%', height:'70px'}} name='surEtc' value={surRecord.surEtc} onChange={inputChange}/></div>
                    </div>
                </div>
                <div>
                    <button className='buttonStyle' style={{margin:"0 140px 15px 0", float:"right"}} onClick={submitSurRecord}>저장</button>
                </div>
            </div>
        </div>
    )
}

export default SurgeryWrite;