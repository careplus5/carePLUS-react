import React, { useRef, useEffect, useState }  from 'react';
import Modal from 'react-modal';
import '../css/MetPatientModal.css';
import '../css/App.css';

Modal.setAppElement('#root');  // 'root'는 앱의 루트 엘리먼트의 id입니다

const MetPatientModal = ({ patient, onClose, onStatusChange, position }) => {
    const modalRef = useRef();


    const handleStatusChange = (e) => {
        onStatusChange(e.target.value);
        console.log(patient)
    };

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
          document.removeEventListener('mousedown', handleOutsideClick);
      };
  }, []);
  const patJumin = patient.patJumin;
  const birthYear = patJumin ? parseInt(patJumin.substring(0, 2)) + 1900 : null;
  const currentYear = new Date().getFullYear();
  const age = birthYear ? currentYear - birthYear : null;
    
  
    return (
        <div className="metmodal-overlay matmain">
            <div className="metmodal-content" 
                ref={modalRef}
                style={{ position: 'fixed', top: `${position.top}px`, left: `${position.left}px` }}
            >
                <span className='metmodal-title'>환자 정보</span>
                <span>
                    <select className="status-box" value={patient.testRequestAcpt} onChange={handleStatusChange}>
                        <option value="request">검사요청</option>
                        <option value="accept">수락</option>
                        <option value="wait">보류</option>
                    </select>
                </span>
                {/* <p>병실: {patient.room} </p> */}
                <br/>이름: {patient.patName} SA: {patient.patGender}/{age}
                <br/>환자 번호: {patient.patNum}
                <br/>혈액형: {patient.patBloodType}<br/>검사: {patient.testPart}
                <p>상태: {patient.testRequestAcpt}</p>
            </div>
        </div>
    );
};

export default MetPatientModal;
