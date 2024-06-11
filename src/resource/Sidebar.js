import { empAtom } from '../config/Atom';
import '../css/App.css';
import { useState,useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';

const Sidebar = () => {
    const [emp, setEmp] = useAtom(empAtom);
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
        
        <>
        <div className="sideBar">
            <div className="sideProfile">
                <br/>
                <img id="profileImg" src="img/profileImg.png"/><br/>
                <h4 id="profileText">김동현</h4><br/>
                <h4 id="profileText">1병동 A팀</h4>
                <div className="line"> </div>
                <br/>
                <div className="sideMemo">
                    <div className="boxHeader">
                <img id="boxIcon" src="img/memo.png" style={{height:"20px", marginTop:"12px"}}/>
                <h3 id="boxHeader">메모</h3>
                </div>
                <div className="memoContent">
                    <input type="textarea" className="memo" value={memo} onChange={memoChange}/><br/>
                    <button id="button1" onClick={saveMemo}>저장</button>
                </div>
                </div>
                <br/>
                <div className="sideNotice">
                    <div className="boxHeader">
                <img id="boxIcon" style={{marginTop:"5px"}}src="img/notice.png"/>
                <h3 id="boxHeader">공지</h3>
                <br/> <br/>
                <button id="button2">&nbsp;&nbsp;+</button>
                </div>

                <div className="line"></div>
                <div className="noticeContent">
                    <a src="#"><p>[외래과] 3층 화장실 막혔습니다</p></a>
                    <a src="#"><p>[외래과] 3층 화장실 막혔습니다</p></a>
                    <a src="#"><p>[외래과] 3층 화장실 막혔습니다</p></a>
                    <a src="#"><p>[외래과] 3층 화장실 막혔습니다</p></a>
                    <a src="#"><p>[외래과] 3층 화장실 막혔습니다</p></a>
                </div>
                </div>
                <br/>

                <div className="sideTodo">
                    <br/>
                    <div className="boxHeader">
                <h3 id="boxHeaderTodo">5/13 TO DO LIST</h3>
                </div>
                <br/>
                <div className="todoContent">
                <div id="todoInput"><input type="text" id="todo" placeholder="일정을 적고 엔터를 누르면 추가됨"></input></div>
                </div>
                <div id="todoList">
                    <input type="checkbox" id="todoCheck"/> 나환자 환자 진료
                </div>
                <div id="todoList">
                    <input type="checkbox" id="todoCheck"/> 나환자 환자 진료
                </div>
                <div id="todoList">
                    <input type="checkbox" id="todoCheck"/> 나환자 환자 진료
                </div>
                <div id="todoList">
                    <input type="checkbox" id="todoCheck"/> 나환자 환자 진료
                </div>
                
                </div>
            </div>
        </div>
        </>
    )
}

export default Sidebar;