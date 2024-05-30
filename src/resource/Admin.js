import React, { useState } from 'react';
import '../css/Admin.css';

const Admin = () => {
    const [accordion, setAccordion] = useState(null);

    const toggleAccordion = (index) => {
        setAccordion(accordion === index ? null : index);
    };

    return (
        <div className="adminBackground">
            <div className="left-panel">
                <div className="section">
                    <div className="boxHeader">
            <img id="boxIcon" style={{marginTop:"12px"}} src="/img/notice.png"/>
            <h3 id="boxHeader">공지사항</h3>
        </div>
                        <div className="admSearchbar">
                    <select id="admKeywordSort">
                    <option>구분</option>
                        <option>카테고리</option>
                        <option>제목</option>
                        <option>내용</option>


                        </select>&nbsp;|<input type="text"  id="keyword"placeholder=' 검색'/>
                        <label id="searchButton2" for="searchButton1"><button id="searchButton1"> </button></label>            
                        </div>
                    <div className="table">
                        <div className="table-header" style={{fontWeight:"bold"}}>
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
            <img id="boxIcon" style={{marginTop:"12px"}} src="/img/notice.png"/>
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


                        </select>&nbsp;|<input type="text"  id="keyword"placeholder=' 검색'/>
                        <label id="searchButton2" for="searchButton1"><button id="searchButton1"> </button></label>            
                        </div>
                    <div className="table">
                        <div className="table-header" style={{fontWeight:"bold"}}>
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
                            <img src='/img/write.png' alt='' className='write-img'/><span className='accordion-header-title'>{title}</span>
                        </div>
                        <div className={`accordion-content ${accordion === index ? 'active' : ''}`}>
                            {index < 2 ? (
                                <>
                                    <div className="input-group">
                                        <select></select>
                                        <input type="text" />
                                    </div>
                                    <div className="input-group">
                                        <textarea style={{ width: '100%', height: '150px' }}></textarea>
                                    </div>
                                    {index === 0 ? (
                                        <button className="button" style={{ backgroundColor: '#427889' }}>등록</button>
                                    ) : (
                                        <>
                                            <button className="button" style={{ backgroundColor: '#AF1919' }}>삭제</button>
                                            <button className="button" style={{ backgroundColor: '#427889' }}>수정</button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="emp-left">
                                        <label>파일 업로드</label>
                                        <input type="file" />
                                    </div>
                                    {['직업', '부서번호', '소속', '직급', '이름', '전화번호', '이메일', '직원번호', '비밀번호'].map((label, idx) => (
                                        <div className="emp-right" key={idx}>
                                            <label>{label}</label>
                                            <input type="text" />
                                        </div>
                                    ))}
                                    <button className="button" style={{ backgroundColor: '#427889' }}>등록</button>
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