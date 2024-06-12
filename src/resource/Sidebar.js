import '../css/Sidebar.css';
import MetRequest from './MetRequest';
import SideNotice from './SideNotice';
import SideProfile from './SideProfile';
import TodoList from './SideTodoList';
const Sidebar = () => {
    return (
        <div id="sidebar">
                <SideProfile/>
                {/* {userid === 'Met' ? <MetRequest /> : <Memo />} */}
                <MetRequest/>
                <SideNotice/>
                <TodoList/>
        
        </div>
    );
};

export default Sidebar;