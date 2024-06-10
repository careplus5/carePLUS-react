import '../css/App.css';
import MetRequest from './MetRequest';
import SideNotice from './SideNotice';
import TodoList from './SideTodoList';
const Sidebar = () => {
    return (
        <>
        <div className="sideBar">
            <div className="sideProfile">
                <br/><br/>
                <img id="profileImg" src="img/profileImg.png"/><br/>
                <h4 id="profileText">김동현</h4><br/>
                <h4 id="profileText">1병동 A팀</h4>
                <div className="line"> </div>
                <br/><br/>
                <MetRequest/>
                <SideNotice/>
                <TodoList/>
            </div>
        </div>
        </>
    )
}

export default Sidebar;