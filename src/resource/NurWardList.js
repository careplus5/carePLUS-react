import '../css/NurWardList.css';
import '../css/NurPatientList.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { url } from '../config';
import { useAtomValue, useAtom,useSetAtom } from 'jotai';
import { admAtom, accessTokenAtom, usernameAtom,tokenAtom} from '../config/Atom.js';
import NurPatientInfo from './NurPatientInfo';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
const NurWardList = () => {
    const username = useAtomValue(usernameAtom);
    const accessToken = useAtomValue(accessTokenAtom);
    const [dept, setDept] = useState('');
    const [wards, setWards] = useState([]);
    const [ward, setWard]=useState('');
  const [rooms, setRooms] = useState([]);
  const [room,setRoom] = useState('');
  const [beds, setBeds] = useState([]);
  const [bed, setBed] = useState('');
  const [bedsNum, setBedsNum] = useState('');
  const [admissionNum, setAdmissionNum] = useState('');
  const [bedDetails, setBedDetails] = useState(null);
     // room이 변경될 때마다 beds 상태 업데이트
  //    useEffect(() => {
  //     if (selectedRoom !== null) { // selectedRoom이 null이 아닐 때만 실행
  //         getBedsByRoom(selectedRoom);
  //     }
  // }, [selectedRoom]);

    const [isClickedDept, setIsClickedDept] = useState({
        소화기과: false,
        순환기과: false,
        호흡기과: false,
        내분비과: false,
      });

    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('1');
    const [selectedBed, setSelectedBed] = useState('');

    const handleDepartmentClick = (department) => {
        setIsClickedDept({
          ...isClickedDept,
          [department]: !isClickedDept[department],
        });
        setSelectedDepartment(department);
        setSelectedWard('');
        setSelectedRoom('');
        setSelectedBed('');
    
      };

      const getWardsByDepartment = async (department) => {
        setDept(department);
        console.log(dept);
        try {
          const response = await axios.get(`${url}/wardsDept?department=${department}`);
          setWards(response.data);
        } catch (error) {
          console.error('Error fetching wards:', error);
        }
    }

    const handleWardClick = (ward) => {
        setSelectedWard(ward);
        setSelectedRoom('');
        setSelectedBed('');
    };

    const getRoomsByWard = async (ward) => {

        setWard(ward);
        console.log(ward);
        try {
          const response = await axios.get(`${url}/wardsRooms?ward=${ward}`);
          setRooms(response.data);
        } catch (error) {
          console.error('Error fetching rooms:', error);
        }
      };
    const handleRoomClick = (room) => {
        setSelectedRoom(room);
        setSelectedBed('');

    };

      // TODO: 해당 병실에 속하는 베드 조회 API 호출
      const getBedsByRoom = async (room) => {
        setSelectedRoom(room);
        setRoom(room);
        console.log(room);
        try {
          const response = await axios.get(`${url}/wardsBeds?room=${room}`);
          setBeds(response.data);
        } catch (error) {
          console.error('Error fetching beds:', error);
        }
      };
    const handleBedClick = (bed) => {
        setSelectedBed(bed);
    };

    const getBedDetails = async (dept, ward, room, bed)  => {  
        console.log("department: "+dept);
        console.log("ward: "+ward);
        console.log("room: "+room);
        console.log("bed: "+bed);
        try {
          const response = await axios.get(`${url}/wardsBed`,{ params: {
            department: dept,
            ward: ward,
            room: room,
            bed: bed
          }})
          console.log("adm: "+JSON.stringify(response.data));
          setBedDetails(response.data);
          console.log("admNum: "+response.data.admissionNum);
          setAdmissionNum(response.data.admissionNum);
        } catch (error) {
          console.error('Error fetching bed details:', error);
        }
      };

    const getDepartmentContent = () => {
        switch (selectedDepartment) {
            case '소화기과': return '소화기과';
            case '순환기과': return '순환기과';
            case '호흡기과': return '호흡기과';
            case '내분비과': return '내분비과';
        }
    };
    


    return(
        <div className="background" style={{display:"flex"}}>
            <div className="wardListBox">
            <div id="LboxHeader" 
                ><br/>
                <h3 id="sboxHeader"><img id="boxIcons" style={{marginTop:"-5px", marginLeft:"-10px"}} src="./img/ward.png"/> 병동 조회
                </h3>
                </div>
                <br/><br/>
                <div className="wardContent">
                    
                    <h3>담당과</h3>
                    <div id="line" style={{width:"260px"}}></div>
                    <br/>
                    <div className="wardDepartment" style={{fontSize:"15px"}}>
                     <select size="10" className="deptOption" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
  <option value="소화기과" style={{marginBottom:"10px"}} onClick={() => getWardsByDepartment(1)}>소화기과</option>
  <option value="순환기과" style={{marginBottom:"10px"}} onClick={() => getWardsByDepartment(2)}>순환기과</option>
  <option value="호흡기과" style={{marginBottom:"10px"}} onClick={() => getWardsByDepartment(3)}>호흡기과</option>
  <option value="내분비과" style={{marginBottom:"10px"}} onClick={() => getWardsByDepartment(4)}>내분비과</option>
</select>
                    </div>
                </div>
            </div>


            <div className="wardListBox">
                <br/><br/><br/><br/>
            <div className="wardContent">
            <h3>병동</h3>
            <div id="line" style={{width:"260px"}}></div>
            <br/>
            <div id="wardList">
            <select size="10" className="wardOption" value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)}>
                {wards.map((ward,index)=>(
         <option value="${ward}" onClick={() => getRoomsByWard(ward)} style={{marginBottom:"10px"}}>{ward} 병동</option>
                ))}
                         </select>
                    </div>
                </div>
            </div>
               {/* 병실 */}
                <div className="wardListBox">
                    <br /><br /><br /><br />
                    <div className="wardContent">
                        <h3>병실</h3>
                        <div id="line" style={{ width: "260px" }}></div>
                        <br />
                        <div id="roomList">
  <select
    size="10"
    className="roomOption"
    value={selectedRoom}
    onChange={(e) => {
      const selectedRoomValue = e.target.value;
      setSelectedRoom(selectedRoomValue); // 선택된 방 업데이트

      // 선택된 방에 맞는 침대 정보 가져오기
      getBedsByRoom(selectedRoomValue);
    }}
  >
    {rooms.map((room, index) => (
      <option key={index} value={room} style={{ marginBottom: "10px" }}>
        {room} 호
      </option>
    ))}
  </select>
