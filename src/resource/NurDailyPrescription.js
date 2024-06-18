import '../css/App.css';
import '../css/NurDailyPrescription.css';
import PrescModal from './PrescModal';
import '../css/NurPatientInfo.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { admAtom, usernameAtom,accessTokenAtom } from '../config/Atom.js';
import { useAtomValue, useSetAtom } from 'jotai';
import { url } from '../config.js';
const NurDailyPrescription = () => {
    const [buttonNum, setButtonNum]=useState('');
    const [fetched, setFetched] = useState(false); // 데이터를 이미 가져왔는지 여부를 나타내는 상태 변수
    const [admList,setAdmList] = useState([]);
    const accessToken = useAtomValue(accessTokenAtom);
    const username = useAtomValue(usernameAtom);
    const setAdmissionPatient = useSetAtom(admAtom); // jotai의 useSetAtom 사용
    const count = 1;
    const [selectedState, setSelectedState] = useState('');
    const [filteredAdmList, setFilteredAdmList] = useState([]);
    const [keywordValue, setKeywordValue] = useState('');
    const [prescriptionList, setPrescriptionList]=useState([]);
    const [prescription,setPrescription]=useState({
        prescriptionNum:'',
        docNum:'',
        medicineNum:'',
        patNum:'',
        prescriptionDate:'',
        prescriptionDosage:'',
        prescriptionDosageTimes:'',
        prescriptionDosageTotal:'',
        prescriptionHowTake:'',
        prescFre1:'',
        prescFre2:'',
        prescFre3:'',
        buttonCount:'',

    })
    const [modalStates, setModalStates] = useState([
        { isOpen: false, buttonNum: '1' },
        { isOpen: false, buttonNum: '2' },
        { isOpen: false, buttonNum: '3' }
    ]);

    const getBackgroundColor = (prescFre1) => {
        if (prescFre1.includes('success')) {
            return '#F7CE7E';
        } else if (prescFre1.includes('returnO')) {
            return 'green';
        } else if (prescFre1.includes('returnX')) {
            return 'red';
        } else {
            return 'gray'; // 필요한 경우 기본 색상 지정
        }
    };

    function prescInfo(admission) {
        axios.get(`${url}/prescList`,{ params: { patNum: admission.patNum } })
        .then(res=>{
            const mappedDailyList = res.data.map(item => ({
                prescriptionNum:item.prescriptionNum,
        docNum:item.docNum,
        medicineNum:item.medicineNum,
        patNum:item.patNum,
        prescriptionDate:item.prescriptionDate,
        prescriptionDosage:item.prescriptionDosage,
        prescriptionDosageTimes:item.prescriptionDosageTimes,
        prescriptionDosageTotal:item.prescriptionDosageTotal,
        prescriptionHowTake:item.prescriptionHowTake,
        prescFre1:item.prescFre1,
        prescFre2:item.prescFre2,
        prescFre3:item.prescFre3,
              }));
              setPrescriptionList(mappedDailyList);

              mappedDailyList.forEach(item => {
                if (item.prescriptionHowTake) {
                    const takeTimes = item.prescriptionHowTake.split(',');
                    item.buttonCount = takeTimes.length; // 각 요소에 buttonCount 필드 추가
            
                }
            });

              
        })
        .catch(err=>{
            console.log(err);
        })
    }


    const keyChange = (e) =>{
        if (keywordValue === null) {
            setAdmList(admList);
        } else {
            setFilteredAdmList(admList.filter(admission => admission.setKeyword === setKeywordValue));
            
        }
    }
const enterPress = (e) =>{
    if(e.key === 'Enter'){
        keyChange();
    }
}
    const [admission, setAdmission] = useState({
        admissionNum: '',
        patNum:'',
        patName:'',
        admissionDueDate:'',
        admissionDate:'',
        docDepartmentName:'',
        admissionReason:'',
        admissionHandover:'',
        admissionDoctorOpinion:'',
        admissionDisChargeOpinion:'',
        docName:'',
        bedsNum:'',
        admissionDischargeDueDate:'',
        admissionDischargeDate:'',
        admissionStatus:'',
    })
    useEffect(()=>{
        console.log("nurPatientList redirect");
        if(username==='') return;
       
        console.log(`${url}/wardDailyPresc?nurNum=${username}`);
        axios.get(`${url}/wardDailyPresc?nurNum=${username}`, {headers: {Authorization: accessToken}, params: {nurNum:username},maxReirects:0})
        .then(response=>{ 
            console.log(username);
            console.log("이 데이터는 말입니다: "+JSON.stringify(response.data));
            console.log("react's token: "+accessToken);
            // setAdmList([...JSON.stringify(response.data)]);
            const data = response.data[0];
            const mappedData = response.data.map(data=>({
                admissionNum: data.admission.admissionNum,
                patName:data.patName,
                patNum: data.admission.patNum,
                admissionDueDate: data.admission.admissionDueDate,
                admissionDate: data.admission.admissionDate,
                docDepartmentName: data.docDepartment,
                admissionReason:data.admission.admissionReason,
                admissionHandover:data.admissionHandover,
                admissionDoctorOpinion:data.admission.admissionDoctorOpinion,
                admissionDisChargeOpinion:data.admission.admissionDisChargeOpinion,
                docName: data.docName,
                bedsNum: data.admission.bedsNum,
                admissionDischargeDueDate: data.admission.admissionDischargeDueDate,
                admissionDischargeDate: data.admission.admissionDischargeDate,
                admissionStatus: data.admission.admissionStatus,
            }));

            const filteredData = mappedData.filter(admission => admission.admissionStatus === "ing");
            setAdmList(filteredData);
            setFetched(true);
        })
        .catch(err => {
            console.log(JSON.stringify(err));
            console.log("react's failedtoken: "+accessToken);
            console.error("error:"+err);
        })
       
    },[count]);
    // jotai 
    // 토큰 세션스토리지에 넣으렴 .
    useEffect(() => {
        if (selectedState === '') {
            setFilteredAdmList(admList);
        } else {
            setFilteredAdmList(admList.filter(admission => admission.admissionStatus === selectedState));
        }
    }, [selectedState, admList]);
    
   


    // 모달은 하나만 쓰는 거고 이제 버튼을 눌렀을때 2차원 배열이라고 생각하고 
    // 데이터 변경될 값을 전송? 
    // 저장 눌렀을때 데이터가 바뀌어 true값을 나타내면 색도 바꿈
    const [isPrescModalOpen, setIsPrescModalOpen] = useState(false);
    const [selectedPrescription, setSelectedPrescription] = useState(null);


    
    const openPrescModal = (e, prescription,buttonNum) =>{
        // // const buttonNum = e.target.getAttribute('name').slice(0,1); // 버튼의 name 속성 가져오기
        // // setSelectedPrescription(prescription);
        // const updatedModalStates = modalStates.map(state => ({
        //     ...state,
        //     isOpen: state.buttonNum === buttonNum
        // }));
        // console.log(buttonNum);
        // setPrescription({...prescription,
        //     buttonNum:buttonNum,
        // });
        // setModalStates(updatedModalStates);
        // setSelectedPrescription(prescription);
        e.preventDefault();
        const updatedModalStates = modalStates.map((state) => ({
          ...state,
          isOpen: true,
        }));
        setModalStates(updatedModalStates);
        setSelectedPrescription(prescription);
    }

    const closePrescModal = () =>{
       
        const updatedModalStates = modalStates.map(state => ({
            ...state,
            isOpen: false
        }));
        setModalStates(updatedModalStates);
    }

    return(
        <div className="background">
            <div className="leftBox1">
              <div className="NDsearchbar">
                    <input type="text"  id="keyword" style={{width:"50px", backgroundColor:"transparent",marginTop:"1px"}} placeholder=' 검색...'/>
                        <label style={{top:"0px"}}
                        id="searchButton" for="searchButton1"><button id="searchButton1"> </button></label>
                        <br/><br/>
                        <div className="patList">
                            <img style={{width:"50px"}}src="./img/pati.png"/>
                            <div style={{
                                position:"relative", top:"-24px", width:"210px"
                            }} className="line"></div>
                           
                            <table className="presList" borderless>
                            <tr>
                                    <th>병실</th>
                                    <th>환자명</th>
                                    <th>S/A</th>
                                </tr>
                            {filteredAdmList.map(admission =>(
                                <tr className="patList" key={admission.admNum} onClick={()=>prescInfo(admission)}>
                                    <td>{admission.bedsNum}</td>
                                    <td>{admission.patName}</td>
                                    <td>성별/나이</td>
                    </tr>))}
                            </table>
                            </div>   
                    </div>
                   
            </div>
            <div className="rightBox1" style={{right:"100px"}}>
                <div className="LboxHeader">
                    <img id="boxIcon" style={{marginTop:"-10px"}}src="./img/write.png"/>
                    <h3 id="LboxHeader" style={{marginLeft:"10px"}}> 처방 일지</h3>
                </div>
                <br/>
                <div className="presDailyExp">
                            <div id="presX">미투약</div>&nbsp;&nbsp;&nbsp;
                            <div id="presO">정상 투약</div>&nbsp;&nbsp;&nbsp;
                            <div id="presXV">투약 X - 반환 가능</div>&nbsp;&nbsp;&nbsp;
                            <div id="presXVX">투약 X - 반환 불가</div>
                            <br/>
                </div>
                <br/>
                <div>
                    <table className="presList1" borderless>
                        <tr>
                            <th>처방 일지 번호</th>
                            <th>처방명</th>
                            <th>수량</th>
                            <th>횟수</th>
                            <th>날짜</th>
                            <th>&nbsp;1&nbsp;</th>
                            <th>&nbsp;2&nbsp;</th>
                            <th>&nbsp;3&nbsp;</th>
                        </tr>
                <tr>
                    <td colSpan={9}>        <div style={{width:"1300px",marginTop:"5px"}}className="line"></div></td>
                </tr>
                {prescriptionList.map(list=>(
                    <tr>
                    <td>{list.prescriptionNum}</td>
                    <td>{list.medicineNum}</td>
                    <td>{list.prescriptionDosage}</td>
                    <td>{list.prescriptionDosageTimes}/{list.prescriptionDosageTotal}</td>
                    <td>{list.prescriptionDate}</td>
                    <td>{
list.prescFre1 !== null ?  <button id="prescSelect" name="1button" onClick={(e)=>openPrescModal(e,list)}  style={{ backgroundColor: getBackgroundColor(list.prescFre1) }}
disabled><p>{list.prescFre1.substring(0, 5)}</p> <br/>-</button>:
<button id="prescSelect" name="1button" onClick={(e)=>openPrescModal(e,list)}></button>
}        
{modalStates[0].isOpen && modalStates[0].buttonNum === list.buttonNum && (
                            <PrescModal prescription={selectedPrescription} buttonNum={modalStates[0].buttonNum} closeModal={closePrescModal} />
                        )}


                    </td>



                    <td>
{list.buttonCount>='2'&& (list.prescFre2 === null || list.prescFre2 !==null) ? <button  name="2button"id="prescSelect" onClick={openPrescModal}></button>:<button id="prescSelect" name="2button" onClick={(e)=>openPrescModal(e,list)}  style={{ backgroundColor: getBackgroundColor(list.prescFre1) }}
disabled><p>{list.prescFre2.substring(0, 5)}</p> <br/>-</button>}
                        {modalStates[1].isOpen && modalStates[1].buttonNum === list.buttonNum && (
                           <PrescModal prescription={selectedPrescription} buttonNum={modalStates[1].buttonNum} closeModal={closePrescModal} />
                        )}
                        
                        </td>



                        <td>
                        {list.buttonCount>='3'&& (list.prescFre3 === null || list.prescFre3 !==null) ? <button  name="3button"id="prescSelect" onClick={openPrescModal}></button>:<button id="prescSelect" name="3button" onClick={(e)=>openPrescModal(e,list)}  style={{ backgroundColor: getBackgroundColor(list.prescFre3) }}
disabled><p>{list.prescFre2.substring(0, 5)}</p> <br/>-</button>}
                       {modalStates[2].isOpen && modalStates[2].buttonNum === list.buttonNum && (
                           <PrescModal prescription={selectedPrescription} buttonNum={modalStates[2].buttonNum} closeModal={closePrescModal} />
                        )}

                        
                        </td>
                        </tr>
                ))}
                    </table>
                </div>

            </div>
        </div>
    )
}

export default NurDailyPrescription;