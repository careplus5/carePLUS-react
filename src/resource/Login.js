import '../css/Login.css';
import '../css/App.css';
import {useState} from 'react';
import axios from "axios";
import {url} from '../config'
import { useNavigate } from 'react-router-dom';
import { useSetAtom, useAtom } from 'jotai';
import { accessTokenAtom, empAtom, usernameAtom, tokenAtom} from '../config/Atom.js';

// 401 에러 해결하기
const Login = ({ onLoginSuccess }) => {
    // 로그인하려는 직원, 아이디와 비밀번호
    const [emp, setEmp] = useAtom(empAtom);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const setAccessToken = useSetAtom(accessTokenAtom);
    const setUsernameAtom = useSetAtom(usernameAtom);
    const setTokenAtom = useSetAtom(tokenAtom);

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
                // setAccessToken(accessToken);
                setAccessToken(accessToken);
                console.log("se: "+JSON.stringify(accessToken));
                setUsernameAtom(emp.username);
                setTokenAtom(res.headers.authorization);
// console.log(accessToken);
                    // dispatch({type:'emp',payload:res.data})
                    alert(emp.username+"님이 로그인하셨습니다!");
                   
                    onLoginSuccess(emp.username); 
                   navigate("/organ");
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