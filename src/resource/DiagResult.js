import axios from 'axios';
import '../css/DiagResult.css';
import {useState, useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

const DiagResult = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectDiag, setSelectDiag] = useState('');
    const [diseaseList, setDiseaseList] = useState([]);
    const [type, setType] = useState('');
    const [word, setWord] = useState('');

    const openDiagModal = () => {
        setModalIsOpen(!modalIsOpen);
    }

    const closeDiagModal = () => {
        setModalIsOpen(false);
    }

    const selectDiagName = (diagnosis) => {
        setSelectDiag(diagnosis);
        closeDiagModal();
    }

    useEffect(()=>{
        axios.get(`http://localhost:8090/diseaseList?docNum=1016031201`)  /* 로그인한 아이디 넣어줄 예정 */
            .then(res=>{
                setDiseaseList([...res.data]);
            })
            .catch(err=>{
                console.log(err);
            })
    }, [])

    return (
        <div>
            <div id="thirdRow">
                <div id="diagRecordBox">
                    <div className="boxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;진단</h3>
                    </div>
                    <div className='boxContent'>
                        <div style={{marginLeft:"20px"}}>
                            <label className='labelStyle'>병명</label>
                            <input id="diagSelect" className="selectStyle" placeholder="병명 선택" value={selectDiagName} readOnly onClick={openDiagModal}/>
                        </div>
                        <div style={{marginLeft:"20px", display:"flex", marginTop:"10px"}}>
                            <label className='labelStyle'>내용</label>
                            <textarea id="diagContent" className="textareaStyle" placeholder="진단 내용"></textarea>
                        </div>
                    </div>
                </div>
                <div id="addDiagRecordBox">
                    <div className="boxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;추가 진단</h3>
                    </div>
                    <div className='boxContent' style={{display:"flex", justifyContent:'center'}}>
                        <div id='testCheck'>
                            <div className="checkboxStyle">
                                <input type='checkbox' id="test"/>
                                <label htmlFor="test">&nbsp;&nbsp;검사</label>
                            </div>
                            <div style={{display:"flex", marginBottom:"12px"}}>
                                <div className='radioStyle'>
                                    <input type='radio' id='mri' name='radio'/>
                                    <label htmlFor='mri'>MRI</label>
                                </div>
                                <div className='radioStyle'>
                                    <input type='radio' id='ct' name='radio'/>
                                    <label htmlFor='ct'>CT</label>
                                </div>
                                <div className='radioStyle'>
                                    <input type='radio' id='xray' name='radio'/>
                                    <label htmlFor='xray'>X-ray</label>
                                </div>
                            </div>
                            <div id="testRequest">
                                <input type='text' className='inputBoxStyle' style={{height:"90px"}} placeholder="요청사항"/>
                            </div>
                        </div>
                        <div id='adminssionCheck'>
                            <div className="checkboxStyle">
                                <input type='checkbox' id="adminssion"/>
                                <label htmlFor="adminssion">&nbsp;&nbsp;입원</label>
                            </div>
                            <div className="adminssionRequest">
                                <input type='text' className='inputBoxStyle' style={{height:"80px"}} placeholder="입원사유"/>
                            </div>
                            <div className="adminssionRequest">
                                <input type='text' className='inputBoxStyle' style={{marginTop:"10px"}} placeholder="입원 기간"/>
                            </div>
                        </div>
                        <div id='surgeryCheck'>
                            <div className="checkboxStyle">
                                <input type='checkbox' id="surgery"/>
                                <label htmlFor="surgery">&nbsp;&nbsp;수술</label>
                            </div>
                            <div className="surgeryRequest">
                                <input type='text' className='inputBoxStyle' style={{height:"45px", width:"185px"}} placeholder="수술사유"/>
                            </div>
                            <div className="surgeryRequest">
                            <label htmlFor="surgeryDate">희망 날짜</label>
                                <input type='date' className='inputBoxStyle' style={{marginTop:"5px", marginLeft:"10px"}} placeholder="희망 수술 날짜"/>
                            </div>
                            <div className="surgeryRequest">
                                <input type='text' className='inputBoxStyle' style={{marginTop:"4px", width:"185px"}} placeholder="예상 수술 시간"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="toNurseBox">
                    <div className="boxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;To 간호사</h3>
                    </div>
                    <div className='boxContent'>
                            <textarea id="diagnosisTextarea" className="textareaStyle" style={{width:"88%", height:"165px"}} placeholder="요청할 내용을 입력하세요"></textarea>
                    </div>
                </div>
            </div>
            <div id="fourthBox">
                <div id="prescriptionBox">
                    <div className="boxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;처방</h3>
                        <button className='buttonStyle' style={{ marginTop: "14px", marginLeft:"15px" }}>약품 선택</button>
                    </div>
                    <table className='prescriptionlist'>
                        <thead>
                            <tr>
                                <th>처방 의약품 코드</th>
                                <th>처방 의약품 명칭</th>
                                <th>1회 투여량</th>
                                <th>총 투약 횟수</th>
                                <th>1일 투여 횟수</th>
                                <th>용법</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input className='preInputStyle' style={{width:"200px"}}/></td>
                                <td><input className='preInputStyle' style={{width:"400px"}}/></td>
                                <td><input className='preInputStyle'/></td>
                                <td><input className='preInputStyle'/></td>
                                <td><input className='preInputStyle'/></td>
                                <td><input className='preInputStyle' style={{width:"250px"}}/></td>
                            </tr>

                        </tbody>
                    </table>
                    <div>
                        <button className='buttonStyle' style={{marginTop:"15px", marginRight:"55px", float:"right"}}>진료 완료</button>
                    </div>
                </div>
            </div>
            {/* 병명 선택 모달 */}
            <Modal isOpen={modalIsOpen} toggle={openDiagModal} style={{maxWidth:"570px"}}>
                <ModalHeader toggle={openDiagModal} className='modalTitle'>병명 정보</ModalHeader>
                <ModalBody>
                        <div className="searchbar">
                        <select id="keywordSort" style={{width:"65px"}}>
                            <option>구분</option>
                            <option>부서명</option>
                            <option>병명코드</option>
                            <option>병명</option>
                            </select>&nbsp;|<input type="text"  id="keyword" placeholder=' 검색...'/>
                            <label id="searchButton" for="searchButton1" style={{marginTop:"5px"}}><button id="searchButton1"> </button></label>            
                    </div>
                    <table className="list" borderless>
                        <tbody>
                            <tr>
                                <th>부서명</th>
                                <th>병명코드</th>
                                <th>병명</th>
                            </tr>
                            {diseaseList.map(disease=>(
                                <tr key={disease.diseaseNum}>
                                    <td>{disease.deptName}</td>
                                    <td>{disease.diseaseNum}</td>
                                    <td>{disease.diseaseName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default DiagResult;