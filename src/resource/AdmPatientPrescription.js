import { useState, useEffect } from "react";


// 처방전 발급
const AdmPatientPrescription = () => {

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        // 임의의 테스트 데이터
        const testPatients = [
            { id: 1, num: '001482012', room:'2560', name: '김길동', SA:'F/49', bloodType:'AB+/AB+' ,test:'MRI(복부)' ,appointmentTime: '2024-06-03T09:00', status: 'waiting' },
            { id: 2, num: '001492012', room:'2560', name: 'Jane Smith', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)' , appointmentTime: '2024-06-03T09:30', status: 'waiting' },
            { id: 3, num: '001502012', room:'2560', name: 'Emily Johnson', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)' , appointmentTime: '2024-06-03T10:00', status: 'completed' },
            { id: 4, num: '001512012', room:'2560', name: '고길동', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)' , appointmentTime: '2024-06-03T08:00', status: 'in-progress' },
            { id: 5, num: '001522012', room:'2560', name: '송길동', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)' , appointmentTime: '2024-06-03T10:00', status: 'completed' },
            { id: 6, num: '001532012', room:'2560', name: '홍길동', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)' , appointmentTime: '2024-06-03T10:00', status: 'completed' },
            { id: 7, num: '001542012', room:'2560', name: '강길동', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)' , appointmentTime: '2024-06-03T10:00', status: 'completed' },
            { id: 8, num: '001552012', room:'2560', name: '차길동', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)' , appointmentTime: '2024-06-03T08:30', status: 'waiting' },
            { id: 9, num: '001562012', room:'2560', name: '독고길동', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)' , appointmentTime: '2024-06-03T10:00', status: 'completed' },
            { id: 10,num: '001572012', room:'2560', name: '남궁길동', SA:'F/49', bloodType:'AB+/AB+',test:'MRI(복부)' , appointmentTime: '2024-06-03T10:00', status: 'completed' }
        ];
        // 검사 시간 순으로 정렬
        const sortedPatients = testPatients.sort((a, b) => new Date(a.appointmentTime) - new Date(b.appointmentTime));
        setPatients(sortedPatients);
    }, []);

    const handleStatusChange = (patNum, testStatus) => {
        const updatedPatients = patients.map(patient =>
            patient.id === patNum ? { ...patient, status: testStatus.target.value } : patient
        );

        // 상태별 재정렬: 'waiting' 및 'in-progress' 먼저, 'completed'는 나중에
        const sortedPatients = updatedPatients.sort((a, b) => {
            if (a.status === 'completed' && b.status !== 'completed') return 1;
            if (a.status !== 'completed' && b.status === 'completed') return -1;
            return new Date(a.appointmentTime) - new Date(b.appointmentTime);
        });

        setPatients(sortedPatients);

        // 여기에 상태 변경을 서버에 반영하는 코드를 추가할 수 있습니다.
        // 예를 들어, axios.post('/api/patients/update', { id: patNum, status: testStatus.target.value });
    };


    return (
        <div id="LaccordionBox">
            <div className="boxHeader" style={{ marginLeft: "35px" }} >
                <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/document.png" />&nbsp;
                <h3 id="LboxHeader" style={{ marginTop: "19px", marginRight: "1155px" }}>처방전 발급</h3>
                <button style={{ marginTop: "20px" }} >접수</button>
            </div>
            <br />
            <ul className="admPrescriptionList">
                {patients.map((patient) => (
                    <li key={patient.num} className='admPatientPrescription-item'>
                        {/* <select className={`prescriptionSelectelect-box ${patient.status}`}
                            value={patient.status || ''}
                            onChange={(testStatus) => handleStatusChange(patient.id, testStatus)}
                        >
                            <option value="">상태 선택</option>
                            <option value="waiting" style={{ color: 'yellow' }}>대기중</option>
                            <option value="completed" style={{ color: 'lightgrey' }}>완료</option>
                        </select> */}
                        <div className="patientPrescription-info" onClick={() => {alert('aa')}}>
                            <p>{patient.num}</p>
                            <p>{patient.name + ' (' + patient.SA + ') '}</p>
                            <p>{patient.bloodType}</p>
                            {/* <p>{patient.num + ' ' + patient.name + ' (' + patient.SA + ') ' + patient.bloodType}</p> */}
                        </div>
                        {/* <p>{new Date(patient.appointmentTime).toLocaleTimeString()}</p> */}
                    </li>
                ))}
            </ul>
        </div>

        // <div id="LaccordionBox">
        //     <div className="boxHeader" style={{ marginLeft: "35px" }} >
        //         <img id="boxIcon" style={{ marginTop: "15px", width: "40px", height: "40px" }} src="./img/document.png" />&nbsp;
        //         <h3 id="LboxHeader" style={{ marginTop: "19px", marginRight: "1155px" }}>처방전 발급</h3>
        //         <button style={{ marginTop: "20px" }} >접수</button>
        //         <div>
        //             <span >주민등록번호</span>&nbsp;&nbsp;<input type="text"
        //                 style={{
        //                     width: "200px", height: "30px", backgroundColor: "#FFFEFB",
        //                     border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
        //                 }} />&nbsp;&nbsp;
        //             <span style={{ marginLeft: "150px" }}>처방일시</span>&nbsp;&nbsp;<input type="text"
        //                 style={{
        //                     width: "200px", height: "30px", backgroundColor: "#FFFEFB",
        //                     border: "none", boxShadow: "1px lightgray inset", border: "none", borderRadius: "10px"
        //                 }} />
        //         </div><br />
        //     </div>
        // </div>
    )
}

export default AdmPatientPrescription;