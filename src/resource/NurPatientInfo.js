import '../css/App.css';
import '../css/NurPatientInfo.css';
import '../css/DocDiagPatient.css';
import axios from 'axios';
import NurDisAdmModal from './NurDisAdmModal';
import React, {useState, useEffect} from 'react';
import { admAtom, usernameAtom } from '../config/Atom.js';
import { useAtomValue } from 'jotai';
import { url } from '../config.js';
import DocAdmList from './DocAdmList'; // DocAdmList 컴포넌트를 임포트
import NurseAdmList from './NurseAdmList';
const NurPatientInfo = () => {
 // 유형 1. 대기 중인 환자의 상세 정보
    const username = useAtomValue(usernameAtom);
    const admission = useAtomValue(admAtom);
    const [dailyContent, setDailyContent] = useState('');
    const [patient, setPatient] = useState({});
    const admissionStatus = admission.admissionStatus;
    // 유형 2. 입원 중인 환자의 상세 정보
    // --기능 1: 환자 입원 정보 옆에 퇴원 버튼이 있고, 퇴원 버튼을 누르면 퇴원 처리에 관한 모달이 나타남
    // --기능 2: 입원 일지에 작성 버튼 있으며, 작성 버튼을 누르면 작성 가능한 박스와 등록 버튼이 나타남
    // --기능 3: 작성하지 않으려면 원래 작성 버튼이었다가 접기 버튼으로 바뀐 접기 버튼을 누르면 박스와 등록 버튼이 사라지고, 아래로 내려간 이전 입원 일지 내용이 올라옴
    // --기능 4: 의사 입원 진료도 리스트 형식으로 들어오고, 스크롤로 확인 가능

    // 유형 3. 퇴원 완료인 환자의 상세 정보
    // --기능 1: 퇴원에 관한 컴포넌트가 위에 나타남

    // 퇴원 모달
    const [disModalOpen, setDisModalOpen] = useState(false);
    const [docRecords, setDocRecords] = useState([]);
    const [nurseRecords, setNurseRecords] = useState([]);
    const admissionNum = admission.admissionNum;
    const [lastUpdated, setLastUpdated] = useState(0); // To keep track of the last update
  
    const writeSubmit = async () => {
        try {
            const dailyContent = document.getElementById('dailyContent').value;
            console.log(dailyContent);
            const currentDate = new Date();  // 현재 시간을 가져오는 Date 객체 생성
            const response = await axios.post(`${url}/nurseDailyRecord`, {
                admissionRecordDate: currentDate.toLocaleString(),
                jobNum: username,
                admissionNum: Number(admissionNum),
                admissionRecordContent: dailyContent
            });

            console.log('데이터가 성공적으로 등록되었습니다.', response.data);

            setNurseRecords(prevRecords => [
                ...prevRecords,
                {
                    date: currentDate.toLocaleString(),
                    nurName: username,
                    content: dailyContent
                }
            ]);

            setDailyContent('');
            setWriteButton(false);
            // window.location.href = `http://localhost:3000/nurPatientInfo/${admissionNum}`; // 이동할 URL로 변경

        }
    catch{
        console.log("z");
    }
    };

    useEffect(() => {
        console.log("넘어왔는가." + JSON.stringify(admission));
        axios.get(`${url}/nurPatientInfo`, {
            params: {
                admissionNum: admission.admissionNum,
                patNum: admission.patNum
            }
        })
            .then(res => {
                setPatient(res.data.patient);
                console.log("this is" + JSON.stringify(patient));
                // res.data에서 필요한 데이터 추출하여 docRecords를 설정
                const fetchedDocRecords = res.data.doctorRecord.map(item => ({
                    date: item.record.admissionRecordDate,
                    docName: item.docName,
                    content: item.record.admissionRecordContent
                }));
                console.log("fetched: " + fetchedDocRecords);
                setDocRecords(fetchedDocRecords);
                console.log(JSON.stringify(res.data));
                const fetchedNurseRecords = res.data.nurseRecord.map(item => ({
                    date: item.record.admissionRecordDate,
                    nurName: item.nurName,
                    content: item.record.admissionRecordContent
                }));
                console.log("fetched: " + fetchedNurseRecords);
                fetchedNurseRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
                setNurseRecords(fetchedNurseRecords);
                setLastUpdated(fetchedDocRecords.length+fetchedNurseRecords.length);
                console.log(lastUpdated);
            })
            .catch(err => {
                console.log("error가 낫습니다: " + admissionNum);
            })
    }, [admission]);

    const openDisModal = () => {
        setDisModalOpen(!disModalOpen);
    }

    const closeDisModal = () => {
        setDisModalOpen(false);
    }
 // Function to handle successful submission and close modal
 const toggleModal = (isOpen) => {
    setDisModalOpen(isOpen);
    
};

    // 작성 버튼 관련
    const [writeButton, setWriteButton] = useState(false);

    const clickWriteButton = () => {
        setWriteButton(!writeButton);
    }
return (<div className="background">
<br/>
{admissionStatus === "end" ? <div className="disChargeBox" style={{
width:"1590px"
,backgroundColor:"#FFFDF8"
,position:"relative"
,height:"100px"
,borderRadius:"15px"
,boxShadow:"0 1px 1px 0 lightgray"
}}><div style={{padding:"10px", backgroundColor:" #FFFDF8"}}>
            <h3 className="sboxHeader" style={{marginLeft:"20px"}}>퇴원 정보</h3></div>
            <div className="dueInfoRow" style={{marginLeft:"30px", backgroundColor:"#FFFDF8"}}>해당 환자는 {admission.admissionDischargeDate}일에 퇴원하였습니다.
            <br/></div></div> : ''}
<br/>
    <div className="leftBox">
        <div className="patProfile" style={{height:"610px"}}>
        <div className="boxHeader">
            <img id="boxIcons" src="/img/memo.png"/> &nbsp;
            <h3 className="sboxHeader">환자 입원 정보 &nbsp;</h3>{
                admission.admissionStatus === 'ing'?
                <button style={{position:"relative", backgroundColor:"gray", color:"black", width:"50px", height: "24px", top:"12px", color:"white"}} onClick={openDisModal}>퇴원</button> :''}
            {disModalOpen && <NurDisAdmModal admissionNum={admissionNum} 
            toggle={toggleModal}
             closeDisModal={closeDisModal}/>}
        </div>
        <div className="nurPatInfoContent">
        <br/>
          <div className="dueInfoRow" style={{width:"500px",marginLeft:"10px",paddingBottom:"10px", position:"relative"}}>
                            <div style={{marginRight:"30px"}}>이름<input className='inputStyle' value={patient.patName} style={{width:"68px", height:"35px", backgroundColor:"white"}} readOnly/></div>
                        &nbsp;&nbsp;
                            <div style={{marginLeft:"30px"}}>성별<input className='inputStyle'style={{width:"50px", textAlign:"center", height:"35px",backgroundColor:"white"
                            }} value={patient.patGender} readOnly/></div>
&nbsp;&nbsp;&nbsp;
                            <div style={{marginLeft:"52px"}}>혈액형<input className='inputStyle' style={{width:"59px", backgroundColor:"white", height:"35px"}}
                            value={patient.patBloodType}
                            readOnly/></div>
                        </div><br/>
                            <div className="dueInfoRow" style={{width:"500px",marginLeft:"10px",paddingBottom:"10px", position:"relative"}}>
                            <div style={{marginRight:"30px"}}>키<input className='inputStyle' value={patient.patHeight} style={{width:"72px", height:"35px", textAlign:"center", backgroundColor:"white"}} readOnly/></div>
                        &nbsp;&nbsp;
                            <div style={{marginRight:"30px"}}>몸무게<input className='inputStyle'style={{width:"80px", height:"35px",textAlign:"center", backgroundColor:"white"
                            }} value={patient.patWeight} readOnly/></div>
&nbsp;&nbsp;&nbsp;
                            <div style={{marginLeft:"-12px"}}>환자 번호<input className='inputStyle' style={{width:"79px", backgroundColor:"white", height:"35px"}}
                            value={patient.patNum}
                            readOnly/></div>
                        </div>
                            <div style={{marginTop:"10px"}}>환자 주민번호<input className='inputStyle' value={patient.patJumin}style={{width:"375px", backgroundColor:"white"}} disabled/></div>
                            <br/>
                            <div style={{marginTop:"10px"}}>환자 주소<input className='inputStyle' value={patient.patAddress}style={{width:"400px", backgroundColor:"white"}} disabled/></div>
                            <br/>
                            <div style={{}}>환자 이력<textarea className='inputStyle' value={patient.patHistory}style={{width:"400px", height:"120px", backgroundColor:"white", border:"none"}} disabled/></div>
                            <br/>
                            <div>입원 내용<input className='inputStyle' value={admission.admissionReason} style={{width:"400px", height:"35px", backgroundColor:"white"
                            }} disabled /></div>
                            <br/>
                            </div>
                            
        </div>
    </div>
    <div className="rightBox">
    <br/>
        <div className="boxHeader">
            <img id="boxIcon" src="/img/memo.png"/>
            <h3 className="sboxHeader">입원 일지</h3>
            </div>
            <div className="nurseWrite" style={{position:"relative"}}>
                <div className="nurseInfo">
                    <p style={{color:"gray"}}>날짜 2024-06-28</p>&nbsp;&nbsp;
                    <p>{}</p>&nbsp;&nbsp;&nbsp;
                    {
                admission.admissionStatus === 'ing'?
                    <button style={{backgroundColor:"#427889", color:"white", width:"50px", height: "25px"}} onClick={clickWriteButton}>작성</button>:''}
                    {!writeButton}
                </div>
                <div className={`writeContent ${writeButton ? 'visible scroll-box1' : 'hidden scroll-box1'}`}>
                <input id="dailyContent" name="dailyContent" type="text"/><br/>
                <button id="writeSuccess"  className={writeButton ? 'visible' : 'hidden'} onClick={writeSubmit} style={{zIndex:"9999"}}>등록</button>
                </div>
            </div>
                <br/>
            <div className="dailyList scroll-box1">
          <NurseAdmList nurseRecords={nurseRecords}/>
</div>
</div>
 <div className="bottomBox">
 <DocAdmList docRecords={docRecords}/>
    </div>
    </div>
)
}
export default NurPatientInfo;