import { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';

// 검사 예약
const AdmPatientTest = ({ patient }) => {
    // 원외 검사 추가 기능
    const [isChecked, setIsChecked] = useState(false);

    // 관련 코드 (원외 검사)
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleUpload = () => {
        // 파일 업로드 로직을 구현할 수 있습니다.
        alert('파일을 업로드합니다.');
    };

    // 환자번호
    const [patNum, setPatNum] = useState('');

    // 모달 (부서에 대한 정보 검색)
    const [admDiagDuedisModalIsOpen, setAdmDiagDuedisModalIsOpen] = useState(false);

    // 모달 오픈
    const openAdmDiagDueModal = () => {
        setAdmDiagDuedisModalIsOpen(true);
    }

    // 모달에서 시간 셀 클릭 핸들러 
    const handleTimeCellClick = (time, docName) => {
        console.log('Selected Time:', time);
        console.log('Selected Doctor Name:', docName);
        // 선택된 의사의 정보 가져오기
        // const selectedDoctorInfo = doctors.find(doctorDue => doctorDue[0].docName === docName);
        // if (selectedDoctorInfo) {
        //     const docNum = selectedDoctorInfo[0].docNum; // 선택된 의사의 docNum
        //     setSelectedTime(time);
        //     setSelectedDoctor(docName);
        //     setSelectedDocNum(docNum); // 선택된 의사의 docNum 설정
        //     setAdmDiagDuedisModalIsOpen(false); // 모달 닫기
        // } else {
        //     console.error('의사 정보를 가지고 오지 못했음');
        // }
        // setSelectedTime(time);
        // setSelectedDoctor(docName);
        // setAdmDiagDuedisModalIsOpen(false); // 모달 닫기
    };

    return (

        <div id="">
            <div className="boxHeader" style={{ marginLeft: "35px" }}>
                <img id="boxIcon" style={{ width: "40px", height: "40px" }} src="./img/test.png" />&nbsp;
                <h3 id="LboxHeader" style={{ marginTop: "20px", marginRight: "120px" }}>검사</h3>
                <button style={{backgroundColor:'#0081b4', height:'30px', marginLeft:"920px"}} >접수</button>
                <div style={{marginLeft:'175px'}}>
                    <br/><span>환자번호</span>
                    <input type="text" name='patNum' value={patient && patient.patNum}
                        className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}} onChange={(e) => setPatNum(e.target.value)} />

                    <span style={{ marginLeft: "12px" }}>환자 이름</span>
                    <input name='patName' type="text" value={patient && patient.patName}
                        readOnly
                        className='admInputType' style={{marginLeft: "10px", width: "150px", height: "30px"}} />
                    <span style={{ marginLeft: "12px" }}>주민등록번호</span>
                    <input name='patJumin' type="text" value={patient && patient.patJumin}
                        readOnly
                        className='admInputType' style={{marginLeft: "10px", width: "200px", height: "30px"}} />
                    <span style={{ marginLeft: "12px" }}>성별</span>
                    <input name='patGender' type="text" value={patient && patient.patGender}
                        readOnly
                        className='admInputType' style={{marginLeft: "10px", width: "50px", height: "30px"}} />
                </div><br />
                <div style={{marginLeft:'175px'}}>
                    <span>검사실</span>
                    <select id="admStatus">
                        <option>검사실 선택</option>
                        <option>CT</option>
                        <option>MRI</option>
                        <option>X-Ray</option>
                    </select>
                    <button  style={{backgroundColor:'#0081b4', height:'30px', marginLeft:"20px"}} onClick={openAdmDiagDueModal}>조회</button>
                    <span style={{ marginLeft: "27px" }}>예정일</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "150px", height: "30px"}} />
                    <span style={{ marginLeft: "27px" }}>예약시간</span>
                    <input name='patTel' type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "100px", height: "30px"}} />
                    <span style={{ marginLeft: "27px" }}>주치의</span>
                    <input name='patTel' type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "150px", height: "30px"}} />
                </div><br />
                <div style={{marginLeft:'175px'}}>
                    <span >검사부위</span>
                    <input type="text"
                        className='admInputType' style={{marginLeft: "10px", width: "650px", height: "30px"}} />
                    <span style={{ marginLeft: "35px" }}>원외검사기록여부</span>
                    <input type="checkbox"
                        className='admInputType' style={{marginLeft: "20px", alignItems:'center', height:'30px'}}
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    {isChecked && (
                         <div style={{ marginTop: '10px' }}>
                         <input type="text"
                        className='admInputType' style={{width:'900px', height:'30px'}}
                        />
                         <input type="file" 
                         className='admInputType' style={{marginLeft: "10px", width: "50px", height: "30px"}}/>
                         <br/><button style={{ backgroundColor:'#0081b4', width:'900px', height:'30px'}} onClick={handleUpload}>Upload</button>
                       </div>
                    )}
                </div><br />
            </div>
            {/* 병명 선택 모달 */}
            <Modal isOpen={admDiagDuedisModalIsOpen} toggle={openAdmDiagDueModal} style={{ maxWidth: "1100px" }}>
                <ModalHeader toggle={openAdmDiagDueModal} className='modalTitle'>주치의 스케줄 조회</ModalHeader>
                <ModalBody className='amdDiagDueModalBodyStyle'>
                    <button >pre</button><button >next</button>
                    <table className="admDoctorDueSceduleList" style={{ maxWidth: '1035px', tableLayout: 'fixed', maxHeight: '200%', overflow: "scroll" }}>
                        <thead>
                            <tr>
                                <th>검사실</th>
                                <th>검사실</th>
                                <th>검사실</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                        </tbody>
                    </table>
                </ModalBody>
            </Modal>
        </div>

    )
}

export default AdmPatientTest;