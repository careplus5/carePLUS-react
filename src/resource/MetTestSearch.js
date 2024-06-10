import React, { useState } from 'react';
import axios from 'axios';
import '../css/MetTestSearch.css'

const MetTestResult = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // 검색어 입력 시 핸들러
    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // 검색어로 검색 요청을 보내는 함수
    const handleSearch = async () => {
        try {
            // axios를 사용하여 검색 요청을 보내고 결과를 받아옵니다.
            const response = await axios.get(`/api/search?q=${searchTerm}`);
            setSearchResults(response.data); // 검색 결과를 설정합니다.
        } catch (error) {
            console.error('검색 중 오류 발생:', error);
        }
    };

    return (
        <div>
            <div className='search-box'>
                <input
                    type="text"
                    placeholder="검색..."
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                />
                <img className='search-button' src='./img/MetSearch.png' onClick={handleSearch} alt='TestSearchIcon'/>
            </div>
            <div className='search-result'>
                <div className='title-box'>
                    <img className='meticon' src='./img/MetTestS.png' alt='TestResultIcon'/>
                    <span className='mettitle'>과거 검사이력</span>
                </div>
                <ul>
                    {searchResults.map((result, index) => (
                        <li key={index}>{result}</li>
                    ))}
                </ul>
            </div>

        </div>
    );

}; 
export default MetTestResult;