import '../css/Login.css';
import '../css/App.css';
const Login = () => {
    return(
    <div className="body">
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
                        <input type="text" id="id"/>
                        </div>
                        <br/>
                        <div className="loginPw">
                            PW &nbsp;
                            <input type="password" id="password"/>
                    </div>
                    <div className="loginButton">
                        <button id="rePw">PW 재설정</button> &nbsp;
                        <button id="loginSuccess">로그인</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
export default Login;