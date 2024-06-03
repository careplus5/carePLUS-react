import '../css/Login.css';
import '../css/App.css';
import {useState, useEffect, useContext} from 'react';
import axios from "axios";
import {url} from '../config'
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import storage from 'redux-persist/lib/storage';
import store from '../store';
import UserContext from './UseContext';

// 401 에러 해결하기
const Login = ({ onLoginSuccess }) => {
    // 로그인하려는 직원, 아이디와 비밀번호
    const [user, setUser] = useState({ username:'', password:''});
    const {setUsername} = useContext(UserContext);
    
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    // redux에서 상태를 변경하기 위해 액션을 스토어에 전달하는 함수
    // 액션을 스토어에 보내고, 그 결과로 상태가 업데이트됨
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const changeValue = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }
    const submit = (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
                 // formData => 제일 일반적으로 넘기는 형태 (obtainUsername으로 갖고올때), 기본 default get.parameter!!!
                 // JSON => 컨트롤러로 어노테이션으로 쓸때.
        let formData = new FormData();
        formData.append("username", user.username);
        formData.append("password", user.password);
        axios.post(`${url}/login`,formData)
            .then(res => {
                console.log(res.data);
                dispatch({type:'user',payload:res.data})
                onLoginSuccess(user.username); 
                setUsername(user.username);
                navigate("/organ");
                //DTO 에서 파라미터 값을 받아서 넣어줌
               // console.log(res);
                // sessionStorage.setItem("user", JSON.stringify(res.data));
                // 세션은 문자열로 받아서 넣어아 하기 때문에 JSON.형태로
               
                console.log(res);
                alert("로그인 성공!");
            })
            .catch(err => {
                console.log(err);
                console.log(token);
            })
    }


    return(
    <div className="loginBody">
        <div className="loginMain">
            <div className="loginBox">
                <div className="loginBoxTop">
                   <a href="http://naver.com"> <img id="loginLogoImg" src="img/logo2.png"/> </a>
                </div>
                <div id="leftEmpty">
                </div>
                <div className="rightLogin">
                    <br/><br/><br/><br/><br/><br/>
                    <div className="loginId">
                        ID &nbsp;
                        <input type="text" name="username" id="id" onChange={changeValue}/>
                        </div>
                        <br/>
                        <div className="loginPw">
                            PW &nbsp;
                            <input type="password" name="password" id="password" onChange={changeValue}/>
                    </div>
                    <div className="loginButton">
                        <button id="rePw">PW 재설정</button> &nbsp;
                        <button id="loginSuccess" onClick={submit} >로그인</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
export default Login;