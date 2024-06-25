import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../css/MetTestSearch.css';
import { url } from '../config';

Modal.setAppElement('#root');  // 'root'는 앱의 루트 엘리먼트의 id입니다

const MetTestSearchDetail = ({ testResultSelect, imagePath, onClose }) => {
    const date = testResultSelect.testDate;
    const [year, month, day] = date.split('-');


    return (
        <div className='background'>
            <div className='testsrcpopup-overlay'>
                <div className="testsrcpopup-content">
                <span className="testsrcpopupclose-btn" onClick={onClose}>&times;</span>
                    <div className='testsrc-container'>
                        <ul style={{ padding:'20px',listStyleType: 'none'}}>
                        {imagePath.map((searchDetail,i)=> (
                            <li key={i} style={{ padding:'20px'}}>
                            <span  style={{ fontSize:'18px', fontWeight:'500' }}>검사부위 : {testResultSelect.testPart}</span>
                            <br/>
                            <img src={`${url}/image/${searchDetail.testFileNum}`} alt="Test Result" style={{ maxWidth: '100%'}} />
                                    <br/>
                                    검사자 : {searchDetail.testMetNum}&nbsp;&nbsp;&nbsp;&nbsp;검사일 : {year}년 {month}월 {day}일
                                </li>
                        ))}
                        </ul>   
                    </div>
                </div>
            </div>
        </div>
    );

};
export default MetTestSearchDetail;