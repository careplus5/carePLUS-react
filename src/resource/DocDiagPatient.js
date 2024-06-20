import axios from 'axios';
import { url } from '../config'
import { useState, useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { accessTokenAtom, empAtom, usernameAtom } from '../config/Atom.js';
import '../css/DocDiagPatient.css';
import DocPatChartModal from './DocPatChartModal.js';

const DocDiagPatient = () => {

    const username = useAtomValue(usernameAtom);
    const [searchType, setSearchType] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [docPatList, setDocPatList] = useState([]);

    const [patModalIsOpen, setPatModalIsOpen] = useState(false);
    const [prevDiagList, setPrevDiagList] = useState([]);
    const [selectDocPat, setSelectDocPat] = useState({patNum:'', patName:''});

    useEffect(() => {
        searchPatient();
    }, [username])

    const searchPatient = () => {
        let requestUrl = `${url}/docDiagPatList?docNum=${username}`;
        
        if (searchType) {
            requestUrl += `&searchType=${searchType}`;
        }
        if (searchKeyword) {
            const stateKeyword = changeStateKeyword(searchKeyword);
            requestUrl += `&searchKeyword=${stateKeyword}`;
        }

        axios.get(requestUrl)
            .then(res => {
                setDocPatList([...res.data]);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const changeStateKeyword = (keyword) => {
        switch (keyword) {
            case '입원중':
                return 'ing';
            case '퇴원':
                return 'end';
            case '입원예정':
                return 'wait';
            case '수술예정':
                return 'wait';
            case '완료':
                return 'end';
            default:
                return keyword;
        }
    }

    const openPatModal = () => {
        setPatModalIsOpen(!patModalIsOpen);
    }

    const clickDiagnosis = (docPat) => {
        let patNum = docPat.patNum;
        setSelectDocPat({patNum:patNum, patName:docPat.patName});
        openPatModal();

        axios.get(`${url}/prevDiagRecord?patNum=${patNum}`)
            .then(res=>{
                setPrevDiagList([...res.data]);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    return (
        <div className="background">
            <div id="Lbox" style={{ backgroundColor: "#FFFDF8" }}>
                <br />
                <div className="LboxHeader" style={{ display: 'flex' }}>
                    <img id="boxIcon" style={{ marginTop: "15px", marginLeft: "15px" }} src="./img/notice.png" />
                    <h3 className="docPat-boxHeader">환자 목록</h3>
                </div>
                <div className="searchLine">
                    <div className="medSearchbar" style={{ width: "700px", marginLeft: "35px" }}>
                        <select class="medKeywordSort" style={{ width: "110px" }} onChange={(e) => setSearchType(e.target.value)}>
                            <option value="">구분</option>
                            <option value="patNum">환자번호</option>
                            <option value="patName">이름</option>
                            <option value="patJumin">주민등록번호</option>
                            <option value="diseaseName">증상</option>
                            <option value="admState">입원 여부</option>
                            <option value="surState">수술 여부</option>
                        </select> |
                        <input type="text" id="keyword" style={{ width: "480px", backgroundColor: "#f7f7f7", paddingLeft: "20px" }}
                            placeholder=' 검색...' onChange={(e) => setSearchKeyword(e.target.value)} />
                        <label class="docSearchButton" for="searchButton1" style={{ marginTop: "5px" }}>
                            <button id="searchButton1" onClick={searchPatient}></button>
                        </label>
                    </div>
                </div>
                <br />
                <br />
                <br /><br />
                <table className="docPatList" borderless>
                    <tbody>
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
                        </tr><br />
                        {docPatList.length === 0 ? (
                            <tr>
                                <td colSpan='9' style={{paddingTop:"15px"}}>
                                    <input className='preInputStyle' style={{marginTop:'0px', width:"100%", textAlign:"center"}} value="담당 환자가 존재하지 않습니다" readOnly />
                                </td>
                            </tr>
                            ) : (docPatList.map(docPat => (
                            <tr key={docPat.diagnosisDueNum}>
                                <td>{docPat.patNum}</td>
                                <td>{docPat.patName}</td>
                                <td>{docPat.patJumin}</td>
                                <td>{docPat.patGender}</td>
                                <td>{docPat.docDiagnosisDate}</td>
                                <td>{docPat.diseaseName}</td>
                                <td style={{
                                    color: docPat.admState === 'wait' ? '#F09000' :
                                        docPat.admState === 'ing' ? '#007212' :
                                            '#848484', fontWeight: "bold"
                                }}>
                                    {docPat.admState === 'ing' ? '입원중' :
                                        docPat.admState === 'wait' ? '입원예정' : '퇴원'}</td>
                                <td style={{
                                    color: docPat.surState === 'wait' ? '#F09000' :
                                        docPat.surState === 'ing' ? '#007212' :
                                            '#848484', fontWeight: "bold"
                                }}>
                                    {docPat.surState === 'wait' ? '수술예정' :
                                        docPat.surState === 'end' ? '완료' : '-'}</td>
                                <td><button className='buttonStyle' onClick={()=>clickDiagnosis(docPat)}>차트조회</button></td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>
            <DocPatChartModal username={username} patModalIsOpen={patModalIsOpen} openPatModal={openPatModal} 
                            prevDiagList={prevDiagList} setPrevDiagList={setPrevDiagList} docPat={selectDocPat}/>
        </div>
    )
}
export default DocDiagPatient;