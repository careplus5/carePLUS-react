import './App.css';
import Header from './resource/Header';
import NurPatientList from './resource/NurPatientList';
import Sidebar from './resource/Sidebar';
import Login from './resource/Login';

function App() {
  return (
    <div className="App">
      <Header/>
      <Sidebar/>
      <NurPatientList/>
      <Login/>
    </div>
  );
}

export default App;
