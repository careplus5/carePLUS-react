import { url } from '../config';
import { useState, useEffect } from 'react';
import AdmWardListModal from './AdmWardListModal';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';


// 입원 예약
const AdmPatientAdmmission = ({ patient }) => {

    const [patNum, setPatNum] = useState(patient ? parseInt(patient.patNum) : '');
    console.log(patNum);
    console.log("1");
    // 시간 관련
    // const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');

    // 모달 오픈
    const [isWardListModalOpen, setIsWardListModalOpen] = useState(false);

    const openWordListModal = ({admissionRequestDto}) => {
        setIsWardListModalOpen(true);
      }

      const closeWardListModal = () => {
        setIsWardListModalOpen(false);
      }

    const [patientAdmission, setPatientAdmission] = useState({
        patName: '', patJumin: '', patGender: '', docNum: '', docName: '',
        patAddress: '', departmentNum: '', departmentName: '', ward: '', room: '', bed: ''
    })

    const [admissionRequestDto, setAdmissionRequestDto] = useState('');

    // 시간 배열 생성 시간을 제대로 비교하기 위해서 한자리 수의 경우에는 0을 붙어야 함
    const hours = [];
    for (let hour = 9; hour <= 18; hour++) {
        if (hour < 10) {
            hours.push(`0${hour}:00`);
        } else {
            hours.push(`${hour}:00`);
        }
        if (hour !== 18) {
            if (hour < 10) {
                hours.push(`0${hour}:30`);
            } else {
                hours.push(`${hour}:30`);
            }
        }
    }

    useEffect (()=> {
        if (!patient) {
            setAdmissionRequestDto('');
            return;
        }
        axios.post(`${url}/admissionRequestbypatientinfo`, {patNum:patNum})
            .then(res => {
                setAdmissionRequestDto(res.data);
                console.log(res.data);
                
            })
            .catch(err => {
                // alert("입원요청 환자인지 확인해주세요");
            })
        
    },[])

    const handleWardSelection = (ward, room, bed) => {
        setPatientAdmission(prevState => ({...prevState,ward,room, bed}));
      }

      const patientAdmissionRegist = () => {
        // 필요한 데이터를 객체로 만듦
        const data = {
            patNum: patNum, // 환자 번호
            admissionDate: new Date(), // 입원 일자 (예: 현재 시각)
            admissionDueDate: admissionRequestDto.admissionRequestPeriod, // 퇴원 예정 일자
            department: patientAdmission.department, // 진료과 번호
            bedsWard: patientAdmission.ward, // 병동 번호
            bedsRoom: patientAdmission.room, // 병실 번호
            bedsBed: patientAdmission.bed
            // 필요한 경우 다른 필드도 추가 가능
        };
        console.log(data);
    
        // POST 요청 보내기
        axios.post(`${url}/patientAdmissionRegist`, data)
            .then(res => {
                // 서버에서 처리한 결과에 따라 적절한 로직 추가
                console.log('입원 접수 성공:', res.data);
                // 필요한 경우 사용자에게 성공 메시지를 표시할 수도 있음
            })
            .catch(err => {
                console.error('입원 접수 실패:', err);
                // 필요에 따라 사용자에게 실패 메시지를 표시할 수도 있음
            });
    };

    return (
        <div>
            <div className="boxHeader" style={{ marginLeft: "35px" }} >
                <img id="boxIcon" style={{ marginTop:'-10px', width: "40px", height: "40px" }} src="./img/admission.png" />&nbsp;
                <h3 id="LboxHeader" style={{ marginTop:'20px', marginRight: "120px" }}>입원</h3>
                <button onClick={patientAdmissionRegist} style={{backgroundColor:'#0081b4', height:'30px', marginLeft:"1080px"}}>접수</button>
                <table style={{marginLeft:'100px'}}>
                <br/><tr>
                        <td >환자번호</td>
                        <td className='adm-tr-style' id='patNum' name='patNum' style={{width:'150px'}} colSpan={2}>{patient && patient.patNum}</td>
                        <td>이름</td>
                        <td className='adm-tr-style' id='patName' name='patName' style={{width:'100px'}}>{patient && patient.patName}</td>
                        <td >주민등록번호</td>
                        <td className='adm-tr-style' id='patJumin' name='patJumin' colSpan={5}>{patient && patient.patJumin}</td>
                        <td >성별</td>
                        <td className='adm-tr-style' id='patGender' name='patGender' >{patient && patient.patGender}</td>
                    </tr><br/>
                    <tr>
                        <td >연락처</td>
                        <td className='adm-tr-style' id='patTel' name='patTel' colSpan={2}>{patient && patient.patTel}</td>
                        <td >주소</td>
                        <td className='adm-tr-style' id='patAddress' name='patAddress' colSpan={5}>{patient && patient.patAddress}</td>
                        <td >진료과</td>
                        <td className='adm-tr-style' id='departmentName' name='departmentName'>{admissionRequestDto.departmentName}</td>
                        <td >주치의</td>
                        <td className='adm-tr-style' id='docName' name='docName' style={{width:'150px'}}>{admissionRequestDto.docName}</td>
                    </tr><br/>
                    <tr>
                        <td >입원사유</td>
                        <td className='adm-tr-style' id='admissionRequestReason' name='admissionRequestReason' colSpan={12}>{admissionRequestDto.admissionRequestReason}</td>
                    </tr><br/>
                    <tr>
                        <td>담당과</td>
                        <td className='adm-tr-style' id='departmentName' name='departmentName' colSpan={2}>{admissionRequestDto.departmentName}</td>
                        <td className='adm-tr-style' onClick={() => {setIsWardListModalOpen(true)}}>병동번호</td>
                        <td className='adm-tr-style' id='ward' name='ward' >{patientAdmission.ward}</td>
                        <td >병실번호</td>
                        <td className='adm-tr-style' id='room' name='room' style={{width:'150px'}}>{patientAdmission.room}</td>
                        <td>베드번호</td>
                        <td className='adm-tr-style' id='bed' name='bed' style={{width:'150px'}}>{patientAdmission.bed}</td>
                        <td >입원예정일</td>
                        <td className='adm-tr-style' id='admissionDate' name='addmissionDate'>{new Date().toLocaleString()}</td>
                        <td >퇴원예정일</td>
                        <td className='adm-tr-style' id='admissionDischargeDueDate' name='admissionDischargeDueDate'>{admissionRequestDto && new Date().toLocaleString() + admissionRequestDto.admissionRequestPeriod}</td>
                    </tr>
                </table>
            </div>
            {/* 병명 선택 모달 */}
            <AdmWardListModal isOpen={isWardListModalOpen} closeModal={closeWardListModal}
                admissionRequestDto={admissionRequestDto} onSelection={handleWardSelection} />
        </div>
    )
}

export default AdmPatientAdmmission;