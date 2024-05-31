import React, { useState } from 'react';
import '../css/Admin.css';

const Admin = () => {
    const [accordion, setAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setAccordion(accordion === index ? null : index);
    };

    const [url, setUrl] = useState('');

    return (
        <div className="adminBackground">
            <div className="left-panel">
                <div className="section">
                    <div className="boxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="/img/notice.png" />
                        <h3 id="boxHeader">공지사항</h3>
                    </div>
                    <div className="admSearchbar">
                        <select id="admKeywordSort">
                            <option>구분</option>
                            <option>카테고리</option>
                            <option>제목</option>
                            <option>내용</option>


                        </select>&nbsp;|<input type="text" id="keyword" placeholder=' 검색' />
                        <label id="searchButton2" for="searchButton1"><button id="searchButton1"> </button></label>
                    </div>
                    <div className="table">
                        <div className="table-header" style={{ fontWeight: "bold" }}>
                            <div>게시 날짜</div>
                            <div>카테고리</div>
                            <div>글번호</div>
                            <div className="title-3">제목</div>
                            <div>조회수</div>
                        </div>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div className="table-row" key={index}>
                                <div>2023-05-28</div>
                                <div>공지</div>
                                <div>{index + 1}</div>
                                <div className="title-3">공지사항 제목</div>
                                <div>100</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="section">
                    <div className="boxHeader">
                        <img id="boxIcon" style={{ marginTop: "12px" }} src="/img/notice.png" />
                        <h3 id="boxHeader">직원 정보</h3>
                    </div>
                    <div className="admSearchbar">
                        <select id="admKeywordSort">
                            <option>구분</option>
                            <option>사번</option>
                            <option>직업</option>
                            <option>부서</option>
                            <option>소속</option>
                            <option>이름</option>
                            <option>이메일</option>


                        </select>&nbsp;|<input type="text" id="keyword" placeholder=' 검색' />
                        <label id="searchButton2" for="searchButton1"><button id="searchButton1"> </button></label>
                    </div>
                    <div className="table">
                        <div className="table-header" style={{ fontWeight: "bold" }}>
                            <div className="title-2">사번</div>
                            <div>직업</div>
                            <div>부서</div>
                            <div>소속</div>
                            <div>이름</div>
                            <div className="title-3">이메일</div>
                        </div>
                        <div className="table-row">
                            <div className="title-2">001</div>
                            <div>개발자</div>
                            <div>개발부</div>
                            <div>서울</div>
                            <div>홍길동</div>
                            <div className="title-3">hong@gildong.com</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-panel">
                {['공지사항 작성', '공지사항 수정', '직원정보 작성', '직원정보 수정'].map((title, index) => (
                    <div className={`accordion-section ${accordion === index ? 'active' : ''}`} key={index}>
                        <div className="accordion-header" onClick={() => toggleAccordion(index)}>
                            <img src='/img/write.png' alt='' className='write-img' />
                            <span className='accordion-header-title'>{title}</span>
                        </div>
                        <div className={`accordion-content ${accordion === index ? 'active' : ''}`}>
                            {index === 0 && (
                                <div className='accordion-group'>
                                    <div className="input-group">
                                        <select className="select">
                                            <option>전체</option>

                                        </select>
                                        <input type="text" className="notice-input" />
                                    </div>
                                    <div className="textarea">
                                        <textarea style={{ width: '735px', height: '500px', boxShadow: '0 2px 5px 1px lightgray', border: '0', borderRadius: '10px' }}></textarea>
                                    </div>
                                    <div className='button-container'>
                                        <button className="add-button">등록</button>
                                    </div>
                                </div>
                            )}
                            {index === 1 && (
                                <div className='accordion-group'>
                                    <div className="input-group">
                                        <select className="select">
                                            <option>전체</option>

                                        </select>
                                        <input type="text" className="notice-input" />
                                    </div>
                                    <div className="textarea">
                                        <textarea style={{ width: '735px', height: '500px', boxShadow: '0 2px 5px 1px lightgray', border: '0', borderRadius: '10px' }}></textarea>
                                    </div>
                                    <div className='button-container'>
                                        <button className="del-button" style={{ backgroundColor: 'lightgray' }}>삭제</button>
                                        <button className="add-button" style={{ backgroundColor: '#427889' }}>수정</button>
                                    </div>
                                </div>
                            )}
                            {index === 2 && (
                                <>
                                    <div className="emp-left">
                                        <label id="addButton2" for="addButton1"><input type='file' id="addButton1" /></label>
                                        
                                    </div>
                                    <div className="emp-right">
                                        <table className='emp-inputbox'>
                                            <tbody>
                                                <tr>
                                                    <td>직업</td>
                                                    <td><input type="text" /></td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <td>부서번호 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                    <td><input type="text" /></td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <td>소속</td>
                                                    <td><input type="text" /></td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <td>직급</td>
                                                    <td><input type="text" /></td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <td>이름</td>
                                                    <td><input type="text" /></td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <td>전화번호</td>
                                                    <td><input type="text" /></td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <td>이메일</td>
                                                    <td><input type="text" /></td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <td>직원번호</td>
                                                    <td><input type="text" /></td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <td>비밀번호</td>
                                                    <td><input type="text" /></td>
                                                </tr>
                                                <br />
                                            </tbody>
                                        </table>
                                        <div className='button-container'>
                                            <button className="emp-add-button" style={{ backgroundColor: '#427889' }}>등록</button>
                                        </div>
                                    </div>
                                </>
                            )}
                            {index === 3 && (
                                <>
                                    <div className="emp-left">
                                        <label id="addButton2" for="addButton1"><input type='file' id="addButton1"/></label>
                                    </div>
                                    <div className="emp-right">
                                        <table className='emp-inputbox'>
                                            <tbody>
                                                <tr>
                                                    <td>직업</td>
                                                    <td><input type="text" /></td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <td>부서번호 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                    <td><input type="text" /></td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <td>소속</td>
                                                    <td><input type="text" /></td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <td>직급</td>
                                                    <td><input type="text" /></td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <td>이름</td>
                                                    <td><input type="text" /></td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <td>전화번호</td>
                                                    <td><input type="text" /></td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <td>이메일</td>
                                                    <td><input type="text" /></td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <td>직원번호</td>
                                                    <td><input type="text" /></td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <td>비밀번호</td>
                                                    <td><input type="text" /></td>
                                                </tr>
                                                <br />
                                            </tbody>
                                        </table>
                                        <div className='button-container'>
                                            <button className="del-button" style={{ backgroundColor: 'lightgray' }}>삭제</button>
                                            <button className="emp-add-button" style={{ backgroundColor: '#427889' }}>수정</button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Admin;