import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/MetTestSearch.css';
import { url } from '../config';
import MetTestSearchDetail from './MetTestSearchDetail';


const MetTestResult = ({ selectedPatient, userInfo }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [testResultSelect, setTestResultSelect] = useState(null);
    const [imagePath, setImagePath] = useState([]);


    useEffect(() => {
        if (selectedPatient) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`${url}/testAllList?dept2Name=${userInfo.department2Name}&patNum=${selectedPatient.patNum}`);
                    console.log(response.data);
                    const sortedResults = sortResults(response.data);
                    setSearchResults(sortedResults);
                    setFilteredResults(sortedResults); // 초기 필터링 결과 설정
                } catch (error) {
                    console.error('과거 검사 목록을 가져오는 중 오류 발생:', error);
                }
            };
            fetchData();
        }
    }, [selectedPatient, userInfo]);

    const sortResults = (testResult) => {
        return testResult.sort((a, b) => {
            const dateA = new Date(a.testDate);
            const dateB = new Date(b.testDate);
            return dateB - dateA; // 최신순으로 정렬
        });
    };

    const patJumin = selectedPatient.patJumin;
    const birthYear = patJumin ? (parseInt(patJumin.substring(0, 2)) + (patJumin[6] <= '2' ? 1900 : 2000)) : null;
    const currentYear = new Date().getFullYear();
    const age = birthYear ? currentYear - birthYear : null;

    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // 클라이언트 측에서 검색어로 필터링
        const filtered = searchResults.filter((testResult) =>
            testResult.testName.toLowerCase().includes(value.toLowerCase()) ||
            testResult.testPart.toLowerCase().includes(value.toLowerCase()) ||
            testResult.testDate.toLowerCase().includes(value.toLowerCase()) 
        );
        setFilteredResults(filtered);
    };

    const TestResultSelect = async (testResult) => {
        console.log(testResult);
        setTestResultSelect(testResult);

        try {
            // 서버에서 testFile 가져오기
            const response = await axios.get(`${url}/getTestFile?testNum=${testResult.testNum}`);
            console.log('Response from server:', response);
            setImagePath(response.data); // 가져온 파일 내용 설정
        } catch (error) {
            console.error('이미지 파일을 가져오는 중 오류 발생:', error);
        }
    };

    const handleCloseModal = () => {
        setImagePath([]); // 모달 닫을 때 파일 경로 초기화
        setTestResultSelect(null); // 선택된 결과 초기화
    };

    return (
        <div>
            <div className='search-box matmain'>
                <input
                    type="text"
                    placeholder="검색..."
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                />
                <img
                    className='search-button'
                    src='./img/MetSearch.png'
                    alt='TestSearchIcon'
                />
            </div>
            <div className='search-result'>
                <div className='mettitle-box' style={{ paddingBottom: '10px' }}>
                    <img className='meticon' src='./img/MetTestS.png' alt='TestResultIcon' />
                    <span className='mettitle'>과거 검사이력</span>
                    {selectedPatient && (
                        <span className='pat-info'>
                            {selectedPatient.patNum} {selectedPatient.patName} ({selectedPatient.patGender}/{age}) {selectedPatient.patBloodType}
                        </span>
                    )}
                </div>
                <div className='scroll-box'>
                    <ul>
                        {filteredResults.map((testResult, i) => (
                            <li key={i} data-id={testResult.testNum} className='result-item' onClick={() => TestResultSelect(testResult)}>
                                {testResult.testName} : {testResult.testPart} {new Date(testResult.testDate).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                        {testResultSelect && (
                            <MetTestSearchDetail
                                testResultSelect={testResultSelect}
                                imagePath={imagePath}
                                onClose={handleCloseModal}
                            />
                        )}
                </div>
            </div>
        </div>
    );
};

export default MetTestResult;
