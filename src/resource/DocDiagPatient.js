import axios from 'axios';
import {url} from '../config'
import {useState, useEffect} from 'react';
import {useAtom, useAtomValue} from 'jotai';
import {accessTokenAtom, empAtom, usernameAtom} from '../config/Atom.js';
import '../css/DocDiagPatient.css';

const DocDiagPatient = () => {

    const username = useAtomValue(usernameAtom);

    useEffect(()=>{
        axios.get(`${url}/docDiagPatList?docNum=${username}`)
            .then(res=>{
                console.log(res.data);
            })
            .catch(err=>{
                console.log(err);
            })
    }, [username])
    
    return (
        <div className="background">
            <div id="Lbox" style={{backgroundColor:"#FFFDF8"}}>
            <br/>
                <div className="LboxHeader" style={{display:'flex'}}>
                <img id="boxIcon" style={{marginTop:"15px", marginLeft:"15px"}} src="./img/notice.png"/>
                <h3 className="docPat-boxHeader">환자 목록</h3>
                </div>
                <div className="searchLine">
                    <div className="medSearchbar" style={{ width: "700px", marginLeft: "35px" }}>
                        <select class="medKeywordSort" style={{ width: "110px" }}>
                            <option value="">구분</option>
                            <option value="medNum">약품코드</option>
                            <option value="medEnName">약품영어명</option>
                            <option value="medKorName">약품한글명</option>
                        </select> |
                        <input type="text" id="keyword" style={{ width: "480px", backgroundColor: "#f7f7f7", paddingLeft: "20px" }} placeholder=' 검색...'/>
                        <label class="docSearchButton" for="searchButton1" style={{ marginTop: "5px" }}>
                            <button id="searchButton1"></button>
                        </label>
                    </div>
                </div>
                <br/>
                <br/>
                <br/><br/>
                <table className="admList" borderless>
                    <tr>
                        <th>환자번호</th>
                        <th>이름</th>
                        <th>주민등록번호</th>
                        <th>성별</th>
                        <th>최근 진료일</th>
                        <th>최근 증상</th>
                        <th>입원 여부</th>
                        <th>수술 여부</th>
                        <th>환자 차트</th>
                    </tr>
                    <tr id="line"> 
                    </tr><br/>
                    <tr>
                        <td>88001</td>
                        <td>황한샘</td>
                        <td>010713-4934920</td>
                        <td>F</td>
                        <td>2024-04-08</td>
                        <td>장알균에 의한 패혈증</td>
                        <td>입원중</td>
                        <td>수술예정</td>
                        <td><button className='buttonStyle'>차트보기</button></td>

                    </tr>
                </table>
                </div>
            </div>
    )
}
export default DocDiagPatient;