import { Table, Col, Button, Form, FormGroup, Label, Input, FormText, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import '../css/Admin.css';
import axios from 'axios';

const Admin = () => {
    const [accordion, setAccordion] = useState(null);
    const [empPageBtn, setEmpPageBtn] = useState([]);
    const [empPageInfo, setEmpPageInfo] = useState({});
    const [empWord, setEmpWord] = useState('');
    const [empType, setEmpType] = useState('');
    const [employee, setEmployee] = useState({
        file: null, jobNum: '', departmentNum: '', department2Name: '', empPosition: '', empName: '', empTel: '', empEmail: '', empNum: '', empPassword: ''
    });
    const [employeeList, setEmployeeList] = useState([]);
    useEffect(() => {
        searchEmployee(1);
        console.log('start')
    }, [])
    const toggleAccordion = (index) => {
        setAccordion(accordion === index ? null : index);
    };
    const searchEmployee = (emppage) => {
        const searchEmployeeUrl = `http://localhost8090/employeeList?page=${emppage}&type=${empType}&word=${empWord}`;
        axios.get(searchEmployeeUrl)
            .then(res => {
                let empPageInfo = res.data.empPageInfo;
                setEmployeeList([...res.data.employeeList])
                let emppage = [];
                for (let i = empPageInfo.startPage; i <= empPageInfo.endPage; i++) {
                    emppage.push(i);
                }
                setEmpPageBtn([...emppage]);
                setEmpPageInfo({ ...empPageInfo });
            })
            .catch(err => {

            })
    }
    const empAddChangeValue = (e) => {
        const { name, value, files } = e.target;
        if (name === "file") {
            setEmployee({ ...employee, file: files[0] });
        } else {
            setEmployee({ ...employee, [name]: value });
        }
    };
    const join = (e) => {
        const formData = new FormData();
        formData.append("file", employee.file);
        formData.append("jobNum", employee.jobNum);
        formData.append("departmentNum", employee.departmentNum);
        formData.append("department2Name", employee.department2Name);
        formData.append("empPosition", employee.empPosition);
        formData.append("empName", employee.empName);
        formData.append("empTel", employee.empTel);
        formData.append("empEmail", employee.empEmail);
        formData.append("empNum", employee.empNum);
        formData.append("empPassword", employee.empPassword);
        axios.post(`http://localhost:8090/employeeAdd`, formData)
            .then(res => {
                alert(res.data);
            })
            .catch(err => {
                alert(err)
            })
    }

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
                        <label id="searchButton2" htmlFor="searchButton1"><button id="searchButton1"> </button></label>
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
                        <select id="admKeywordSort" name='empType' onChange={(e) => setEmpType(e.target.value)}>
                            <option>구분</option>
                            <option>사번</option>
                            <option>직업</option>
                            <option>부서</option>
                            <option>소속</option>
                            <option>이름</option>
                            <option>이메일</option>


                        </select >&nbsp;|<input type="text" id="keyword" name='empWord' placeholder=' 검색' onChange={(e) => setEmpWord(e.target.value)} />
                        <label id="searchButton2" htmlFor="searchButton1"><button id="searchButton1" onClick={searchEmployee}> </button></label>
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
                            {employeeList.map(employee => (
                                <>
                                    <div className="title-2">{employee.empNum}</div>
                                    <div>{employee.jobName}</div>
                                    <div>{employee.department1Name}</div>
                                    <div>{employee.department2Name}</div>
                                    <div>{employee.empName}</div>
                                    <div className="title-3">{employee.empEmail}</div>
                                </>
                            ))}
                            <div className="title-2">001</div>
                            <div>개발자</div>
                            <div>개발부</div>
                            <div>서울</div>
                            <div>홍길동</div>
                            <div className="title-3">hong@gildong.com</div>
                        </div>
                    </div>
                    <Pagination style={{ justifyContent: 'center', margin: '0 auto', width: "900px" }}>
                        <PaginationItem disabled={empPageInfo.curPage === empPageInfo.startPage}>
                            <PaginationLink previous onClick={() => searchEmployee(empPageInfo.curPage - 1)} />
                        </PaginationItem>
                        {empPageBtn.map((empPage) => (
                            <PaginationItem key={empPage} className={empPage === empPageInfo.curPage ? 'active' : ''}>
                                <PaginationLink onClick={() => searchEmployee(empPage)}>{empPage}</PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem disabled={empPageInfo.curPage === empPageInfo.endPage}>
                            <PaginationLink next onClick={() => searchEmployee(empPageInfo.curPage + 1)} />
                        </PaginationItem>
                    </Pagination>
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
                                <div>
                                    <div className="emp-left">
                                        {employee.file ? (
                                            <div style={{ border: "50%" }}>
                                                <img src={URL.createObjectURL(employee.file)} id="addButton2" alt='' />
                                                <label htmlFor="addButton1">
                                                    <input type='file' name='file' id="addButton1" onChange={empAddChangeValue} />
                                                </label>
                                            </div>
                                        ) : (
                                            <label id="addButton2" htmlFor="addButton1">
                                                <input type='file' name='file' id="addButton1" onChange={empAddChangeValue} />
                                            </label>
                                        )}
                                    </div>
                                    <div className="emp-right">
                                        <table className='emp-inputbox'>
                                            <tbody>
                                                <tr className='row'>
                                                    <td>직업</td>
                                                    <td><select name='jobNum' onChange={empAddChangeValue}>
                                                        <option value={"99"}>선택하세요</option>
                                                        <option value={"11"}>의사</option>
                                                        <option value={"12"}>간호사</option>
                                                        <option value={"13"}>원무과</option>
                                                        <option value={"14"}>의료기사</option>
                                                    </select>
                                                    </td>
                                                </tr>

                                                <tr className='row'>
                                                    <td>부서번호 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                    <td><input type="text" name="departmentNum" onChange={empAddChangeValue} /></td>
                                                </tr>

                                                <tr className='row'>
                                                    <td>소속</td>
                                                    <td><input type="text" name='department2Name' onChange={empAddChangeValue} /></td>
                                                </tr>

                                                <tr className='row'>
                                                    <td>직급</td>
                                                    <td><input type="text" name='empPosition' onChange={empAddChangeValue} /></td>
                                                </tr>

                                                <tr className='row'>
                                                    <td>이름</td>
                                                    <td><input type="text" name='empName' onChange={empAddChangeValue} /></td>
                                                </tr>

                                                <tr className='row'>
                                                    <td>전화번호</td>
                                                    <td><input type="text" name='empTel' onChange={empAddChangeValue} /></td>
                                                </tr>

                                                <tr className='row'>
                                                    <td>이메일</td>
                                                    <td><input type="text" name='empEmail' onChange={empAddChangeValue} /></td>
                                                </tr>

                                                <tr className='row'>
                                                    <td>직원번호</td>
                                                    <td><input type="text" name='empNum' onChange={empAddChangeValue} /></td>
                                                </tr>

                                                <tr className='row'>
                                                    <td>비밀번호</td>
                                                    <td><input type="text" name='empPassword' onChange={empAddChangeValue} /></td>
                                                </tr>

                                            </tbody>
                                        </table>
                                        <div className='button-container'>
                                            <button className="emp-add-button" style={{ backgroundColor: '#427889' }} onClick={join}>등록</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {index === 3 && (
                                <>
                                    <div className="emp-left">
                                        <label id="addButton2" htmlFor="addButton1"><input type='file' id="addButton1" /></label>
                                    </div>
                                    <div className="emp-right">
                                        <table className='emp-inputbox'>
                                            <tbody>
                                                <tr className='row'>
                                                    <td>직업</td>
                                                    <td><input type="text" /></td>
                                                </tr>

                                                <tr className='row'>
                                                    <td>부서번호 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                    <td><input type="text" /></td>
                                                </tr>

                                                <tr className='row'>
                                                    <td>소속</td>
                                                    <td><input type="text" /></td>
                                                </tr>

                                                <tr className='row'>
                                                    <td>직급</td>
                                                    <td><input type="text" /></td>
                                                </tr>

                                                <tr className='row'>
                                                    <td>이름</td>
                                                    <td><input type="text" /></td>
                                                </tr>

                                                <tr className='row'>
                                                    <td>전화번호</td>
                                                    <td><input type="text" /></td>
                                                </tr>

                                                <tr className='row'>
                                                    <td>이메일</td>
                                                    <td><input type="text" /></td>
                                                </tr>

                                                <tr className='row'>
                                                    <td>직원번호</td>
                                                    <td><input type="text" /></td>
                                                </tr>

                                                <tr className='row'>
                                                    <td>비밀번호</td>
                                                    <td><input type="text" /></td>
                                                </tr>

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