</div>
                </div>
                    </div>
            

            <div className="wardListBox">
            <br/><br/><br/><br/>
            <div className="wardContent">
            <h3>베드</h3>
            <div id="line" style={{width:"260px"}}></div>
            <br/>
            {selectedRoom && (
      <div id="bedList">
      <select
        size="10"
        className="bedOption"
        value={selectedBed}
        onChange={(e) => {
          const selectedBedValue = e.target.value;
          setSelectedBed(selectedBedValue); // 선택된 침대 업데이트
          console.log("setSelectedBed: "+selectedBedValue);
          // 선택된 침대에 맞는 침대 상세 정보 가져오기
          getBedDetails(dept, ward, room, selectedBedValue);
        }}
      >
        {beds.map((bed, index) => (
          <option key={index} value={bed}   style={{
            marginTop: "10px",
            color: admissionNum == '444' ? "rgb(124, 156, 190)" : "grey"
        }}
          >
            {bed}번
          </option>
        ))}
      </select>
    </div>
            )}
                </div>
            </div>


            <div className="wardListBox">
            <br/><br/><br/><br/>
            <div className="wardContent">
                {bedDetails && (bedDetails.admissionNum != '444' || bedDetails.admissionNum ===null)?
               <h3>베드 정보 <div id="usedWard">사용 중</div></h3>:<h3>베드 정보</h3> }
            
            <div id="line" style={{width:"260px"}}></div>
            <br/>
            {selectedBed && (
            <div id="bedDetails">
                         {bedDetails && (bedDetails.admissionNum !='444' || bedDetails.admissionNum === null) ? 
                                <>
                                   <p>베드 번호: {bedDetails.bedsNum}</p>
                                    <p>입원 번호: {bedDetails.admissionNum}</p>
                                    <p>입원일: {bedDetails.admissionDate}</p>
                                    <p>퇴원 예정일: {bedDetails.admissionDischargeDueDate}</p>
                              </> : <><p>해당 베드는 사용 가능합니다.</p></>}
                    </div>
            )}
                </div>
                
            </div> 
        </div>
    )
}

export default NurWardList;