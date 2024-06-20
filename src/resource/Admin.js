import { Table, Col, Button, Form, FormGroup, Label, Input, FormText, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import { url } from '../config';
import '../css/Admin.css';
import axios from 'axios';
import { redirect } from 'react-router';

const Admin = () => {
    const [accordion, setAccordion] = useState(null);
    const [empPageBtn, setEmpPageBtn] = useState([]);
    const [empPageInfo, setEmpPageInfo] = useState({});
    const [searchEmpJobName, setSearchEmpJobName] = useState('99');
    const [empWord, setEmpWord] = useState('');
    const [empType, setEmpType] = useState('');

    const [noticePageBtn, setNoticePageBtn] = useState([]);
    const [noticePageInfo, setNoticePageInfo] = useState({});
    const [noticeWord, setNoticeWord] = useState('');
    const [noticeType, setNoticeType] = useState('');

    const [employee, setEmployee] = useState({
        file: null, jobNum: '99', departmentNum: '', departmentName: '', department2Name: '', empPosition: '', empName: '', empTel: '', empEmail: '', empNum: '', empPassword: ''
    });
    const [selEmployee, setSelEmployee] = useState({
        profNum: null, jobNum: '', departmentNum: '', departmentName: '', department2Name: '', empPosition: '', empName: '', empTel: '', empEmail: '', empNum: '', empPassword: ''
    });
    const [notice, setNotice] = useState({
        noticeCategory: '99', noticeTitle: '', noticeContent: '', noticeNum: '', noticeWriteDate: '', noticeViewCount: ''
    })

    const [selNotice, setSelNotice] = useState({
        noticeCategory: '', noticeTitle: '', noticeContent: '', noticeNum: '', noticeWriteDate: '', noticeViewCount: ''
    })

    const [employeeList, setEmployeeList] = useState([]);
    const [noticeList, setNoticeList] = useState([]);
    useEffect(() => {
        searchNotice(1);
        if (searchEmpJobName !== '99') {
            searchEmployee(1);
        }
    }, [searchEmpJobName,])
    const toggleAccordion = (index) => {
        setAccordion(accordion === index ? null : index);
    };

    const empListTargetChoose = (e) => {
        console.log(e.target.value);
        setSearchEmpJobName(e.target.value);
    }
    const searchEmployee = (empPage) => {
        const empWord1 = encodeURIComponent(empWord);
        const searchEmployeeUrl = `${url}/employeeList?jobName=${searchEmpJobName}&page=${empPage}&type=${empType}&word=${empWord1}`;
        axios.get(searchEmployeeUrl)
            .then(res => {
                let empPageInfo = res.data.pageInfo;
                setEmployeeList([...res.data.employeeList])

                let empPage = [];
                let empPageButtons = [];
                for (let i = empPageInfo.startPage; i <= empPageInfo.endPage; i++) {
                    empPageButtons.push(i);
                }
                setEmpPageBtn([...empPageButtons]);
                setEmpPageInfo({ ...empPageInfo });
            })
            .catch(err => {
                console.error(err);
            })
    }

    const searchNotice = (noticePage) => {
        const searchNoticeUrl = `${url}/noticeList?page=${noticePage}&type=${noticeType}&word=${noticeWord}`;
        axios.get(searchNoticeUrl)
            .then(res => {
                let noticePageInfo = res.data.pageInfo;
                setNoticeList([...res.data.noticeList])
                let noticePage = [];
                for (let i = noticePageInfo.startPage; i <= noticePageInfo.endPage; i++) {
                    noticePage.push(i);
                }
                setNoticePageBtn([...noticePage]);
                setNoticePageInfo({ ...noticePageInfo });
            })
            .catch(err => {

            })
    }

    const noticeAddChange = (e) => {
        const { name, value, } = e.target;
        setNotice({ ...notice, [name]: value });
    };


    const empAddChangeValue = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const departmentChange = (e) => {
        const value = e.target.value;
        const [dnum, dname] = value.split(',');
        setEmployee({ ...employee, departmentNum: dnum, departmentName: dname });
    };

    const changeFile = (e) => {
        setEmployee({ ...employee, file: e.target.files[0] });
    }

    const empModifyChangeValue = (e) => {
        setSelEmployee({ ...selEmployee, [e.target.name]: e.target.value });
    }

    const noticeModifyChange = (e) => {
        setSelNotice({ ...selNotice, [e.target.name]: e.target.value });
    }
    const changeModifyFile = (e) => {
        setSelEmployee({ ...selEmployee, file: e.target.files[0] })
        const img = document.getElementById("mfileImg");
        img.src = URL.createObjectURL(e.target.files[0]);
    }

    const removeFile = () => {
        setEmployee({ ...employee, file: null });
    };

    const addNotice = (e) => {
        console.log(notice);
        axios.post(`${url}/noticeWrite`, notice)
            .then(res => {
                alert(res.data);
                searchNotice(1);
            }).catch(err => {
                alert(err);
            })
    }

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
        formData.append("departmentName", employee.departmentName)
        axios.post(`${url}/employeeAdd`, formData)
            .then(res => {
                alert(res.data);
                searchEmployee(1);
            })
            .catch(err => {
                alert(err)
            })
    }

    const empModify = (e) => {
        const formData = new FormData();
        formData.append("file", selEmployee.file);
        formData.append("jobNum", selEmployee.jobNum);
        formData.append("departmentNum", selEmployee.departmentNum);
        formData.append("department2Name", selEmployee.department2Name);
        formData.append("empPosition", selEmployee.empPosition);
        formData.append("empName", selEmployee.empName);
        formData.append("empTel", selEmployee.empTel);
        formData.append("empEmail", selEmployee.empEmail);
        formData.append("empNum", selEmployee.empNum);
        formData.append("empPassword", selEmployee.empPassword);
        formData.append("empDepartmentName", selEmployee.departmentName)
        axios.post(`${url}/employeeModify`, formData)
            .then(res => {
                alert(res.data);
                searchEmployee(1);
            })
            .catch(err => {
                alert(err)
            })
    }

    const noticeModify = (e) => {
        axios.post(`${url}/noticeModify`, selNotice)
            .then(res => {
                alert(res.data);
                searchNotice(1);
            }).catch(err => {
                alert(err);
            })
    }

    return (
        <div className="adminBackground" style={{ marginBottom: '100px' }}>
            <div className="left-panel">
                <div className="section">
                    <div className="title-box">
                        <img className="boxIcon" src="/img/notice.png" />
                        <span className="section-title">공지사항</span>
                    </div>
                    <div className="admSearchbar">
                        <select id="admKeywordSort" onChange={setNoticeType}>
                            <option>구분</option>
                            <option>카테고리</option>
                            <option>제목</option>
                            <option>내용</option>
                        </select>&nbsp;|<input type="text" id="keyword" placeholder=' 검색' onChange={setNoticeWord}/>
                        <label id="searchButton2" htmlFor="searchButton1" onClick={() => searchNotice(1)}><button id="searchButton1"> </button></label>
                    </div>
                    <table className='list-table'>
                        <thead>
                            <tr>
                                <th>게시 날짜</th>
                                <th>카테고리</th>
                                <th>글번호</th>
                                <th>제목</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noticeList.map(notice => (
                                <tr key={notice.noticeNum} onClick={() => {
                                    setAccordion(1);
                                    setSelNotice(notice)
                                }}
                                    className='list'>
                                    <td>{notice.noticeWriteDate}</td>
                                    <td>{notice.noticeCategory}</td>
                                    <td>{notice.noticeNum}</td>
                                    <td>{notice.noticeTitle}</td>
                                    <td>{notice.noticeViewCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination style={{ justifyContent: 'center', margin: '0 auto', width: "900px", paddingTop: "30px"}}>
                        <PaginationItem disabled={noticePageInfo.curPage === noticePageInfo.startPage}>
                            <PaginationLink previous onClick={() => searchNotice(noticePageInfo.curPage - 1)} />
                        </PaginationItem>
                        {noticePageBtn.map((noticePage) => (
                            <PaginationItem key={noticePage} className={noticePage === noticePageInfo.curPage ? 'active' : ''}>
                                <PaginationLink onClick={() => searchNotice(noticePage)}>{noticePage}</PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem disabled={noticePageInfo.curPage === noticePageInfo.endPage}>
                            <PaginationLink next onClick={() => searchNotice(noticePageInfo.curPage + 1)} />
                        </PaginationItem>
                    </Pagination>
                </div>
                <div className="section">
                    <div className="title-box">
                        <img className="boxIcon" src="/img/notice.png" />
                        <span className="section-title">직원 정보</span>
                    </div>
                    <select name='searchEmpJobName' className='selectJob' onChange={empListTargetChoose}>
                        <option value={"99"}>직업</option>
                        <option value={"11"}>의사</option>
                        <option value={"12"}>간호사</option>
                        <option value={"13"}>원무과</option>
                        <option value={"14"}>의료기사</option>
                    </select>
                    <div className="admSearchbar">
                        <select id="admKeywordSort" name='empType' onChange={(e) => setEmpType(e.target.value)}>
                            <option>구분</option>
                            <option value={"departmentName"}>부서</option>
                            <option value={"empName"}>이름</option>
                        </select >&nbsp;|<input type="text" id="keyword" name='empWord' placeholder=' 검색' onChange={(e) => setEmpWord(e.target.value)} />
                        <label id="searchButton2" htmlFor="searchButton1" onClick={() => searchEmployee(1)} ><button id="searchButton1"> </button></label>
                    </div>
                    <table className='list-table'>
                        <thead>
                            <tr>
                                <th>사번</th>
                                <th>직업</th>
                                <th>부서</th>
                                <th>소속</th>
                                <th>이름</th>
                                <th>이메일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeList.map(employee => (
                                <tr key={employee.empNum} onClick={() => {
                                    setAccordion(3);
                                    setSelEmployee(employee)
                                }} className='list'>
                                    <td>{employee.empNum}</td>
                                    <td>{employee.jobName}</td>
                                    <td>{employee.departmentName}</td>
                                    <td>{employee.department2Name}</td>
                                    <td>{employee.empName}</td>
                                    <td>{employee.empEmail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination style={{ justifyContent: 'center', margin: '0 auto', width: "900px", paddingTop: "20px" }}>
                        <PaginationItem disabled={empPageInfo.curPage === 1 ? true : false}>
                            <PaginationLink previous onClick={() => searchEmployee(empPageInfo.curPage - 1)} />
                        </PaginationItem>
                        {empPageBtn.map((empPage) => (
                            <PaginationItem key={empPage} className={empPage == empPageInfo.curPage ? 'active' : ''}>
                                <PaginationLink onClick={() => searchEmployee(empPage)}>{empPage}</PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem disabled={empPageInfo.curPage === empPageInfo.endPage ? true : false}>
                            <PaginationLink next onClick={() => searchEmployee(empPageInfo.curPage + 1)} />
                        </PaginationItem>
                    </Pagination>
                </div>
            </div>
            <div className="right-panel">
                {['공지사항 작성', '공지사항 수정', '직원정보 작성', '직원정보 수정'].map((title, index) => (
                    <div className={`accordion-section ${accordion === index ? 'active' : ''}`} key={index}>
                        <div className="accordion-header" onClick={(index == 2 || index == 0) ? () => toggleAccordion(index) : null}>
                            <img src='/img/write.png' alt='' className='write-img' />
                            <span className='accordion-header-title'>{title}</span>
                        </div>
                        <div className={`accordion-content ${accordion === index ? 'active' : ''}`}>
                            {index === 0 && (
                                <div className='accordion-group'>
                                    <div className="input-group">
                                        <select className="notice-select" name="noticeCategory" onChange={noticeAddChange}>
                                            <option value={99}>전체</option>
                                            <option value={11}>의사</option>
                                            <option value={12}>간호사</option>
                                            <option value={13}>원무과</option>
                                            <option value={14}>의료기사</option>
                                        </select>&nbsp;|&nbsp;
                                        <input type="text" className="notice-input" name='noticeTitle' onChange={noticeAddChange} />
                                    </div>
                                    <div className="textarea">
                                        <textarea name='noticeContent' style={{ width: '735px', height: '500px', boxShadow: '0 2px 5px 1px lightgray', border: '0', borderRadius: '10px', resize: 'none' }} onChange={noticeAddChange}></textarea>
                                    </div>
                                    <div className='button-container'>
                                        <button className="add-button" onClick={addNotice}>등록</button>
                                    </div>
                                </div>
                            )}
                            {index === 1 && (
                                <div className='accordion-group'>
                                    <div className="input-group" >
                                        <input type='text' className="notice-select" name='noticeCategory' value={selNotice.noticeCategory} onChange={noticeModifyChange} disabled />
                                        <input type="text" className="notice-input" name='noticeTitle' value={selNotice.noticeTitle} onChange={noticeModifyChange} />
                                    </div>
                                    <div className="textarea">
                                        <textarea style={{ width: '735px', height: '500px', boxShadow: '0 2px 5px 1px lightgray', border: '0', borderRadius: '10px', resize: 'none' }} name='noticeContent' value={selNotice.noticeContent} onChange={noticeModifyChange} />
                                    </div>
                                    <div className='button-container'>
                                        <button className="del-button" style={{ backgroundColor: 'lightgray' }}>삭제</button>
                                        <button className="add-button" style={{ backgroundColor: '#427889' }} onClick={noticeModify}>수정</button>
                                    </div>
                                </div>
                            )}
                            {index === 2 && (
                                <div>
                                    <div className="emp-left">
                                        {employee.file ? (
                                            <div className="emp-left">
                                                <button onClick={removeFile} className='addedFileButton'>
                                                    <img src={URL.createObjectURL(employee.file)} alt="Employee File Preview" className='addedFile' />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="emp-left">
                                                <label id="addButton2" htmlFor="addButton1"><input type='file' name="file" id="addButton1" onChange={changeFile} /></label>
                                            </div>
                                        )}
                                    </div>
                                    <div className="emp-right">
                                        <div className='emp-right-unit'>
                                            <div className='row-title'>직업</div>
                                            <div className='row-content'><select name='jobNum' onChange={empAddChangeValue}>
                                                <option value={"99"}>선택하세요</option>
                                                <option value={"11"}>의사</option>
                                                <option value={"12"}>간호사</option>
                                                <option value={"13"}>원무과</option>
                                                <option value={"14"}>의료기사</option>
                                            </select>
                                            </div>
                                        </div>
                                        {employee.jobNum == "99" &&
                                            <>
                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>부서이름 </div>
                                                    <div className='row-content'>
                                                        <select type="text" name="department" onChange={departmentChange} >
                                                            <option>선택</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>소속</div>
                                                    <div className='row-content'>
                                                        <select name='department2Name' onChange={empAddChangeValue}>

                                                        </select>
                                                    </div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>직급</div>
                                                    <div className='row-content'><input type="text" name='empPosition' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>이름</div>
                                                    <div className='row-content'><input type="text" name='empName' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>전화번호</div>
                                                    <div className='row-content'><input type="text" name='empTel' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>이메일</div>
                                                    <div className='row-content'><input type="text" name='empEmail' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>직원번호</div>
                                                    <div className='row-content'><input type="text" name='empNum' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>비밀번호</div>
                                                    <div className='row-content'><input type="text" name='empPassword' onChange={empAddChangeValue} /></div>
                                                </div>
                                                <div className='button-container'>
                                                    <button className="emp-add-button" style={{ backgroundColor: '#427889' }} onClick={join}>등록</button>
                                                </div>
                                            </>
                                        }

                                        {employee.jobNum == "11" &&
                                            <>
                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>부서이름 </div>
                                                    <div className='row-content'>
                                                        <select type="text" name="department" onChange={departmentChange} >
                                                            <option>선택</option>
                                                            <option value={"1,소화기과"}>소화기과</option>
                                                            <option value={"2,순환기과"}>순환기과</option>
                                                            <option value={"3,호급기과"}>호흡기과</option>
                                                            <option value={"4,내분비과"}>내분비과</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>소속</div>
                                                    <div className='row-content'>
                                                        <input type="text" name='department2Name' onChange={empAddChangeValue} />
                                                    </div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>직급</div>
                                                    <div className='row-content'><input type="text" name='empPosition' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>이름</div>
                                                    <div className='row-content'><input type="text" name='empName' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>전화번호</div>
                                                    <div className='row-content'><input type="text" name='empTel' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>이메일</div>
                                                    <div className='row-content'><input type="text" name='empEmail' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>직원번호</div>
                                                    <div className='row-content'><input type="text" name='empNum' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>비밀번호</div>
                                                    <div className='row-content'><input type="text" name='empPassword' onChange={empAddChangeValue} /></div>
                                                </div>
                                                <div className='button-container'>
                                                    <button className="emp-add-button" style={{ backgroundColor: '#427889' }} onClick={join}>등록</button>
                                                </div>
                                            </>
                                        }

                                        {employee.jobNum == "12" &&
                                            <>
                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>부서이름 </div>
                                                    <div className='row-content'><input type="text" name="departmentName" onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>소속</div>
                                                    <div className='row-content'>
                                                        <input type="text" name='department2Name' onChange={empAddChangeValue} />
                                                    </div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>직급</div>
                                                    <div className='row-content'><input type="text" name='empPosition' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>이름</div>
                                                    <div className='row-content'><input type="text" name='empName' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>전화번호</div>
                                                    <div className='row-content'><input type="text" name='empTel' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>이메일</div>
                                                    <div className='row-content'><input type="text" name='empEmail' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>직원번호</div>
                                                    <div className='row-content'><input type="text" name='empNum' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>비밀번호</div>
                                                    <div className='row-content'><input type="text" name='empPassword' onChange={empAddChangeValue} /></div>
                                                </div>
                                                <div className='button-container'>
                                                    <button className="emp-add-button" style={{ backgroundColor: '#427889' }} onClick={join}>등록</button>
                                                </div>
                                            </>
                                        }

                                        {employee.jobNum == "13" &&
                                            <>
                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>부서이름 </div>
                                                    <div className='row-content'><input type="text" name="departmentName" onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>소속</div>
                                                    <div className='row-content'>
                                                        <input type="text" name='department2Name' onChange={empAddChangeValue} />
                                                    </div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>직급</div>
                                                    <div className='row-content'><input type="text" name='empPosition' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>이름</div>
                                                    <div className='row-content'><input type="text" name='empName' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>전화번호</div>
                                                    <div className='row-content'><input type="text" name='empTel' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>이메일</div>
                                                    <div className='row-content'><input type="text" name='empEmail' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>직원번호</div>
                                                    <div className='row-content'><input type="text" name='empNum' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>비밀번호</div>
                                                    <div className='row-content'><input type="text" name='empPassword' onChange={empAddChangeValue} /></div>
                                                </div>
                                                <div className='button-container'>
                                                    <button className="emp-add-button" style={{ backgroundColor: '#427889' }} onClick={join}>등록</button>
                                                </div>
                                            </>
                                        }

                                        {employee.jobNum == "14" &&
                                            <>
                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>부서이름 </div>
                                                    <div className='row-content'><input type="text" name="departmentName" onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>소속</div>
                                                    <div className='row-content'>
                                                        <input type="text" name='department2Name' onChange={empAddChangeValue} />
                                                    </div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>직급</div>
                                                    <div className='row-content'><input type="text" name='empPosition' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>이름</div>
                                                    <div className='row-content'><input type="text" name='empName' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>전화번호</div>
                                                    <div className='row-content'><input type="text" name='empTel' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>이메일</div>
                                                    <div className='row-content'><input type="text" name='empEmail' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>직원번호</div>
                                                    <div className='row-content'><input type="text" name='empNum' onChange={empAddChangeValue} /></div>
                                                </div>

                                                <div className='emp-right-unit'>
                                                    <div className='row-title'>비밀번호</div>
                                                    <div className='row-content'><input type="text" name='empPassword' onChange={empAddChangeValue} /></div>
                                                </div>
                                                <div className='button-container'>
                                                    <button className="emp-add-button" style={{ backgroundColor: '#427889' }} onClick={join}>등록</button>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            )}
                            {index === 3 && (
                                <>
                                    <div className="emp-left">
                                        <img src={selEmployee.profNum ? `${url}/image/${selEmployee.profNum}` : '/img/profile.png'} alt="Employee File Preview"
                                            onClick={() => {
                                                document.getElementById('mfile').click()
                                            }}
                                            id="mfileImg" className='addedFileButton' />
                                        <input type='file' name="file" id="mfile" onChange={changeModifyFile} hidden />

                                    </div>
                                    <div className="emp-right">
                                        <div className='emp-right-unit'>
                                            <div className='row-title'>직업</div>
                                            <div className='row-content'><input type="text" name="jobName" value={selEmployee.jobName} onChange={empModifyChangeValue} disabled /></div>
                                        </div>

                                        <div className='emp-right-unit'>
                                            <div className='row-title'>부서번호 </div>
                                            <div className='row-content'><input type="text" name="departmentNum" value={selEmployee.departmentNum} onChange={empModifyChangeValue} /></div>
                                        </div>

                                        <div className='emp-right-unit'>
                                            <div className='row-title'>소속</div>
                                            <div className='row-content'><input type="text" name="department2Name" value={selEmployee.department2Name} onChange={empModifyChangeValue} /></div>
                                        </div>

                                        <div className='emp-right-unit'>
                                            <div className='row-title'>직급</div>
                                            <div className='row-content'><input type="text" name="empPosition" value={selEmployee.empPosition} onChange={empModifyChangeValue} /></div>
                                        </div>
                                        <div className='emp-right-unit'>
                                            <div className='row-title'>이름</div>
                                            <div className='row-content'><input type="text" name="empName" value={selEmployee.empName} onChange={empModifyChangeValue} disabled /></div>
                                        </div>

                                        <div className='emp-right-unit'>
                                            <div className='row-title'>전화번호</div>
                                            <div className='row-content'><input type="text" name="empTel" value={selEmployee.empTel} onChange={empModifyChangeValue} /></div>
                                        </div>

                                        <div className='emp-right-unit'>
                                            <div className='row-title'>이메일</div>
                                            <div className='row-content'><input type="text" name="empEmail" value={selEmployee.empEmail} onChange={empModifyChangeValue} /></div>
                                        </div>

                                        <div className='emp-right-unit'>
                                            <div className='row-title'>직원번호</div>
                                            <div className='row-content'><input type="text" name="empNum" value={selEmployee.empNum} onChange={empModifyChangeValue} disabled /></div>
                                        </div>

                                        <div className='emp-right-unit'>
                                            <div className='row-title'>비밀번호</div>
                                            <div className='row-content'><input type="text" name="empPassword" onChange={empModifyChangeValue} /></div>
                                        </div>
                                        <div className='button-container'>
                                            <button className="del-button" style={{ backgroundColor: 'lightgray' }}>삭제</button>
                                            <button className="emp-add-button" style={{ backgroundColor: '#427889' }} onClick={empModify}>수정</button>
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