import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/SideProfile.css';

const SideProfile = () => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        // const fetchProfileData = async () => {
        //     try {
        //         // Spring Boot 서버에서 데이터를 가져오는 요청
        //         const response = await axios.get('/api/profile'); // 예시 URL
        //         const data = response.data;
        //         setProfileData(data);
        //     } catch (error) {
        //         console.error('프로필 데이터를 가져오는 중 오류 발생:', error);
        //     }
        // };
        // fetchProfileData();

        // 가상의 데이터
        const sampleProfileData = {
            profileImg: '../img/profileImg.png',
            name: '홍길동',
            department: '어쩌구부',
            department2: '저쩌구과'
    };    
        // setProfileData로 상태를 설정해야 함
        setProfileData(sampleProfileData);
        
    }, []);

    return (
        <div className="side-profile">
            <br/>
            {profileData && (
                <>
                    <img id="profileImg" src={profileData.profileImg} alt="Profile" /><br/>
                    <p className="profile-name">{profileData.name}</p>
                    <span className='profile-dept1'>{profileData.department}</span>
                    <span className='profile-dept2'>{profileData.department2}</span>
                    <div className="line"> </div>
                </>
            )}
        </div>
    );
};

export default SideProfile;
