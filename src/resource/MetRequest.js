import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MetPatientModal from './MetPatientModal';
import '../css/MetRequest.css';
import { url } from '../config';
import { useAtomValue } from 'jotai';
import { usernameAtom } from '../config/Atom';

const MetRequest = () => {
    const [items, setItems] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const sidebarRef = useRef();
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    const userId = useAtomValue(usernameAtom);
    const [dept2Name, setDept2Name] = useState('');

    useEffect(() => {
        axios.get(`${url}/userInfo?userId=${userId}`)
            .then((res) => {
                setDept2Name(res.data.department2Name);
            })
            .catch((err) => {
                console.log(err);
            });
        fetchData();
    }, [userId]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${url}/testRequestList?dept2Name=${dept2Name}`);
            const sortedItems = sortItems(response.data);
            setItems(sortedItems);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 7000);
        return () => clearInterval(interval);
    }, [dept2Name]);

    const sortItems = (items) => {
        return items.sort((a, b) => {
            if (a.testRequestAcpt === 'request') return -1;
            if (b.testRequestAcpt === 'request') return 1;
            if (a.testRequestAcpt === 'wait') return b.testRequestAcpt === 'request' ? 1 : -1;
            if (b.testRequestAcpt === 'wait') return a.testRequestAcpt === 'request' ? -1 : 1;
            return 0;
        });
    };

    const handlePatientClick = (event, patient) => {
        if (sidebarRef.current) {
            const sidebarRect = sidebarRef.current.getBoundingClientRect();
            const rect = event.target.getBoundingClientRect();
            setModalPosition({ top: rect.top + window.scrollY, left: sidebarRect.right + 10 });
            setSelectedPatient(patient);
        }
    };

    const handleCloseModal = () => {
        setSelectedPatient(null);
    };

    useEffect(() => {
        if (selectedPatient) {
            const element = document.querySelector(`[data-id='${selectedPatient.test_request_num}']`);
            if (element && sidebarRef.current) {
                const sidebarRect = sidebarRef.current.getBoundingClientRect();
                const rect = element.getBoundingClientRect();
                setModalPosition({ top: rect.top + window.scrollY, left: sidebarRect.right + 10 });
            }
        }
    }, [triggerUpdate, selectedPatient]);

    const handleStatusChange = async (newTestRequestAcpt) => {
        if (!selectedPatient) return;
        try {

              console.log(selectedPatient.testRequestNum)
            // 백엔드에서 상태 업데이트
            const response = await axios.post(`${url}/updateRequestStatus`, {
                id: selectedPatient.testRequestNum,
                testRequestAcpt: newTestRequestAcpt
            });
            const result = response.data;
            console.log(result)
            if (result==true){
                  // 프론트엔드에서 상태 업데이트
                setItems((prevItems) => {
                  const updatedItems = prevItems.map((item) =>
                      item.testRequestNum === selectedPatient.testRequestNum ? { ...item, testRequestAcpt: newTestRequestAcpt } : item
                  );
                  return sortItems(updatedItems);
              });
            } else {

            }

            // 상태 변경을 트리거하여 위치 업데이트
            setTriggerUpdate(prev => !prev);

            // setSelectedPatient 업데이트
            setSelectedPatient(prevPatient => ({
                ...prevPatient,
                testRequestAcpt: newTestRequestAcpt
            }));

        } catch (error) {
            console.error('상태 업데이트 오류:', error);
        }
    };

    return (
        <div className="app-container matmain" ref={sidebarRef}>
            <div className='mettitle-box'>
                <img className='meticon' src='./img/MetRequest.png' alt='Met Icon' />
                <span className='mettitle'>검사요청</span>
            </div>
            <ul className='ul'>
                {items.map((item, i) => {
                  // patJumin에서 생년을 추출하여 나이 계산
                const patJumin = item.patJumin;
                const birthYear = patJumin ? parseInt(patJumin.substring(0, 2)) + 1900 : null;
                const currentYear = new Date().getFullYear();
                const age = birthYear ? currentYear - birthYear : null;

                return (
                    <li key={i}
                        data-id={item.testRequestNum}
                        className={`li ${item.testRequestAcpt === 'request' ? 'new-item' : ''} ${item.testRequestAcpt === 'wait' ? 'pending-item' : ''}`}
                        onClick={(e) => handlePatientClick(e, item)}>
                        {item.room} {item.patName} ({item.patGender}/{age})<br /> {item.patNum} {item.patBloodType}형
                        <br />
                        검사 : {item.testPart}
                    </li>
                );
                })}
            </ul>
            {selectedPatient && (
                <MetPatientModal
                    patient={selectedPatient}
                    onClose={handleCloseModal}
                    onStatusChange={handleStatusChange}
                    position={modalPosition}
                />
            )}
        </div>
    );
};

export default MetRequest;
