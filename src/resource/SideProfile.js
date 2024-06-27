import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/SideProfile.css';
import { url } from '../config';
import { useAtomValue } from 'jotai';
import { usernameAtom } from '../config/Atom';

const SideProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const userId = useAtomValue(usernameAtom);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await axios.get(`${url}/userInfo?userId=${userId}`);
                const { empName, departmentName, department2Name, profNum } = res.data;
                const ProfileData = {
                    profileImg: `${url}/profile/${profNum}`,
                    name: `${empName} 님`,
                    department: departmentName,
                    department2: department2Name,
                };
                setProfileData(ProfileData);
                console.log(res);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserInfo();
    }, [userId]);

    return (
        <div className="side-profile">
            <br />
            {profileData && (
                <>
                    <img id="profileImg" src={profileData.profileImg} alt="Profile" /><br />
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
