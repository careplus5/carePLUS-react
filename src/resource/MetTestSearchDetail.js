import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../css/EventManager.css';

Modal.setAppElement('#root');  // 'root'는 앱의 루트 엘리먼트의 id입니다

const MetTestSearchDetail = ({ testResultSelect, imagePath, onClose }) => {
    const date = testResultSelect.testDate;
    const [year, month, day] = date.split('-');



    return (
        <div className='background'>
            <div className='eventpopup-overlay'>
                <div className="eventpopup-content" >
                <span className="close-btn" onClick={onClose}>&times;</span>
                <ul>
                {imagePath.map((searchDetail,i)=> (
                    <li key={i} style={{ padding:'5px'}}>
                    검사일 : {year}년 {month}월 {day}일
                    <br/>
                    <img src={`.${searchDetail.testFilePath}`} alt="Test Result" style={{ maxWidth: '100%'}} />
                            <br/>
                            검사자 : {searchDetail.testMetNum}
                            <br/>
                            검사부위 : {testResultSelect.testPart}
                        </li>
                   ))}
                 </ul>   
                </div>
            </div>
        </div>
    );

};
export default MetTestSearchDetail;