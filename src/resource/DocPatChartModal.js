import axios from 'axios';
import { url } from '../config'
import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../css/DocDiagPatient.css';
import '../css/DocPatChartModal.css';

const DocPatChartModal = ({username, patModalIsOpen, openPatModal, prevDiagList, setPrevDiagList, docPat}) => {

    const [searchType, setSearchType] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');

    const searchPatDiag = () => {
        let requestUrl = `${url}/prevDiagRecord?patNum=${docPat.patNum}`;
        
        if (searchType) {
            requestUrl += `&searchType=${searchType}`;
        }
        if (searchKeyword) {
            const diagKindKeyword = changeDiagKindKeyword(searchKeyword);
            requestUrl += `&searchKeyword=${diagKindKeyword}`;
        }

        axios.get(requestUrl)
            .then(res=>{
                setPrevDiagList([...res.data]);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    const changeDiagKindKeyword = (keyword) => {
        switch (keyword) {
            case '외래':
                return 'diag';
            case '입원':
                return 'adm';
            default:
                return keyword;
        }
    }

    return (
        <Modal isOpen={patModalIsOpen} toggle={openPatModal} style={{ maxWidth: "1510px" }}>
            <ModalHeader toggle={openPatModal} className='modalTitle'>
                <img src='./img/patChartIcon3.png' style={{width:'25px', margin:'0 5px', marginTop:'-5px'}}/>
                {docPat.patName}({docPat.patNum})환자 차트
            </ModalHeader>
            <ModalBody className='diagModalBodyStyle'>
            <div className='medStaticSearchbar'>
                    <div className="medSearchbar" style={{ width: "700px", marginLeft: "60px" }}>
                        <select class="medKeywordSort" style={{ width: "110px" }} onChange={(e) => setSearchType(e.target.value)}>
                            <option value="">구분</option>
                            <option value="docNum">담당의사번</option>
                            <option value="docName">담당의명</option>
                            <option value="disName">진단명</option>
                            <option value="testPart">검사내역</option>
                            <option value="diagKind">진료종류</option>
                        </select> |
                        <input type="text" id="keyword" style={{ width: "480px", backgroundColor: "#f7f7f7", paddingLeft: "20px" }} 
                            placeholder=' 검색...'onChange={(e) => setSearchKeyword(e.target.value)}/>
                        <label class="docSearchButton" for="searchButton1" style={{ marginTop: "5px" }} onClick={searchPatDiag}>
                        </label>
                    </div>
                </div>
                <div id="docPatInfo-modal">
                    <table className="docPatInfo" style={{ marginBottom: '15px', marginTop:'25px' }} borderless>
                        <tbody>
                            <tr>
                                <th>진료일</th>
                                <th>담당의사번</th>
                                <th>담당의명</th>
                                <th>진단명</th>
                                <th>처방 의약품 명칭</th>
                                <th>1회 투여량</th>
                                <th>1회 투여 횟수</th>
                                <th>총투약 횟수</th>
                                <th>용법</th>
                                <th>검사내역</th>
                                <th>진료종류</th>
                            </tr>
                            {prevDiagList.length === 0 ? (
                                <tr>
                                    <td colSpan='11' style={{paddingTop:"15px"}}>
                                    <input className='preInputStyle' style={{marginTop:'0px', width:"100%", textAlign:"center"}} value="진료 내역이 존재하지 않습니다" readOnly />
                                    </td>
                                </tr>
                            ) : (
                                prevDiagList.map(prevDiag=>(
                                    <tr key={prevDiag.docDiagNum}>
                                        <td>{prevDiag.docDiagnosisDate}</td>
                                        <td>{prevDiag.docNum}</td>
                                        <td>{prevDiag.docName}</td>
                                        <td>{prevDiag.diseaseName}</td>
                                        <td className='longTdHidden'>{prevDiag.medName || '-'}</td>
                                        <td>{prevDiag.preDosage || '-'}</td>
                                        <td>{prevDiag.preDosageTime || '-'}</td>
                                        <td>{prevDiag.preDosageTotal || '-'}</td>
                                        <td>{prevDiag.preHowTake || '-'}</td>
                                        <td>{prevDiag.testPart || '-'}</td>
                                        <td>
                                            {prevDiag.docDiagnosisKind === 'diag' ? '외래' : 
                                            prevDiag.docDiagnosisKind === 'adm' ? '입원' :
                                            prevDiag.docDiagnosisKind}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </ModalBody>
        </Modal>
    )
}
export default DocPatChartModal;