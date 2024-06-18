import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/SideProfile.css';
import { useAtom, useAtomValue } from 'jotai';
import { accessTokenAtom, empAtom, usernameAtom} from '../config/Atom.js';
const SideProfile = () => {
    const empName = useAtomValue(empAtom);
    const [profileData, setProfileData] = useState(null);
    const username = useAtomValue(usernameAtom);

    // useEffect(()=>{
    //     axios.get('/empName')
    //     .then(res=>{
    //      console.log(res);
    //     })
    //     .catch(err=>{
    //      console.log(err);
    //     })
    // },[username])
    useEffect(() => {
        const sampleProfileData = {
            profileImg: '../img/profileImg.png',
            name: empName.empName+" 님",
            department: '어쩌구부',
            department2: '저쩌구과'
    };    
        // setProfileData로 상태를 설정해야 함
        setProfileData(sampleProfileData);
        
    }, [username]);

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
