import axios from 'axios';
import '../css/DiagResult.css';
import '../css/DiagnosisPatient.css';
import MedicineModal from './MedicineModal';
import {url} from '../config'
import {useState, useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import PrescModal from './PrescModal';

const DiagResult = ({username, diagPatList, setDiagPatList, diagDueInfo, clearDiagDueInfo, selectPrevDis}) => {
    
    const [disModalIsOpen, setDisModalIsOpen] = useState(false);
    const [diseaseList, setDiseaseList] = useState([]);
    const [selectDisease, setSelectDisease] = useState('');
    const [diseaseNum, setDiseaseNum] = useState('');
    const [diseasesFilter,setDiseasesFilter] = useState('');
    const [diseaseKeyword, setDiseaseKeyword] = useState('');

    const [medModalIsOpen, setMedModalIsOpen] = useState(false);
    const [medicineList, setMedicineList] = useState([]);
    const [favMedicineList, setFavMedicineList] = useState([]);
    const [selectMedicine, setSelectMedicine] = useState([]);
    const [medSearchType, setMedSearchType] = useState('');
    const [medSearchKeyword, setmedSearchKeyword] = useState('');
    const [medicineFilter,setMedicineFilter] = useState('');

    const [formData, setFormData] = useState({
        diseaseNum: '', diagContent: '', testChecked: '', testType: '', testRequest: '',
        admChecked: '', admReason: '', admPeriod: '', surChecked: '', surReason: '',
        surDate: '', surPeriod: '', toNurse: '', selectMedicine: []
    });

    useEffect(() => {
        if(selectPrevDis.diseaseNum !== '') {
            setSelectDisease(selectPrevDis.diseaseName);
            setDiseaseNum(selectPrevDis.diseaseNum);
            
            setFormData(prevState => ({
                ...prevState,
                diseaseNum: selectPrevDis.diseaseNum, selectMedicine
            }));
        }

    }, [selectMedicine, username, selectPrevDis]);

    const inputChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox'? checked : value
        }))
    }

    const submitForm = () => {
        /* 입력 안 한 항목들 alert 띄워주기 */
        if(!selectDisease) {
            alert('병명을 선택해주세요');
            return;
        }
        if(formData.testChecked && (!formData.testType)) {
            alert('검사 종류를 선택해주세요');
            return;
        }
        if(formData.testChecked && (!formData.testRequest)) {
            alert('검사 요청 내용을 입력해주세요');
            return;
        }
        if (formData.admChecked && (!formData.admReason)) {
            alert('입원 사유를 입력해주세요');
            return;
        }
        if (formData.admChecked && (!formData.admPeriod)) {
            alert('입원 기간을 입력해주세요');
            return;
        }
        if (formData.surChecked && (!formData.surReason)) {
            alert('수술 내용을 입력해주세요');
            return;
        }
        if (formData.surChecked && (!formData.surDate)) {
            alert('수술 희망 날짜를 입력해주세요');
            return;
        }
        if (formData.surChecked && (!formData.surPeriod)) {
            alert('예상 수술 시간을 입력해주세요');
            return;
        }

        if(window.confirm(`${diagDueInfo.patName}(${diagDueInfo.patNum})환자 진료를 완료하시겠습니까?`)) {
            const requestData = {
                ...formData,
                selectMedicine,
                docNum: username,
                patNum: diagDueInfo.patNum,
                deptNum: diagPatList[0].deptNum,
                docDiagnosisNum:diagDueInfo.docDiagNum
                }
                
                axios.post(`${url}/diagnosisSubmit`, requestData)
                    .then(res=>{
                        alert(`${diagDueInfo.patName}(${diagDueInfo.patNum})환자 진료 완료`);
                        window.scrollTo(0, 0);
                        
                        clearDiagDueInfo();
                        setSelectDisease('');
                        setFormData(
                            {
                                diseaseNum: '', diagContent: '', testChecked: '', testType: '', testRequest: '',
                                admChecked: '', admReason: '', admPeriod: '', surChecked: '', surReason: '',
                                surDate: '', surPeriod: '', toNurse: '', selectMedicine: []
                            }
                        );
                        setSelectMedicine([]);
        
                        const updateDiagPatList = diagPatList.map(item => {
                            if (item.docDiagNum === diagDueInfo.docDiagNum) {
                                item.docDiagState = 'end';
                            }
                            return item;
                        })
        
                        updateDiagPatList.sort((a, b) => {
                            if (a.docDiagState === 'ing' && b.docDiagState !== 'ing') {
                                return -1;
                            }
                            if (a.docDiagState !== 'ing' && b.docDiagState === 'ing') {
                                return 1;
                            }
                            if (a.docDiagState === 'end' && b.docDiagState !== 'end') {
                                return 1;
                            }
                            if (a.docDiagState !== 'end' && b.docDiagState === 'end') {
                                return -1;
                            }
                            return 0;
                        });
        
                        setDiagPatList([...updateDiagPatList]);
            
                    })
                    .catch(err=>{
                        console.log(err);
                    })
        }
    }


    const openDiagModal = () => {
        setDiseaseKeyword('');
        setDisModalIsOpen(!disModalIsOpen);
    }

    const openMedModal = () => {
        setmedSearchKeyword('');
        setMedModalIsOpen(!medModalIsOpen);
    }

    useEffect(()=>{
        axios.get(`${url}/diseaseList?docNum=${username}`)  /* 로그인한 아이디 넣어줄 예정 */
            .then(res=>{
                setDiseaseList([...res.data]);
            })
            .catch(err=>{
                console.log(err);
            })
    }, [username])
    
    const searchMedicine = () => {
        const medListUrl = `${url}/medicineList?medSearchType=${medSearchType}&medSearchKeyword=${medSearchKeyword}`;
        axios.get(medListUrl)
            .then(res=>{
                setMedicineList([...res.data]);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    useEffect(()=>{
        searchMedicine();
        axios.get(`${url}/favMedicineList?docNum=${username}`)  /* 로그인한 아이디 넣어줄 예정 */
        .then(res=>{
            setFavMedicineList([...res.data]);
        })
        .catch(err=>{
            console.log(err);
        })
    }, [username])

    useEffect(()=>{
        if(diseaseKeyword) {
            const filtered = diseaseList.filter(disease =>
                disease.diseaseName.includes(diseaseKeyword) || 
                disease.deptName.includes(diseaseKeyword) || 
                disease.diseaseNum.toString().includes(diseaseKeyword)
            )
            setDiseasesFilter(filtered);
        } else {
            setDiseasesFilter([]);
        }
    }, [diseaseKeyword, diseaseList, username])
    
    useEffect(()=>{
        if(medSearchKeyword) {
            const filtered = medicineList.filter(medicine =>
                medicine.medicineNum.includes(medSearchKeyword) || 
                medicine.medicineEnName.includes(medSearchKeyword) || 
                medicine.medicineKorName.toString().includes(medSearchKeyword)
            )
            setMedicineFilter(filtered);
        } else {
            setMedicineFilter([]);
        }
    }, [medSearchKeyword, medicineList, username])

    const clickDiagName = (disease) => {
        setSelectDisease(disease.diseaseName);
        setDiseaseNum(disease.diseaseNum);
        setDiseaseKeyword(disease.diseaseName);
        setDisModalIsOpen(false);

        setFormData(prevState => ({
            ...prevState,
            diseaseNum: disease.diseaseNum
        }));
    }

    const inputKeyword = (text, keyword) => {
        const parts = text.split(new RegExp(`(${keyword})`,'gi'));
        /* 'g': 전역 검색(문자열 내 모든 일치 항목 찾기)
            'i': 대소문자 구분 없는 검색(대소문자 구분 없이 일치 항목 찾기) */
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === keyword.toLowerCase() ? (
                        <span key={index} style={{ color:"#FD9C66" }}>{part}</span>
                    ) : (
                        part
                    )
                )}
            </span>
        )
    }

    const addFavMedicine = (medicineNum) => {
        axios.post(`${url}/addFavMedicine`, {docNum:username, medicineNum:medicineNum})  /* 로그인한 아이디 넣어줄 예정 */
            .then(res=>{
                if (res.data === true) {
                    let tmedicine = medicineList.find(med => med.medicineNum === medicineNum);
                    setFavMedicineList([...favMedicineList, tmedicine]);
                } else if (res.data === false) {
                    setFavMedicineList(favList => favList.filter(fav => fav.medicineNum !== medicineNum));
                }
            })
            .catch(err=>{
                console.log(err);
            })
    }

    const isFavMedicine = (medicineNum) => {
        return favMedicineList.some(fav => fav.medicineNum === medicineNum);
    }

    const clickMedicine = (medicine) => {
        setSelectMedicine(prevState => {
            const exists = prevState.some(med => med.medicineNum === medicine.medicineNum);
            
            if (exists) {
                alert("이미 선택된 약품입니다.");
                return prevState;
            }

            setMedModalIsOpen(false);
            return [...prevState, { 
                        medicineNum: medicine.medicineNum, 
                        medicineKorName: medicine.medicineKorName, 
                        preDosage: '',
	                    preDosageTimes: '',
	                    preDosageTotal: '',
	                    preHowTake: ''
                    }];
        });
        
    }

    const clickMedicineName = (medicine) => {
        setmedSearchKeyword(medicine.medicineKorName);
        setMedSearchType('medKorName');
        setMedicineFilter([]);
    }

    const updateMedInfo = (index, field, value) => {
        const updateMed = [...selectMedicine];
        updateMed[index][field] = value;
        setSelectMedicine(updateMed);
    };
    

    const deleteSelectMed = (medicineNum) => {
        setSelectMedicine(prevState => prevState.filter((med, i)=> i !== medicineNum));
    }

    return (
        <div>
            <div id="thirdRow">
                <div id="diagRecordBox">
                    <div className="diagBoxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;진단</h3>
                    </div>
                    <div>
                        <div style={{marginLeft:"20px"}}>
                            <label className='labelStyle'>병명</label>
                            <input id="diagSelect" className="selectStyle" style={{cursor:"pointer"}} placeholder="병명 선택" value={selectDisease} readOnly onClick={openDiagModal}/>
                        </div>
                        <div style={{marginLeft:"20px", display:"flex", marginTop:"10px"}}>
                            <label className='labelStyle'>내용</label>
                            <textarea id="diagContent" className="textareaStyle" name="diagContent" placeholder="진단 내용" value={formData.diagContent} onChange={inputChange}></textarea>
                        </div>
                    </div>
                </div>
                <div id="addDiagRecordBox">
                    <div className="diagBoxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;추가 진단</h3>
                    </div>
                    <div className='boxContent' style={{display:"flex", justifyContent:'center', paddingBottom:'10px'}}>
                        <div id='testCheck'>
                            <div className="checkboxStyle">
                                <input type='checkbox' id="test" name='testChecked' checked={formData.testChecked} onChange={inputChange}/>
                                <label htmlFor="test">&nbsp;&nbsp;검사</label>
                            </div>
                            <div style={{display:"flex", marginBottom:"12px"}}>
                                <div className='radioStyle'>
                                    <input type='radio' id='mri' name='testType' value='MRI' style={{marginRight:"5px"}} checked={formData.testType === 'MRI'} onChange={inputChange}/>
                                    <label htmlFor='mri'>MRI</label>
                                </div>
                                <div className='radioStyle'>
                                    <input type='radio' id='ct' name='testType' value='CT' style={{marginRight:"5px"}} checked={formData.testType === 'CT'} onChange={inputChange}/>
                                    <label htmlFor='ct'>CT</label>
                                </div>
                                <div className='radioStyle'>
                                    <input type='radio' id='xray' name='testType' value='X-ray' style={{marginRight:"5px"}} checked={formData.testType === 'X-ray'} onChange={inputChange}/>
                                    <label htmlFor='xray'>X-ray</label>
                                </div>
                            </div>
                            <div id="testRequest">
                                <textarea className='addDiagTextareaStyle' style={{height:"90px"}} placeholder="검사 요청 내용" name='testRequest' value={formData.testRequest} onChange={inputChange}/>
                            </div>
                        </div>
                        <div id='adminssionCheck'>
                            <div className="checkboxStyle">
                                <input type='checkbox' id="adminssion" name='admChecked' checked={formData.admChecked} onChange={inputChange}/>
                                <label htmlFor="adminssion">&nbsp;&nbsp;입원</label>
                            </div>
                            <div className="adminssionRequest">
                                <textarea className='addDiagTextareaStyle' style={{height:"80px"}} placeholder="입원 사유" name='admReason' value={formData.admReason} onChange={inputChange}/>
                            </div>
                            <div className="adminssionRequest">
                                <input type='number' className='inputBoxStyle' style={{marginTop:"10px"}} placeholder="입원 기간" name='admPeriod' value={formData.admPeriod} onChange={inputChange}/>
                            </div>
                        </div>
                        <div id='surgeryCheck'>
                            <div className="checkboxStyle">
                                <input type='checkbox' id="surgery" name='surChecked' checked={formData.surChecked} onChange={inputChange}/>
                                <label htmlFor="surgery">&nbsp;&nbsp;수술</label>
                            </div>
                            <div className="surgeryRequest">
                                <textarea className='addDiagTextareaStyle' style={{height:"45px", width:"185px"}} placeholder="수술내용" name='surReason' value={formData.surReason} onChange={inputChange}/>
                            </div>
                            <div className="surgeryRequest">
                            <label htmlFor="surgeryDate">희망날짜</label>
                                <input type='date' className='inputBoxStyle' style={{width:"130px", marginTop:"-2px", marginLeft:"10px"}} name='surDate' value={formData.surDate} onChange={inputChange}/>
                            </div>
                            <div className="surgeryRequest">
                                <input type='number' className='inputBoxStyle' style={{marginTop:"4px", width:"185px"}} placeholder="예상 수술 시간" name='surPeriod' value={formData.surPeriod} onChange={inputChange}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="toNurseBox">
                    <div className="diagBoxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;To 간호사</h3>
                    </div>
                    <div>
                            <textarea id="diagnosisTextarea" className="textareaStyle" style={{width:"88%", height:"165px", marginLeft:"20px"}} placeholder="요청할 내용을 입력하세요" name='toNurse' value={formData.toNurse} onChange={inputChange}></textarea>
                    </div>
                </div>
            </div>
            <div id="fourthBox" >
                <div id="prescriptionBox">
                    <div className="diagBoxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                        <h3 className="sboxHeader">&nbsp;처방</h3>
                        <button className='buttonStyle' style={{ marginTop: "14px", marginLeft:"15px" }} onClick={openMedModal}>약품 선택</button>
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectMedicine.length === 0 ? (
                                <tr>
                                    <td colSpan='7'>
                                        <input className='preInputStyle' style={{width:"100%", textAlign:"center"}} value="처방 약품이 존재하지 않습니다" readOnly />
                                    </td>
                                </tr>
                            ) : (
                                selectMedicine.map((medInfo, index) => (
                                    <tr key={index}>
                                        <td>
                                            <input className='preInputStyle' style={{width:"200px"}} value={medInfo.medicineNum} readOnly />
                                        </td>
                                        <td>
                                            <input className='preInputStyle' style={{width:"400px"}} value={medInfo.medicineKorName} readOnly />
                                        </td>
                                        <td><input className='preInputStyle' value={medInfo.preDosage} onChange={(e)=>updateMedInfo(index, 'preDosage', e.target.value)}/></td>
                                        <td><input className='preInputStyle' value={medInfo.preDosageTimes} onChange={(e)=>updateMedInfo(index, 'preDosageTimes', e.target.value)}/></td>
                                        <td><input className='preInputStyle' value={medInfo.preDosageTotal} onChange={(e)=>updateMedInfo(index, 'preDosageTotal', e.target.value)}/></td>
                                        <td><input className='preInputStyle' style={{width:"250px"}}
                                                    value={medInfo.preHowTake} onChange={(e)=>updateMedInfo(index, 'preHowTake', e.target.value)}/></td>
                                        <td>
                                            <img className='delImgStyle' src='./img/deleteIcon.png' onClick={() => deleteSelectMed(index)} />
                                        </td>
                                    </tr>
                                    )
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <button className='buttonStyle' style={{margin:"15px 90px 15px 0", float:"right"}} onClick={submitForm}>진료 완료</button>
                    </div>
                </div>
            </div>
            {/* 병명 선택 모달 */}
            <Modal isOpen={disModalIsOpen} toggle={openDiagModal} style={{maxWidth:"570px"}}>
                <ModalHeader toggle={openDiagModal} className='modalTitle'>병명 정보</ModalHeader>
                <ModalBody className='diagModalBodyStyle'>
                    <div className='staticSearchbar'>
                    <div className="medSearchbar" style={{width:"430px", marginLeft:"50px"}}>
                        <input type="text"  id="keyword" style={{width:"75%", backgroundColor:"#f7f7f7", margin:'8px 30px'}} placeholder=' 검색...' value={diseaseKeyword} onChange={(e)=>setDiseaseKeyword(e.target.value)}/>
                        <label className="docSearchButton" for="searchButton1">
                            <button id="searchButton1"></button>
                        </label>            
                        {diseasesFilter.length > 0 && (
                                <div className='diagAutoCompleteDrop'>
                                    {diseasesFilter.map(disease => (
                                        <div
                                            key={disease.diseaseNum}
                                            className='diagAutoCompleteItem'
                                            onClick={()=>clickDiagName(disease)}
                                        >
                                            {inputKeyword(disease.diseaseName, diseaseKeyword)}
                                        </div>
                                    ))}
                                </div>
                            )}
                    </div>
                    </div>
                    <table className="docDiagList" style={{padding:"var(--bs-modal-padding)"}}>
                        <tbody>
                            <tr className='trTitle' style={{backgroundColor:"#FFFDF8"}}>
                                <th style={{padding:"30px 0 20px 0"}}>부서명</th>
                                <th style={{padding:"30px 0 20px 0"}}>병명코드</th>
                                <th style={{padding:"30px 0 20px 0"}}>병명</th>
                            </tr>
                            {diseaseList.map(disease=>(
                                <tr className='trContent' key={disease.diseaseNum} onClick={()=>clickDiagName(disease)}>
                                    <td style={{padding:"10px"}}>{disease.deptName}</td>
                                    <td style={{padding:"10px"}}>{disease.diseaseNum}</td>
                                    <td style={{padding:"10px"}}>{disease.diseaseName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ModalBody>
            </Modal>

            {/* 약품 선택 모달 */}
            <MedicineModal medModalIsOpen={medModalIsOpen} openMedModal={openMedModal} inputKeyword={inputKeyword} medSearchType={medSearchType} 
                        setMedSearchType={setMedSearchType} medSearchKeyword={medSearchKeyword} setmedSearchKeyword={setmedSearchKeyword}
                        medicineFilter={medicineFilter} searchMedicine={searchMedicine} clickMedicine={clickMedicine} medicineList={medicineList}
                        favMedicineList={favMedicineList} addFavMedicine={addFavMedicine} isFavMedicine={isFavMedicine} clickMedicineName={clickMedicineName}/>
        </div>
    )
}

export default DiagResult;