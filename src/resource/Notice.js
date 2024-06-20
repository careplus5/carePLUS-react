import React, { useEffect, useState } from "react";
import { url } from "../config";
import Modal from 'react-modal';
import axios from "axios";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import '../css/Notice.css';

const Notice = ({ isNoticeListOpen, setIsNoticeListOpen }) => {
    const [noticeList, setNoticeList] = useState([]);
    const [selNotice, setSelNotice] = useState({
        noticeCategory: '', noticeTitle: '', noticeContent: '', noticeNum: '', noticeWriteDate: '', noticeViewCount: ''
    })
    const [noticePageBtn, setNoticePageBtn] = useState([]);
    const [noticePageInfo, setNoticePageInfo] = useState({});
    const [noticeWord, setNoticeWord] = useState('');
    const [noticeType, setNoticeType] = useState('');


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

    const closeModal = (e) => {
        setIsNoticeListOpen(!isNoticeListOpen)
    }

    const selectNotice = (noticeNum) => {
        axios.get(`${url}/noticeDetail?noticeNum=${noticeNum}`)
            .then(res => {
                setSelNotice(res.data.noticeDto);
            })

    }
    useEffect(() => {
        Modal.setAppElement('#root');
        searchNotice(1);
    }, [])

    const noticeDetailClose = (e) => {
        setSelNotice({});
    }
    return (
        <div className='noticeListModalEvent'>
            <div className='noticeModalEventContent'>
                <div className="title-box">
                    <img className="boxIcon" src="/img/notice.png" />
                    <span className="section-title">공지사항</span>
                    <button className="noticeClose" onClick={closeModal}>&times;</button>
                </div>
                <div className="admSearchbar">
                    <select id="admKeywordSort" onChange={setNoticeType}>
                        <option>구분</option>
                        <option>카테고리</option>
                        <option>제목</option>
                        <option>내용</option>
                    </select>&nbsp;|<input type="text" id="keyword" placeholder=' 검색' onChange={setNoticeWord} />
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
                                selectNotice(notice.noticeNum)
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
                <Pagination style={{ justifyContent: 'center', margin: '0 auto', width: "900px", paddingTop: "30px" }}>
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
        </div>
    )
}
export default Notice;