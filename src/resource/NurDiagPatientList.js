import '../css/NurPatientList.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { url } from '../config.js';
import { useAtomValue, useAtom,useSetAtom } from 'jotai';
import { admAtom, accessTokenAtom, usernameAtom,diagAtom} from '../config/Atom.js';
import NurPatientInfo from './NurPatientInfo.js';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const NurDiagPatientList = () => {
    // 1. 상태에 따라 환자 리스트가 다르게 보임
    // 2. 입원한 환자 리스트 가져오기 (admission table)
    const [fetched, setFetched] = useState(false); // 데이터를 이미 가져왔는지 여부를 나타내는 상태 변수
    const [diagList,setDiagList] = useState([]);
    const username = useAtomValue(usernameAtom);
    const accessToken = useAtomValue(accessTokenAtom);
     const setDiagnosisPatient = useSetAtom(diagAtom); // jotai의 useSetAtom 사용
    const navigate = useNavigate();
    const count = 1;
    const [selectedState, setSelectedState] = useState('');
    const [filteredDiagList, setFilteredDiagList] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [keywordValue, setKeywordValue] = useState('');



    function patInfo(diagnosis) {
        setDiagnosisPatient(diagnosis);
        console.log(diagnosis);
       console.log(JSON.stringify(diagnosis+"이 전송됩니다. 기둘"))
        navigate(`/nurDiagPatientInfo/${diagnosis.nurDiagNum}`);
    }

    const statusChange = (e) =>{
        setSelectedState(e.target.value);
    }

    const keyChange = (e) =>{
        if (keywordValue === null) {
            setDiagList(diagList);
        } else {
            setFilteredDiagList(diagList.filter(diagnosis => diagnosis.setKeyword === setKeywordValue));
            
        }
    }
const enterPress = (e) =>{
    if(e.key === 'Enter'){
        keyChange();
    }
}
    const [diagnosis, setDiagnosis] = useState({
        nurDiagNum: '',
        nurNum:'',
        patNum:'',
        patName:'',
        nurDiagnosisDueDate:'',
        nurDiagnosisDate:'',
        docDiagnosisNum:'',
        nurDiagContent:'',
        nurDiagStatus:'',
        departmentName:'',
        docName:'',
        docDiagnosisOrder:'',
        docDiagnosisContent:'',
    })
    useEffect(()=>{
        console.log("nurDiagPatientList redirect");
        if(username==='') return;
       
        console.log(`${url}/nurDiagPatientList?nurNum=${username}`);
        axios.get(`${url}/nurDiagPatientList?nurNum=${username}`, {headers: {Authorization: accessToken}, params: {nurNum:username},maxReirects:0})
        .then(response=>{ 
            console.log(username);
            console.log("이 데이터는 말입니다: "+JSON.stringify(response.data));
            console.log("react's token: "+accessToken);
            // setAdmList([...JSON.stringify(response.data)]);
            const data = response.data[0];
            console.log(data);
            const mappedData = response.data.map(data=>({
                nurDiagNum: data.diagnosis.nurDiagNum,
                nurNum:data.diagnosis.nurNum,
                patNum:data.diagnosis.patNum,
                patName:data.patName,
                nurDiagnosisDueDate:data.diagnosis.nurDiagnosisDueDate,
                nurDiagnosisDate:data.diagnosis.nurDiagnosisDate,
                docDiagnosisNum:data.diagnosis.docDiagnosisNum,
                nurDiagContent:data.diagnosis.nurDiagContent,
                nurDiagStatus:data.diagnosis.nurDiagStatus,
                departmentName:data.departmentName,
                docName:data.docName,
                docDiagnosisOrder:data.DocDiagnosis.docDiagnosisOrder,
                docDiagnosisContent:data.DocDiagnosis.docDiagnosisContent
            }));
            setDiagList(mappedData);
            setFilteredDiagList(diagList);
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
            setFilteredDiagList(diagList);
        } else {
            setFilteredDiagList(diagList.filter(diagnosis => diagnosis.nurDiagStatus === selectedState));
        }
    }, [selectedState, diagList]);
    
    return (
        <>

        <div className="background">
            <div id="Lbox" style={{backgroundColor:"white"}}>
            <br/>
                <div id="LboxHeader" 
                >
                <img id="boxIcon" style={{marginTop:"-5px"}} src="./img/notice.png"/> &nbsp;&nbsp;
                <h3 id="boxHeader">환자 조회
                </h3>
                </div>
                <div className="searchLine">
                    <select id="status" onChange={statusChange}> 
                        <option value=""> 상태 </option>
                        <option id="nurDiagStatus" value="wait"> 대기 중 </option>
                        <option id="nurDiagStatus" value="end"> 완료 </option>
                    </select>
                    <div className="searchbar">
                   
                    <select id="keywordSort" name="keyword" onChange={(e) => setKeyword(e.target.value)}>
                    <option value="">구분</option>
                        <option value="nurDiagNum">진료 번호</option>
                        <option value="patNum">환자 번호</option>
                        <option value="patName">환자 이름(성별/나이)</option>
                        <option value="nurDiagnosisDueDate">진료 예정일</option>
                        <option value="nurDiagnosisDate">진료일</option>
                        <option value="DepartmentName">담당과</option>
                        <option value="docName">주치의</option>

                        </select>&nbsp;|<input type="text"  id="keyword" style={{width:"300px"}}  onChange={(e) => setKeywordValue(e.target.value)} onKeyPress={enterPress} placeholder=' 검색...'/>
                        <label id="searchButton" htmlFor="searchButton1"><button onClick={keyChange}  id="searchButton1"> </button></label>            
                    </div>
                </div>
                <br/>
                <br/>
                <br/><br/>
                <table className="admList" borderless>
                    <tr>
                        <th>진료 번호</th>
                        <th>환자 번호</th>
                        <th>환자 이름(성별/나이)</th>
                        <th>진료 예정일</th>
                        <th>진료일</th>
                        <th>담당과</th>
                        <th>담당의</th>
                        <th>병실 일련 번호</th>
                        <th>상태</th>
                    </tr>
                    <tbody>
                    <tr id="line"> 
                    </tr><br/>
                    {filteredDiagList.map(diagnosis =>(
                                <tr className="patList" key={diagnosis.nurDiagNum} 
                                onClick={()=>patInfo(diagnosis)}>

                            <td>{diagnosis.nurDiagNum}</td>
                        <td>{diagnosis.patNum}</td>
                        <td>{diagnosis.patName}</td>
                        <td>{diagnosis.nurDiagnosisDueDate}</td>
                        <td>{diagnosis.nurDiagnosisDate}</td>
                        <td>{diagnosis.departmentName}</td>
                        <td>{diagnosis.docName}</td>
                        <td>ㅋㅋ</td>
                        {diagnosis.nurDiagStatus === 'wait' && <td style={{color:"yellow"}}>대기 중</td>}
                        {diagnosis.nurDiagStatus === 'end' && <td style={{color:"gray"}}>완료</td>}
                    </tr>))}
                    </tbody>
                </table>
                </div>
            </div>
            </>
    );
}
export default NurDiagPatientList;