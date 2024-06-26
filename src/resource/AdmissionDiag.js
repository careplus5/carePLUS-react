import axios from 'axios';
import '../css/DiagnosisPatient.css';
import '../css/AdmissionDiagPatient.css';
import '../css/AdmissionDiag.css'
import { url } from '../config'
import { useState, useEffect } from 'react';
import MedicineModal from './MedicineModal.js';

const AdmissionDiag = ({username, admPatList, setAdmPatList, admPatInfo, clearAdmPatInfo, newRecordContent, newRecordDate, admDiagNum }) => {

    const [formData, setFormData] = useState({
        admRecordDate:'', admRecordContent:'', docDiagnosisNum:'', testChecked:'', testType: '', 
        testRequest: '', surChecked: '', surReason: '', surDate: '', surPeriod: '', selectMedicine: []
    });

    const [medModalIsOpen, setMedModalIsOpen] = useState(false);
    const [selectMedicine, setSelectMedicine] = useState([]);
    const [medSearchType, setMedSearchType] = useState('');
    const [medSearchKeyword, setmedSearchKeyword] = useState('');
    const [medicineFilter,setMedicineFilter] = useState('');
    const [medicineList, setMedicineList] = useState([]);
    const [favMedicineList, setFavMedicineList] = useState([]);

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            selectMedicine
        }));
    }, [selectMedicine, username]);

    const inputChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox'? checked : value
        }))
    }

    const submitForm = () => {
        /* 입력 안 한 항목들 alert 띄워주기 */
        if(formData.testChecked && (!formData.testType)) {
            alert('검사 종류를 선택해주세요');
            return;
        }
        if(formData.testChecked && (!formData.testRequest)) {
            alert('검사 요청 내용을 입력해주세요');
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

        if(window.confirm(`${admPatInfo.patName}(${admPatInfo.patNum})환자 진료를 완료하시겠습니까?`)) {
            const requestData = {
                ...formData,
                selectMedicine,
                admRecordDate: newRecordDate,
                admRecordContent: newRecordContent,
                docNum: username,
                patNum: admPatInfo.patNum,
                deptNum: admPatList[0].deptNum,
                docDiagnosisNum: admDiagNum,
                admissionNum: admPatInfo.admissionNum
            }
                
            axios.post(`${url}/admDiagnosisSubmit`, requestData)
            .then(res=>{
                    alert(`${admPatInfo.patName}(${admPatInfo.patNum})환자 진료 완료`);
                    window.scrollTo(0, 0);
                    
                    clearAdmPatInfo();
                    setFormData(
                        {
                            admRecordDate:newRecordDate, admRecordContent:newRecordContent, 
                            testType: '', testRequest: '', surChecked: '', surReason: '', surDate: '', surPeriod: '', selectMedicine: []
                        }
                    );
                    setSelectMedicine([]);
    
                    const updateAdmPatList = admPatList.map(item => {
                        if (item.admissionNum === admPatInfo.admissionNum) {
                            item.admissionDiagState = 'wait';
                        }
                        return item;
                    })
    
                    updateAdmPatList.sort((a, b) => {
                        if (a.admissionDiagState === 'ing' && b.admissionDiagState !== 'ing') {
                            return -1;
                        }
                        if (a.admissionDiagState !== 'ing' && b.admissionDiagState === 'ing') {
                            return 1;
                        }
                        return 0;
                    });
    
                    setAdmPatList([...updateAdmPatList]);
        
                })
                .catch(err=>{
                    console.log(err);
                })
        }
    }

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

    const openMedModal = () => {
        setmedSearchKeyword('');
        setMedModalIsOpen(!medModalIsOpen);
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
        axios.post(`http://localhost:8090/addFavMedicine`, {docNum:username, medicineNum:medicineNum})  /* 로그인한 아이디 넣어줄 예정 */
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

    const updateMedInfo = (index, field, value) => {
        const updateMed = [...selectMedicine];
        updateMed[index][field] = value;
        setSelectMedicine(updateMed);
    };
    

    const deleteSelectMed = (medicineNum) => {
        setSelectMedicine(prevState => prevState.filter((med, i)=> i !== medicineNum));
    }

    return (
        <div style={{display:'flex'}}>
            <div id="admAddDiagRecordBox">
                <div className="diagBoxHeader">
                    <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                    <h3 className="sboxHeader">&nbsp;추가 진단</h3>
                </div>
                <div className='boxContent' style={{ display: "flex", justifyContent: 'center', paddingBottom: '10px' }}>
                    <div id='testCheck'>
                        <div className="checkboxStyle">
                            <input type='checkbox' id="test" name='testChecked' checked={formData.testChecked} onChange={inputChange}/>
                            <label htmlFor="test">&nbsp;&nbsp;검사</label>
                        </div>
                        <div style={{ display: "flex", marginBottom: "12px" }}>
                            <div className='radioStyle'>
                                <input type='radio' id='mri' name='testType' value='MRI' style={{ marginRight: "5px" }} checked={formData.testType === 'MRI'} onChange={inputChange}/>
                                <label htmlFor='mri'>MRI</label>
                            </div>
                            <div className='radioStyle'>
                                <input type='radio' id='ct' name='testType' value='CT' style={{ marginRight: "5px" }} checked={formData.testType === 'CT'} onChange={inputChange}/>
                                <label htmlFor='ct'>CT</label>
                            </div>
                            <div className='radioStyle'>
                                <input type='radio' id='xray' name='testType' value='X-ray' style={{ marginRight: "5px" }} checked={formData.testType === 'X-ray'} onChange={inputChange}/>
                                <label htmlFor='xray'>X-ray</label>
                            </div>
                        </div>
                        <div id="testRequest">
                            <textarea className='addDiagTextareaStyle' style={{ height: "90px" }} placeholder="검사 요청 내용" name='testRequest' value={formData.testRequest} onChange={inputChange}/>
                        </div>
                    </div>
                    <div id='surgeryCheck'>
                        <div className="checkboxStyle">
                            <input type='checkbox' id="surgery" name='surChecked' checked={formData.surChecked} onChange={inputChange}/>
                            <label htmlFor="surgery">&nbsp;&nbsp;수술</label>
                        </div>
                        <div className="surgeryRequest">
                            <textarea className='addDiagTextareaStyle' style={{ height: "45px", width: "185px" }} placeholder="수술내용" name='surReason' value={formData.surReason} onChange={inputChange}/>
                        </div>
                        <div className="surgeryRequest">
                            <label htmlFor="surgeryDate">희망날짜</label>
                            <input type='date' className='inputBoxStyle' style={{ width: "130px", marginTop: "-2px" }} name='surDate' value={formData.surDate} onChange={inputChange}/>
                        </div>
                        <div className="surgeryRequest">
                            <input type='number' className='inputBoxStyle' style={{ marginTop: "4px", width: "185px" }} placeholder="예상 수술 시간" name='surPeriod' value={formData.surPeriod} onChange={inputChange}/>
                        </div>
                    </div>
                </div>
            </div>
            <div id="admPrescriptionBox">
                <div className="diagBoxHeader">
                    <img id="boxIcon" style={{ marginTop: "12px" }} src="./img/notice.png" />&nbsp;
                    <h3 className="sboxHeader">&nbsp;처방</h3>
                    <button className='buttonStyle' style={{ marginTop: "14px", marginLeft: "15px" }} onClick={openMedModal}>약품 선택</button>
                </div>
                <div style={{maxHeight:'186px', overflowY:'auto'}}>
                    <table className='prescriptionlist' style={{width:'1030px'}}>
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
                                            <input className='admPreInputStyle' style={{width:"100%", textAlign:"center"}} value="처방 약품이 존재하지 않습니다" readOnly />
                                        </td>
                                    </tr>
                                ) : (
                                    selectMedicine.map((medInfo, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input className='admPreInputStyle' value={medInfo.medicineNum} readOnly />
                                            </td>
                                            <td>
                                                <input className='admPreInputStyle' style={{width:'290px'}} value={medInfo.medicineKorName} readOnly />
                                            </td>
                                            <td><input className='admPreInputStyle' style={{width:'100px'}}  value={medInfo.preDosage} onChange={(e)=>updateMedInfo(index, 'preDosage', e.target.value)}/></td>
                                            <td><input className='admPreInputStyle' style={{width:'100px'}} value={medInfo.preDosageTimes} onChange={(e)=>updateMedInfo(index, 'preDosageTimes', e.target.value)}/></td>
                                            <td><input className='admPreInputStyle' style={{width:'100px'}} value={medInfo.preDosageTotal} onChange={(e)=>updateMedInfo(index, 'preDosageTotal', e.target.value)}/></td>
                                            <td><input className='admPreInputStyle' value={medInfo.preHowTake} onChange={(e)=>updateMedInfo(index, 'preHowTake', e.target.value)}/></td>
                                            <td>
                                                <img className='delImgStyle' src='./img/deleteIcon.png' onClick={() => deleteSelectMed(index)} />
                                            </td>
                                        </tr>
                                        )
                                ))}
                        </tbody>
                    </table>
                    <div>
                        <button className='buttonStyle' style={{ margin: "15px 35px 15px 0", float: "right" }} onClick={submitForm}>진료 완료</button>
                    </div>
                </div>
            </div>
            {/* 약품 선택 모달 */}
            <MedicineModal medModalIsOpen={medModalIsOpen} openMedModal={openMedModal} inputKeyword={inputKeyword} medSearchType={medSearchType} setMedSearchType={setMedSearchType} medSearchKeyword={medSearchKeyword} setmedSearchKeyword={setmedSearchKeyword}
                        medicineFilter={medicineFilter} searchMedicine={searchMedicine} clickMedicine={clickMedicine} medicineList={medicineList}
                        favMedicineList={favMedicineList} addFavMedicine={addFavMedicine} isFavMedicine={isFavMedicine} clickMedicineName={clickMedicineName}/>

        </div>
    )
}

export default AdmissionDiag;