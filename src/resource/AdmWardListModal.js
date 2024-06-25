import React, { useEffect, useState } from 'react';
import { url } from '../config';
import axios from 'axios';
const AdmWardListModal = ({ isOpen, closeWardListModal, admissionRequestDto, onSelection }) => {
  const [dept, setDept] = useState('');
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState('');
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState('');
  const [beds, setBeds] = useState([]);
  const [bed, setBed] = useState('');


  const [selectedWard, setSelectedWard] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [selectedBed, setSelectedBed] = useState('');
  console.log(admissionRequestDto.department / 10);
  const handleWardClick = (ward) => {
    setSelectedWard(parseInt(ward));
    setSelectedRoom('');
    setSelectedBed('');
  };

  // 해당 부서의 병동을 조회
  const getWardsByDepartment = async (department) => {
    try {
      const response = await axios.get(`${url}/wardsDept?department=${admissionRequestDto.department / 10}`);
      setWards(response.data);
    } catch (error) {
      console.error('Error fetching wards:', error);
    }
  };

  useEffect(() => {
    if (isOpen && admissionRequestDto && admissionRequestDto.department) {
      // 모달이 열리면 초기화
      setSelectedWard('');
      setSelectedRoom('');
      setSelectedBed('');
      setWards([]);
      setRooms([]);
      setBeds([]);
      getWardsByDepartment(admissionRequestDto.departmentNum);
    }
  }, [isOpen, admissionRequestDto]);

  // 병동에 대한 병실의 개수(리스트)
  const getRoomsByWard = async (ward) => {
    setSelectedWard(parseInt(ward));
    setSelectedRoom('');
    setSelectedBed('');
    setRooms([]);
    setBeds([]);
    try {
      const response = await axios.get(`${url}/wardsRooms?ward=${ward}`);
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(parseInt(room));
    setSelectedBed('');

  };

  // TODO: 해당 병실에 속하는 베드 조회 API 호출
  const getBedsByRoom = async (room) => {
    setSelectedRoom(parseInt(room));
    setSelectedBed('');
    setBeds([]);
    try {
      const response = await axios.get(`${url}/wardsBeds?room=${room}`);
      setBeds(response.data);
    } catch (error) {
      console.error('Error fetching beds:', error);
    }
  };

  const handleBedClick = (bed) => {
    setSelectedBed(parseInt(bed));
  };

  const checkAdmissionBed = () => {
    if (onSelection) {
      onSelection(selectedWard, selectedRoom, selectedBed);
      
    }
    closeWardListModal();

  };

  return (
    <div className="adm-admissionRequestModal" style={{ display: isOpen ? "flex" : "none", marginTop: '-450px' }}>
      <div className="wardListBox" style={{height:'600px'}}>
        <div id="LboxHeader"
        ><br />
          <h3 id="boxHeader"><img id="boxIcon" style={{ marginTop: "-5px", marginLeft: "-10px" }} src="./img/notice.png" /> &nbsp;&nbsp;{admissionRequestDto.departmentName}병동
          </h3>
        </div>
        <br /><br />
        <div className="wardContent">
          <h3>병동</h3>
          <div id="line" style={{ width: "230px" }}></div>
          <br />
          <div id="wardList">
            <select size="10" className="wardOption" value={selectedWard} onChange={(e) => setSelectedWard(ward)}>

              {wards.map((ward, index) => (
                <option value={ward} onClick={(e) => getRoomsByWard(e.target.value)} style={{ marginBottom: "10px" }}>{ward} 동</option>
              ))}

            </select>
          </div>
        </div>

      </div>

      <div className="wardListBox" style={{height:'600px'}}>
        <br /><br /><br /><br />
        <div className="wardContent">
          <h3>병실</h3>
          <div id="line" style={{ width: "230px" }}></div>
          <br />
          <div id="roomList">
            <select size="10" className="roomOption" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}>

              {rooms.map((room, index) => (
                <option value={room} onClick={(e) => getBedsByRoom(room)} style={{ marginBottom: "10px" }}>{room} 호</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="wardListBox" style={{height:'600px'}}>
        <br /><br /><br /><br />
        <div className="wardContent">
          <h3>베드</h3>
          <div id="line" style={{ width: "230px" }}></div>
          <br />
          {selectedRoom && (
            <div id="bedList">
              <select
                size="10"
                className="bedOption"
                value={selectedBed}
                onChange={(e) => {
                  const selectedBedValue = e.target.value;
                  setSelectedBed(selectedBedValue); // 선택된 침대 업데이트

                }}
              >
                {beds.map((bed, index) => (
                  <option onDoubleClick={checkAdmissionBed} key={index} value={bed} style={{ marginBottom: "10px" }}>
                    {bed} 베드
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default AdmWardListModal;