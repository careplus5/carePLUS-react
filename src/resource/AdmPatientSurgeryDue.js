import { useState, useEffect } from "react";
import {Table,Button,Modal,ModalHeader,ModalBody,Input} from 'reactstrap';
import axios from "axios";
import { url } from "../config";
import "../css/Admt.css";
// 수술 예약
const AdmPatientSurgeryDue = ({ patient }) => {
    const [tableWidth, setTableWidth] = useState(0);
    const [isModal, setIsModal] = useState(false);
    const [isNurModal, setIsNurModal] = useState(false);
    const [surReq, setSurReq] = useState(null);//
    const [selectedDate, setSelectedDate] = useState(null);//선택된 수술일자
    const [opRoomList, setOpRoomList] = useState([]);//수술실 목록
    const [opUseCheckList, setOpUseCheckList] = useState([]);//수술실 예약된 목록
    const [selOpRoom, setSelOpRoom] = useState(null);//선택된 수술실
    const [opNurList, setOpNurList] = useState([]); //해당과 수술간호사 목록
    const [opSurNurList, setOpSurNurList] = useState([]); //해당과 수술간호사 중 예약된 간호사 목록
    const [nurseList, setNurseList] = useState([null,null,null]); //간호사1,간호사2,간호사3
    const [nurIdx, setNurIdx] = useState(0); //선택할 간호사 순서
    const [noReq, setNoReq] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        console.log("useEffect")
        setSelectedDate(new Date());
        setSurReq(null)
        setNurseList([null,null,null])
        setSelOpRoom(null)
        setNoReq(false);
        setMessage('')
        if (patient === null) return;
        axios.post(`${url}/surgeryRequest`, { patNum: patient.patNum })
            .then(res => {
                console.log(res)
                if(res.data==='') {
                    setMessage('* 등록된 수술 요청이 없습니다. *')
                    setNoReq(true);
                }
                setSurReq(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [patient])

    const selectOper = (date) => {
        if(noReq) return;
        axios.post(`${url}/opRoomUseCheck`, {date:date.toISOString().split('T')[0]})
            .then(res=>{
                console.log(res)
                setOpRoomList(res.data.opRoomList)
                setOpUseCheckList(res.data.opUseCheckList);
                setTableWidth((res.data.opRoomList.length + 1) * 100);
                setIsModal(true);
            })
            .catch(err=> {
                console.log(err)
            })
    }

    // 모달에서 시간 셀 클릭 핸들러 
    const handleTimeCellClick = (time, room) => {
        // 선택된 의사의 정보 가져오기
        setSelOpRoom({
            ...selOpRoom,
            surgeryDueDate: selectedDate.toISOString().split('T')[0],
            surgeryDueStartTime: time,
            operationRoomNum: room
        })
        setIsModal(false); // 모달 닫기
    };

    // 모달에서 시간 셀 클릭 핸들러 
    const handleNurseCellClick = (time, nurse) => {
        if(nurseList.find(nur=>nur&&nur.nurNum===nurse.nurNum)) {
            alert('이미 선정된 간호사입니다.')
            return
        }
        setNurseList(nurseList.map((nur,idx)=>{
            if(idx+1===nurIdx) return nurse;
            else return nur;
        }))
        setIsNurModal(false); // 모달 닫기
    };    

    const queryNurse = (date) => {
        if(noReq) return;
        axios.post(`${url}/surNurseList`, 
            {departmentNum:surReq.departmentNum, surDate:date.toISOString().split('T')[0]})
            .then(res=> {
                console.log(res)
                setOpNurList(res.data.nurseList);
                setOpSurNurList(res.data.surNurList);
                setTableWidth((res.data.nurseList.length + 1) * 100);
                setIsNurModal(true);
            })
            .catch(err=> {
                console.log(err)
            })
    }

    const nurseDelete = (e, idx) => {
        if(noReq) return;
        e.stopPropagation(); 
        setNurseList(nurseList.map((nur,index)=>{
            if(index+1===idx) return null
            else return nur;
        }));
    }

    const reserveSurgery = (e) => {
        if(selOpRoom===null) {
            alert("수술실과 날짜를 선택하세요.")
            return;
        }
        console.log(nurseList)
        const nur = nurseList.find(n=>n!==null)
        console.log(nur)
        if(nur===undefined) {
            let res = window.confirm("간호사를 선택하지 않았습니다. 수술예약을 하시겠습니까?")
            if(res===false) return;
        } else {
            let res = window.confirm("수술예약을 하시겠습니까?")
            if(res===false) return;
        }
        const surgery = {
                    patNum:patient.patNum,
                    departmentNum:surReq.departmentNum,
                    docNum:surReq.docNum,
                    surgeryRequestNum:surReq.surgeryRequestNum,
                    ...selOpRoom, 
                    nurNum1: nurseList[0]?nurseList[0].nurNum : null,
                    nurNum2: nurseList[1]?nurseList[1].nurNum : null,
                    nurNum3: nurseList[2]?nurseList[2].nurNum : null,
                    }
        axios.post(`${url}/reserveSurgery`,surgery)
            .then(res=> {
                console.log(res.data)
                if(res.data===true) {
                    alert("수술 예약 성공");
                    setNoReq(true);
                } else {
                    alert("수술 예약 실패");
                }
            })
            .catch(err=> {
                console.log(err)
                alert("수술 예약 실패");
            })
    }

    return (
        <div style={{width:"90%"}}>
            <div className="" style={{ marginLeft: "35px", paddingBottom: "34px" }}>
                <img style={{ marginTop: "0px", width: "40px", height: "40px" }} alt='' src="./img/surgery.png" />&nbsp;
                <h3 id="LboxHeader" style={{ marginTop: "34px", marginRight: "20px", display:'inline-block' }}>수술예약</h3>
                <span style={{color:"red"}}>{message}</span><br/><br/>
                    <Table bordered style={{width:"90%"}} >
                        <tbody>
                            <tr>
                                <th width="100px">환자번호</th>
                                <td width="150px">{patient && patient.patNum}</td>
                                <th width="100px">주민등록번호</th>
                                <td width="150px">{patient && patient.patJumin}</td>
                                <th width="100px">이름</th>
                                <td width="150px">{patient && patient.patName}</td>
                                <th width="100px">성별</th>
                                <td width="100px">{patient && patient.patGender}</td>
                                <th width="100px">혈액형</th>
                                <td width="100px">{patient && patient.patBloodType}</td>
                            </tr>
                            <tr>
                                <th>진료과</th>
                                <td>{surReq? surReq.departmentName:''}</td>
                                <th>집도의</th>
                                <td>{surReq && surReq.docName}</td>
                                <th>수술사유</th>
                                <td colspan={5}>{surReq && surReq.surReason}</td>
                            </tr>
                            <tr>
                                <th>수술실</th>
                                <td onClick={()=>selectOper(selectedDate)}>{selOpRoom && selOpRoom.operationRoomNum}</td>
                                <th>수술날짜</th>
                                <td onClick={()=>selectOper(selectedDate)}>{selOpRoom && selOpRoom.surgeryDueDate}</td>
                                <th>수술시간</th>
                                <td onClick={()=>selectOper(selectedDate)}>{selOpRoom && selOpRoom.surgeryDueStartTime}</td>
                                <th>예상시간</th>
                                <td colSpan={3}>{surReq && surReq.surPeriod}</td>
                            </tr>
                            <tr>
                                <th>간호사1</th>
                                <td onClick={()=>{queryNurse(selectedDate);setNurIdx(1)}}>
                                    {nurseList[0] && nurseList[0].nurName}&nbsp;&nbsp;&nbsp;
                                    {nurseList[0] &&
                                        <img src="/img/x.png" alt='' width={"20px"} style={{border:"solid 1px lightgray"}} 
                                            onClick={(e)=>nurseDelete(e,1)}/>}
                                </td>
                                <th>간호사2</th>
                                <td onClick={()=>{queryNurse(selectedDate);setNurIdx(2)}}>
                                    {nurseList[1] && nurseList[1].nurName}&nbsp;&nbsp;&nbsp;
                                    {nurseList[1] &&
                                        <img src="/img/x.png" alt='' width={"20px"} style={{border:"solid 1px lightgray"}} 
                                            onClick={(e)=>nurseDelete(e,2)}/>}
                                </td>
                                <th>간호사3</th>
                                <td onClick={()=>{queryNurse(selectedDate);setNurIdx(3)}}>
                                    {nurseList[2] && nurseList[2].nurName}&nbsp;&nbsp;&nbsp;
                                    {nurseList[2] &&
                                        <img src="/img/x.png" alt='' width={"20px"} style={{border:"solid 1px lightgray"}} 
                                            onClick={(e)=>nurseDelete(e,3)}/>}
                                </td>
                                <td colSpan={4}>
                                    <Button onClick={reserveSurgery} disabled={noReq}>수술예약</Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>

            </div>

            {/* 간호사 예약 모달 */}
            <Modal isOpen={isNurModal} style={{ maxWidth: `${tableWidth + 180}px`}} contentClassName='surgery-modal-style'>
                <ModalHeader toggle={() => setIsNurModal(false)} className='modalTitle' >
                    간호사 : {selectedDate && selectedDate.toISOString().split('T')[0]}
                </ModalHeader>
                <ModalBody >
                    <table>
                        <thead>
                            <tr>
                                <td></td>
                                <td>
                               <Input type="date" value={selectedDate && selectedDate.toISOString().split('T')[0]} 
                                    onChange={(e)=>{
                                        setSelectedDate(new Date(e.target.value));
                                        queryNurse(new Date(e.target.value))
                                    }}/>
                            </td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <button onClick={() => {
                                        const newDate = selectedDate;
                                        newDate.setDate(newDate.getDate()-1);                                
                                        setSelectedDate(newDate);
                                        queryNurse(newDate);
                                    }}>
                                        <img src="/prev.png" alt='' width="50px" />
                                    </button>&nbsp;
                                </td>
                                <td>
                                    <Table bordered style={{ width: `${tableWidth}px` }}>
                                        <thead >
                                            <tr >
                                                <th style={{ width: '100px' }}>예약시간</th>
                                                {opNurList.length > 0 && opNurList.map(nur => (
                                                    <th key={nur.nurNum} >{nur.nurName}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {['AM','PM'].map(time => (
                                                <tr key={time}>
                                                    <td>{time}</td>
                                                    {opNurList.map(nurse => {
                                                        const nur = opSurNurList.find(surnur =>
                                                            surnur.nurNum === nurse.nurNum && surnur.time === time);
                                                        return (
                                                            nur ?
                                                                <td
                                                                    key={nur.nurNum}
                                                                    style={{ border: '1px solid lightgray', cursor: nur ? 'not-allowed' : 'pointer', backgroundColor: nur ? '#e0e0e0' : '#fff' }}>
                                                                    {nur ? '예약' : ''}
                                                                </td> :
                                                                <td onClick={(e) => handleNurseCellClick(time, nurse)}></td>
                                                        )
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </td>
                                <td>&nbsp;
                                    <button onClick={() => {
                                        const newDate = selectedDate;
                                        newDate.setDate(newDate.getDate()+1);                                
                                        setSelectedDate(newDate);
                                        queryNurse(newDate);
                                    }}>
                                        <img src="/next.png" alt='' width="50px" />
                                    </button>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </ModalBody>
            </Modal>  

           {/* 수술실 예약 모달                                             */}
           <Modal isOpen={isModal} style={{ maxWidth: `${tableWidth + 180}px` }} contentClassName='surgery-modal-style'>
                <ModalHeader toggle={() => setIsModal(false)} className='modalTitle' >
                    수술실 : {selectedDate && selectedDate.toISOString().split('T')[0]}
                </ModalHeader>
                <ModalBody>
                    <table>
                        <thead>
                            <tr>
                                <td></td>
                                <td>
                               <Input type="date" value={selectedDate && selectedDate.toISOString().split('T')[0]} 
                                    onChange={(e)=>{
                                        setSelectedDate(new Date(e.target.value));
                                        selectOper(new Date(e.target.value));
                                    }}/>
                            </td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <button onClick={() => {
                                        const newDate = selectedDate;
                                        newDate.setDate(newDate.getDate()-1);
                                        setSelectedDate(newDate);
                                        selectOper(newDate);
                                    }}>
                                        <img src="/prev.png" alt='' width="50px" />
                                    </button>&nbsp;
                                </td>
                                <td>
                                    <Table bordered style={{ width: `${tableWidth}px` }}>
                                        <thead >
                                            <tr >
                                                <th style={{ width: '100px' }}>예약시간</th>
                                                {opRoomList.length > 0 && opRoomList.map(room => (
                                                    <th key={room} >OR:{room}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {['AM','PM'].map(time => (
                                                <tr key={time}>
                                                    <td>{time}</td>
                                                    {opRoomList.map(room => {
                                                        const ur = opUseCheckList.find(useRoom =>
                                                            useRoom.time === time && useRoom.surgeryNum === room);
                                                        return (
                                                            ur ?
                                                                <td
                                                                    key={ur.num}
                                                                    style={{ border: '1px solid lightgray', cursor: ur ? 'not-allowed' : 'pointer', backgroundColor: ur ? '#e0e0e0' : '#fff' }}>
                                                                    {ur ? '예약' : ''}
                                                                </td> :
                                                                <td onClick={(e) => handleTimeCellClick(time, room)}></td>
                                                        )
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </td>
                                <td>&nbsp;
                                    <button onClick={() => {
                                        const newDate = selectedDate;
                                        newDate.setDate(newDate.getDate()+1);
                                        setSelectedDate(newDate);
                                        selectOper(newDate);
                                    }}>
                                        <img src="/next.png" alt='' width="50px" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </ModalBody>
            </Modal>                       
        </div>
    )
}

export default AdmPatientSurgeryDue;