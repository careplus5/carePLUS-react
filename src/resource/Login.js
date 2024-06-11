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
    const [emp, setEmp] = useState({ username:'', password:''});
    const {setUsername} = useContext(UserContext);
    
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    // redux에서 상태를 변경하기 위해 액션을 스토어에 전달하는 함수
    // 액션을 스토어에 보내고, 그 결과로 상태가 업데이트됨
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const changeValue = (e) => {
        setEmp({...emp, [e.target.name]:e.target.value})
    }
    const submit = (e) => {
        e.preventDefault();
    
        // const token = localStorage.getItem('accessToken');
        // console.log("토큰에"+token);
                 // formData => 제일 일반적으로 넘기는 형태 (obtainUsername으로 갖고올때), 기본 default get.parameter!!!
                 // JSON => 컨트롤러로 어노테이션으로 쓸때.

                 if(emp.username === '' || emp.password === ''
                 ){
                    setErrorMessage("아이디와 비밀번호를 모두 입력해 주세요.")
                    alert(errorMessage);
                    return;
                 }
                    let formData = new FormData();
        formData.append("username", emp.username);
        formData.append("password", emp.password);
        console.log(formData.get('username')+"님이 로그인하셨습니다.");
        
        axios.post(`${url}/login`,formData)
            .then(res => {
                console.log("accessToken은 "+res.headers.authorization.split(',')[0].split(' ')[1]);
                const accessToken = res.headers.authorization.split(',')[0].split(' ')[1];
                localStorage.setItem('accessToken',accessToken);
// console.log(accessToken);
                    dispatch({type:'emp',payload:res.data})
                    alert(emp);
                    onLoginSuccess(emp.username); 
                    setUsername(emp.username);
                   navigate("/organ");
            //     const {access_token, refresh_token} = res.data;
            //    if(access_token){
            //     localStorage.setItem('access_token',access_token);
            //     localStorage.setItem('refresh_token',refresh_token);
            //         dispatch({type:'emp',payload:res.data})
            //         alert(emp);
            //         onLoginSuccess(emp.username); 
            //         setUsername(emp.username);
            //        navigate("/organ");
            //    } else{
            //     setErrorMessage("로그인에 실패하였습니다.");
            //    }
            })
            .catch(err => {
                console.log(formData.get('password'));
                alert(typeof formData);
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