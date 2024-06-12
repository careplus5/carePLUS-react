import '../css/Sidebar.css';
import MetRequest from './MetRequest';
import SideNotice from './SideNotice';
import SideProfile from './SideProfile';
import TodoList from './SideTodoList';
import { useState,useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { accessTokenAtom, empAtom, usernameAtom} from '../config/Atom.js';
const Sidebar = () => {
    const username = useAtomValue(usernameAtom).slice(0,2);
    const [memo, setMemo] = useState('');
    useEffect(()=>{
        const savedMemo = sessionStorage.getItem('memo');
        if(savedMemo){
            setMemo(savedMemo);
        }
        console.log("sidebar redirect");
    },[]);
  
    const memoRemove = () => {
        // 로그아웃 시 세션 스토리지에서 메모 삭제
        sessionStorage.removeItem('memo');
        // 로그아웃 처리 (예: navigate, 상태 초기화 등)
    };
    const memoChange = (e) =>{
        setMemo(e.target.value);
    }

    const saveMemo = () => {
        // 메모를 세션 스토리지에 저장
        sessionStorage.setItem('memo', memo);
    };

    return (
        <div id="sidebar">
                <SideProfile/>
                {username ===  '14' ?<MetRequest /> :<>
                <div className="sideMemo">
                    <div className="boxHeader">
                <img id="boxIcon" src="img/memo.png" style={{height:"20px", marginTop:"12px"}}/>
                <h3 id="boxHeader">메모</h3>
                </div>
                <div className="memoContent">
                    <input type="textarea" className="memo" value={memo} onChange={memoChange}/><br/>
                    <button id="memoButton" onClick={saveMemo}>저장</button>
                </div>
                </div><br/></>} 
                <SideNotice/>
                <TodoList/>
        
        </div>
    );
};

export default Sidebar;