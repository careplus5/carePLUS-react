import React, { useState, useEffect } from 'react';
import '../css/AlarmOption.css';
import { usernameAtom } from '../config/Atom';
import { useAtom, useAtomValue } from 'jotai';
import axios from 'axios';
import { url } from '../config';

const AlarmOption = ({ showOption }) => {
    const username = useAtomValue(usernameAtom);
    const [isCheckedAdmission, setIsCheckedAdmission] = useState(false);
    const [isCheckedNotice, setIsCheckedNotice] = useState(false);
    const [isCheckedDiagnosis, setIsCheckedDiagnosis] = useState(false);
    const [isCheckedSurgery, setIsCheckedSurgery] = useState(false);
    const [isCheckedRequest, setIsCheckedRequest] = useState(false);
    const [isCheckedPrescription, setIsCheckedPrescription] = useState(false);
    const [isCheckedDischarge, setIsCheckedDischarge] = useState(false);
    const selectNum = username.substring(0, 2);

    useEffect((showOption) => {
        const subUserName = username.substring(0, 2)
        axios.post(`${url}/checkAlarmStatus`, { empNum: username })
            .then(res => {
                if (subUserName == '11') {
                    const [notice, diagnosis, surgery] = res.data;
                    setIsCheckedNotice(notice);
                    setIsCheckedDiagnosis(diagnosis);
                    setIsCheckedSurgery(surgery);
                } else if (subUserName == '12') {
                    const [notice, surgery, admission, request] = res.data;
                    setIsCheckedNotice(notice);
                    setIsCheckedSurgery(surgery);
                    setIsCheckedAdmission(admission);
                    setIsCheckedRequest(request);
                } else if (subUserName == '13') {
                    const [notice, prescription, discharge] = res.data;
                    setIsCheckedNotice(notice);
                    setIsCheckedPrescription(prescription);
                    setIsCheckedDischarge(discharge);
                } else if (subUserName == '14') {
                    const [notice] = res.data;
                    setIsCheckedNotice(notice);
                }
            })
    }, [])

    const handleToggle = ({name, empNum}) => {
        axios.post(`${url}/changeAlarmStatus`, { empNum: empNum, alarmName: name })
            .then(res => {
                console.log(res.data)
                switch (res.data) {
                    case '공지사항':
                        setIsCheckedNotice(!isCheckedNotice);
                        break;
                    case '진료':
                        setIsCheckedDiagnosis(!isCheckedDiagnosis);
                        break;
                    case '수술':
                        setIsCheckedSurgery(!isCheckedSurgery);
                        break;
                    case '요청사항':
                        setIsCheckedRequest(!isCheckedRequest);
                        break;
                    case '처방':
                        setIsCheckedPrescription(!isCheckedPrescription);
                        break;
                    case '입원':
                        setIsCheckedAdmission(!isCheckedAdmission);
                        break;
                    case '퇴원':
                        setIsCheckedDischarge(!isCheckedDischarge);
                        break;
                    default: break;
                }
            })
            .catch(err => {
                console.log(err);
            })

    };

    return (
        <div className='alarm-option-container'>
            {selectNum == '11' && (
                <>
                    <div className='alarm-option-unit'>
                        <span className='alarm-option-content' name='공지사항'>공지사항 알람</span>
                        <label className="switch">
                            <input type="checkbox" checked={isCheckedNotice} onChange={() => handleToggle({name: '공지사항', empNum: username})} />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className='alarm-option-unit'>
                        <span className='alarm-option-content' name='진료'>진료 알람</span>
                        <label className="switch">
                            <input type="checkbox" checked={isCheckedDiagnosis} onChange={() => handleToggle({name: '진료', empNum: username})} />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className='alarm-option-unit'>
                        <span className='alarm-option-content' name='수술'>수술 알람</span>
                        <label className="switch">
                            <input type="checkbox" checked={isCheckedSurgery} onChange={() => handleToggle({name: '수술', empNum: username})} />
                            <span className="slider"></span>
                        </label>
                    </div>
                </>
            )}
            {selectNum == '12' && (
                <>
                    <div className='alarm-option-unit'>
                        <span className='alarm-option-content' name='공지사항'>공지사항 알람</span>
                        <label className="switch">
                            <input type="checkbox" checked={isCheckedNotice} onChange={() => handleToggle({name: '공지사항', empNum: username})} />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className='alarm-option-unit'>
                        <span className='alarm-option-content' name='수술'>수술 알람</span>
                        <label className="switch">
                            <input type="checkbox" checked={isCheckedSurgery} onChange={() => handleToggle({name: '수술', empNum: username})} />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className='alarm-option-unit'>
                        <span className='alarm-option-content' name='입원'>입원 알람</span>
                        <label className="switch">
                            <input type="checkbox" checked={isCheckedAdmission} onChange={() => handleToggle({name: '입원', empNum: username})} />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className='alarm-option-unit'>
                        <span className='alarm-option-content' name='요청사항'>요청사항 알람</span>
                        <label className="switch">
                            <input type="checkbox" checked={isCheckedRequest} onChange={() => handleToggle({name: '요청사항', empNum: username})} />
                            <span className="slider"></span>
                        </label>
                    </div>
                </>
            )}
            {selectNum == '13' && (
                <>
                    <div className='alarm-option-unit'>
                        <span className='alarm-option-content' name='공지사항'>공지사항 알람</span>
                        <label className="switch">
                            <input type="checkbox" checked={isCheckedNotice} onChange={() => handleToggle({name: '공지사항', empNum: username})} />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className='alarm-option-unit'>
                        <span className='alarm-option-content' name='처방'>처방 알람</span>
                        <label className="switch">
                            <input type="checkbox" checked={isCheckedPrescription} onChange={() => handleToggle({name: '처방', empNum: username})} />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className='alarm-option-unit'>
                        <span className='alarm-option-content' name='퇴원'>퇴원 알람</span>
                        <label className="switch">
                            <input type="checkbox" checked={isCheckedDischarge} onChange={() => handleToggle({name: '퇴원', empNum: username})} />
                            <span className="slider"></span>
                        </label>
                    </div>
                </>
            )}
            {selectNum == '14' && (
                <div className='alarm-option-unit'>
                    <span className='alarm-option-content' name='공지사항'>공지사항 알람</span>
                    <label className="switch">
                        <input type="checkbox" checked={isCheckedNotice} onChange={() => handleToggle({name: '공지사항', empNum: username})} />
                        <span className="slider"></span>
                    </label>
                </div>
            )}
        </div>
    );
};

export default AlarmOption;