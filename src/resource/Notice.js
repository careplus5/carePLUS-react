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
    const [openNoticeId, setOpenNoticeId] = useState(null);

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

    useEffect(() => {
        Modal.setAppElement('#root');
        searchNotice(1);
    }, [])

    const toggleNotice = (noticeNum) => {
        setOpenNoticeId(openNoticeId === noticeNum ? null : noticeNum);
    };

    return (
        <div className='noticeListModalEvent'>
            <div className='noticeModalEventContent'>
                <div className="title-box">
                    <img className="boxIcon" src="/img/notice.png" />
                    <span className="section-title">공지사항</span>
                    <button className="noticeClose" onClick={closeModal}>&times;</button>
                </div>
                <div className="noticeSearchbar" style={{backgroundColor:"#f7f7f7"}}>
                    <select id="noticeKeyword" onChange={(e) => setNoticeType(e.target.value)} style={{backgroundColor:"#f7f7f7"}}>
                        <option>선택</option>
                        <option value={"category"}>카테고리</option>
                        <option value={"title"}>제목</option>
                        <option value={"content"}>내용</option>
                    </select>&nbsp;|<input type="text" id="keyword" placeholder=' 검색' onChange={(e) => setNoticeWord(e.target.value)}/>
                    <label id="searchButton2" htmlFor="searchButton1" onClick={() => searchNotice(1)}><button id="searchButton1"> </button></label>
                </div>
                <table className='list-table'>
                    <thead>
                        <tr>
                            <th className="notice-date">게시 날짜</th>
                            <th className="notice-category">카테고리</th>
                            <th className="notice-title">제목</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noticeList.map(notice => (
                            <React.Fragment key={notice.noticeNum}>
                                <tr onClick={() => toggleNotice(notice.noticeNum)} className='list'>
                                    <td className="notice-date">{notice.noticeWriteDate}</td>
                                    <td className="notice-category">{notice.noticeCategory}</td>
                                    <td className="notice-title">{notice.noticeTitle}</td>
                                </tr>
                                {openNoticeId === notice.noticeNum && (
                                    <tr className="content-contain">
                                        <td colSpan="3">
                                            <div className="notice-content">
                                                {notice.noticeContent}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <Pagination style={{ justifyContent: 'center', margin: '0 auto', width: "auto", paddingTop: "30px"}}>
                    <PaginationItem disabled={noticePageInfo.curPage === noticePageInfo.startPage}style={{borderBottom:"0"}}>
                        <PaginationLink previous onClick={() => searchNotice(noticePageInfo.curPage - 1)} style={{borderBottom:"0"}}/>
                    </PaginationItem>
                    {noticePageBtn.map((noticePage) => (
                        <PaginationItem key={noticePage} className={noticePage === noticePageInfo.curPage ? 'active' : ''}style={{borderBottom:"0"}}>
                            <PaginationLink onClick={() => searchNotice(noticePage)} style={{borderBottom:"0"}}>{noticePage}</PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem disabled={noticePageInfo.curPage === noticePageInfo.endPage}style={{borderBottom:"0"}}>
                        <PaginationLink next onClick={() => searchNotice(noticePageInfo.curPage + 1)} style={{borderBottom:"0"}}/>
                    </PaginationItem>
                </Pagination>
            </div>
        </div>
    )
}
export default Notice;