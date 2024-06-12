import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MetPatientModal from './MetPatientModal';
import '../css/MetRequest.css';

const MetRequest= () => {
    const [items, setItems] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const sidebarRef = useRef();
    const [triggerUpdate, setTriggerUpdate] = useState(false);

    useEffect(() => {
        // 여기서는 임시로 fetch를 시뮬레이션합니다.
        // 실제로는 Spring Boot 서버와 통신해야 합니다.
        const fetchData = () => {
          // DB에서 데이터를 가져옵니다.
          // 예제 데이터를 사용하겠습니다.
          const data = [
            { id: 1, num: '001482012', room:'2560', name: '이길동', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)', status: '대기중' },
            { id: 2, num: '001482012', room:'2560', name: '표길동', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)', status: '검사요청' },
            { id: 3, num: '001482012', room:'2560', name: '박길동', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)', status: '검사요청' },
            { id: 4, num: '001482012', room:'2560', name: '최길동', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)', status: '검사요청' }
          ];
    
    
        const sortedItems = sortItems(data);
        setItems(sortedItems);

        };
    
        fetchData();
      }, []);

       // '검사요청' 항목을 상단에 배치
       const sortItems = (items) => {
        return items.sort((a, b) => {
            if (a.status === '검사요청') return -1;
            if (b.status === '검사요청') return 1;
            if (a.status === '보류') return b.status === '검사요청' ? 1 : -1;
            if (b.status === '보류') return a.status === '검사요청' ? -1 : 1;
            return 1;
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
            const element = document.querySelector(`[data-id='${selectedPatient.id}']`);
            if (element && sidebarRef.current) {
                const sidebarRect = sidebarRef.current.getBoundingClientRect();
                const rect = element.getBoundingClientRect();
                setModalPosition({ top: rect.top + window.scrollY, left: sidebarRect.right + 10 });
            }
        }
    }, [triggerUpdate, selectedPatient]);

      const handleStatusChange = async (newStatus) => {
        if (!selectedPatient) return;
        try {
          // 프론트엔드에서 상태 업데이트
          setItems((prevItems) => {
          //   prevItems.map((item) => item.id === selectedPatient.id ? { ...item, status: newStatus } : item)
          //            .sort((a, b) => (a.status === '검사요청' ? -1 : 1))
          // );
            const updatedItems = prevItems.map((item) => 
              item.id === selectedPatient.id ? { ...item, status: newStatus } : item
            );
            return sortItems(updatedItems);
          });
          setSelectedPatient((prevPatient) => ({ ...prevPatient, status: newStatus }));
          // 백엔드에서 상태 업데이트
          await axios.post('/api/updateStatus', { id: selectedPatient.id, status: newStatus });
          setTriggerUpdate(prev => !prev); // 상태 변경을 트리거하여 위치 업데이트
        } catch (error) {
          console.error('상태 업데이트 오류:', error);
        }
      };
        
    return (
        <div className="app-container matmain" ref={sidebarRef}>
            <div className='title-box'>
                <img className='meticon' src='./img/MetRequest.png' alt='Met Icon'/>
                <span className='mettitle'>검사요청</span>
            </div>
            <br/>
            <ul className='ul'>
                {items.map(item => (
                <li key={item.id} 
                  data-id={item.id} // 추가된 부분
                  className={`li ${item.status === '검사요청' ? 'new-item' : ''} ${item.status === '보류' ? 'pending-item' : ''}`}
                  onClick={(e) => handlePatientClick(e,item)}>
                    {item.room} {item.name} {item.SA} {item.num} {item.bloodType}
                    <br/>
                    검사 : {item.test}
                    
                </li>
                ))}
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