import React, { useState } from 'react';
import "../css/NurDailyPrescription.css";
import { useAtomValue } from 'jotai';
import { usernameAtom } from '../config/Atom';
import { url } from '../config';
import axios from 'axios';

const PrescModal = ({ prescription, closeModal, buttonNum }) => {
    const username = useAtomValue(usernameAtom);
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);
    const [diaryStatus, setDiaryStatus] = useState('');

    // 라디오 버튼 클릭 핸들러
    const handleClick = (status) => {
        // 클릭된 라디오 버튼에 따라 상태 업데이트
        switch (status) {
            case '미투약':
                setIsChecked1(true);
                setIsChecked2(false);
                setIsChecked3(false);
                setIsChecked4(false);
                break;
            case '정상 투약':
                setIsChecked1(false);
                setIsChecked2(true);
                setIsChecked3(false);
                setIsChecked4(false);
                break;
            case '반환 가능 투약 실패':
                setIsChecked1(false);
                setIsChecked2(false);
                setIsChecked3(true);
                setIsChecked4(false);
                break;
            case '반환 불가능 투약 실패':
                setIsChecked1(false);
                setIsChecked2(false);
                setIsChecked3(false);
                setIsChecked4(true);
                break;
            default:
                break;
        }
        // diaryStatus 상태 업데이트
        setDiaryStatus(status);
    };

    // 처방 상태 업데이트 요청 함수
    const updatePresc = () => {
        const date = new Date();
        const isoString = date.toISOString();
        const hoursAndMinutes = isoString.substring(11, 16);

        const data = {
            patNum: prescription.patNum,
            prescriptionNum: prescription.prescriptionNum,
            buttonNum: buttonNum,
            nurNum: username,
            diaryStatus: diaryStatus,
            diaryTime: hoursAndMinutes
        };

        axios.post(`${url}/updatePrescriptionStatus`, data)
            .then(res => {
                console.log(res);
                closeModal();
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="PrescModalbox">
            <br />
            <div className="boxHeader">
                <h3 id="boxHeader" style={{ margin: "0 auto" }}>처방 상태 변경</h3>
            </div>
            <br />
            <div className="prescContent">
                {/* 미투약 */}
                <label className={isChecked1 ? 'labelL radio-checked' : 'labelL'} style={{ backgroundColor: "lightgray" }} htmlFor="presX1">
                    <input type="radio" id="presX1" style={{ height: "20px", display: "none", zIndex: "9999" }} onClick={() => handleClick('미투약')} /> 미투약
                </label>

                {/* 정상 투약 */}
                <label className={isChecked2 ? 'labelL radio-checked' : 'labelL'} style={{ backgroundColor: "#F7CE7E" }} htmlFor="presX2">
                    <input type="radio" id="presX2" style={{ height: "20px", display: "none", zIndex: "9999" }} onClick={() => handleClick('정상 투약')} /> 정상 투약
                </label>

                {/* 반환 가능 투약 실패 */}
                <label className={isChecked3 ? 'labelL radio-checked' : 'labelL'} style={{ backgroundColor: "#609E66" }} htmlFor="presX3">
                    <input type="radio" id="presX3" style={{ height: "20px", display: "none", zIndex: "9999" }} onClick={() => handleClick('반환 가능 투약 실패')} /> 투약 X - 반환 가능
                </label>

                {/* 반환 불가능 투약 실패 */}
                <label className={isChecked4 ? 'labelL radio-checked' : 'labelL'} style={{ backgroundColor: "red", marginBottom: "15px" }} htmlFor="presX4">
                    <input type="radio" id="presX4" style={{ height: "20px", display: "none", zIndex: "9999" }} onClick={() => handleClick('반환 불가능 투약 실패')} /> 투약 X - 반환 불가
                </label>
            </div>
            <button id="memoButton" style={{ margin: "0" }} onClick={updatePresc}>저장</button>
        </div>
    );
};

export default PrescModal;