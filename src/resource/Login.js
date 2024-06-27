import '../css/Login.css';
import '../css/App.css';
import {useState} from 'react';
import axios from "axios";
import {url} from '../config'
import { useNavigate } from 'react-router-dom';
import { useSetAtom, useAtom } from 'jotai';
import { accessTokenAtom, empAtom, usernameAtom, tokenAtom} from '../config/Atom.js';


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
                 if(emp.username === '' || emp.password === ''
                 ){
                    setErrorMessage("아이디와 비밀번호를 모두 입력해 주세요.")
                    alert(errorMessage);
                    return;
                 }

                    let formData = new FormData();
        formData.append("username", emp.username);
        formData.append("password", emp.password);
        
        
        axios.post(`${url}/login`,formData)
            .then(res => {
                console.log("login try:"+JSON.stringify(res.headers.authorization));
                setAccessToken(res.headers.authorization.split(",")[0]);
                setUsernameAtom(emp.username);
                setTokenAtom(res.headers.authorization);
                    // alert(emp.username+"님이 로그인하셨습니다!");
                    onLoginSuccess(emp.username); 

                   const iden = emp.username.slice(0,2);
                   if(iden==="99"){
                    navigate("/admin")
                   } else if(iden==="11"){
                    navigate("/docDiagnosis");
                   } else if(iden==="12"){
                    navigate("/nurPatientList");
                   } else if(iden==="13"){
                    navigate("/adm");
                   } else if(iden==="14"){
                    navigate("/metMain");
                   }
                   
            })
            .catch(err => {
                console.log(formData.get('password'));
                alert("로그인에 실패하셨습니다:"+formData.get('password')+","+formData.get('username')+":"+err);
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
                        <button id="loginSuccess" onClick={submit} >로그인</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
export default Login;