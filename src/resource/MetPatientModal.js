import React, { useRef, useEffect, useState }  from 'react';
import Modal from 'react-modal';
import '../css/MetPatientModal.css';
import '../css/App.css';

Modal.setAppElement('#root');  // 'root'는 앱의 루트 엘리먼트의 id입니다

const MetPatientModal = ({ patient, onClose, onStatusChange, position }) => {
    const modalRef = useRef();


    const handleStatusChange = (e) => {
        onStatusChange(e.target.value);
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

    
  
    return (
        <div className="metmodal-overlay matmain">
            <div className="metmodal-content" 
                ref={modalRef}
                style={{ position: 'fixed', top: `${position.top}px`, left: `${position.left}px` }}
            >
                <span className='metmodal-title'>환자 정보</span>
                <span>
                    <select className="status" value={patient.status} onChange={handleStatusChange}>
                        <option value="검사요청">검사요청</option>
                        <option value="수락">수락</option>
                        <option value="보류">보류</option>
                    </select>
                </span>
                <p>병실: {patient.room} </p>
                이름: {patient.name} SA: {patient.SA}
                <p>환자 번호: {patient.num}</p>
                <p>혈액형: {patient.bloodType}</p>
                <p>검사: {patient.test}</p>
                <p>상태: {patient.status}</p>
            </div>
        </div>
    );
};

export default MetPatientModal;
