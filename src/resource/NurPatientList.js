import '../css/NurPatientList.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { url } from '../config';
import { useAtomValue, useAtom,useSetAtom } from 'jotai';
import { admAtom, accessTokenAtom, usernameAtom,tokenAtom} from '../config/Atom.js';
import NurPatientInfo from './NurPatientInfo';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const NurPatientList = () => {
    // 1. 상태에 따라 환자 리스트가 다르게 보임
    // 2. 입원한 환자 리스트 가져오기 (admission table)
    const [fetched, setFetched] = useState(false); // 데이터를 이미 가져왔는지 여부를 나타내는 상태 변수
    const [admList,setAdmList] = useState([]);
    const username = useAtomValue(usernameAtom);
    const accessToken = useAtomValue(accessTokenAtom);
    const setAdmissionPatient = useSetAtom(admAtom); // jotai의 useSetAtom 사용
    const navigate = useNavigate();
    const count = 1;
    const [selectedState, setSelectedState] = useState('');
    const [filteredAdmList, setFilteredAdmList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [keywordValue, setKeywordValue] = useState('');



    function patInfo(admission) {
        setAdmissionPatient(admission);
        console.log(admission);
       console.log(JSON.stringify(admission+"이 전송됩니다. 기둘"))
        navigate(`/nurPatientInfo/${admission.admissionNum}`);
    }

    const statusChange = (e) =>{
        setSelectedState(e.target.value);
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
        patBirth:'',
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
        docDiagnosisContent:'',
    })
    useEffect(()=>{
        console.log("nurPatientList redirect");
        if(username==='') return;
       
        console.log(`${url}/wardPatientList?nurNum=${username}`);
        axios.get(`${url}/wardPatientList?nurNum=${username}`, {headers: {Authorization: accessToken}, params: {nurNum:username},maxReirects:0})
        .then(response=>{ 
            console.log(username);
            console.log("이 데이터는 말입니다: "+JSON.stringify(response.data));
            console.log("react's token: "+accessToken);
            // setAdmList([...JSON.stringify(response.data)]);
            const data = response.data[0];
            const mappedData = response.data.map(data=>({
                admissionNum: data.admission.admissionNum,
                patName:data.patName,
                patBirth:data.patJumin,
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
                docDiagnosisContent:data.admission.docDiagnosisContent,
            }));
            setAdmList(mappedData);
            setFilteredAdmList(admList);
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
    
    return (
        <>

        <div className="background">
            <div id="Lbox" style={{backgroundColor:"#FFFDF8"}}>
            <br/>
                <div id="LboxHeader" style={{display:"flex"}}>
                <img id="boxIcons" style={{marginTop:"8px"}} src="./img/admissionList.png"/> &nbsp;&nbsp;
                <h3 id="sboxHeader" style={{fontSize:"20px"}}>입퇴원 조회
                </h3>
                </div>
                <div className="searchLine">
                    <select id="status" style={{fontSize:"15px"}} onChange={statusChange}> 
                        <option value=""> 상태 </option>
                        <option id="admissionStatus" value="wait"> 대기 중 </option>
                        <option id="admissionStatus" value="ing"> 입원 중 </option>
                        <option id="admissionStatus" value="end"> 퇴원 </option>
                    </select>
                    <div className="searchbar">
                   
                    <select id="keywordSort" name="keyword" onChange={(e) => setKeyword(e.target.value)}>
                    <option value="">구분</option>
                        <option value="admissionNum">입원 번호</option>
                        <option value="patNum">환자 번호</option>
                        <option value="patName">환자 이름(성별/나이)</option>
                        <option value="admissionDueDate">입원 예정일</option>
                        <option value="admissionDate">입원일</option>
                        <option value="docDepartmentName">담당과</option>
                        <option value="docName">주치의</option>
                        <option value="admissionDischargeDueDate">퇴원 예정일</option>
                        <option value="admissionDischargeDate">퇴원일</option>

                        </select>&nbsp;|<input type="text"  id="keyword" style={{width:"300px"}}  onChange={(e) => setKeywordValue(e.target.value)} onKeyPress={enterPress} placeholder=' 검색...'/>
                        <label id="searchButton" htmlFor="searchButton1"><button onClick={keyChange}  id="searchButton1"> </button></label>            
                    </div>
                </div>
                <br/>
                <br/>
                <br/><br/>
                <table className="admList" borderless>
                    <tr>
                        <th>입원 번호</th>
                        <th>환자 번호</th>
                        <th>환자 이름(성별/나이)</th>
                        <th>입원 예정일</th>
                        <th>입원일</th>
                        <th>담당과</th>
                        <th>담당의</th>
                        <th>병실 일련 번호</th>
                        <th>퇴원 예정일</th>
                        <th>퇴원일</th>
                        <th>상태</th>
                    </tr>
                    <tbody>
                    <tr id="line"> 
                    </tr><br/>
                    {filteredAdmList.map(admission =>(
                                <tr className="patList" key={admission.admNum} 
                                onClick={()=>patInfo(admission)}>

                            <td>{admission.admissionNum}</td>
                        <td>{admission.patNum}</td>
                        <td>{admission.patName}</td>
                        <td>{admission.admissionDueDate}</td>
                        <td>{admission.admissionDate}</td>
                        <td>{admission.docDepartmentName}</td>
                        <td>{admission.docName}</td>
                        <td>{admission.bedsNum}</td>
                        <td>{admission.admissionDischargeDueDate}</td>
                        <td>{admission.admissionDischargeDate}</td>
                        {admission.admissionStatus === 'ing' && <td style={{color:"#007212"}}>입원 중</td>}
                        {admission.admissionStatus === 'wait' && <td style={{color:"#F09000"}}>대기 중</td>}
                        {admission.admissionStatus === 'end' && <td style={{color:"gray"}}>퇴원</td>}
                    </tr>))}
                    </tbody>
                </table>
                </div>
            </div>
            </>
    );
}
export default NurPatientList;