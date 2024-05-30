import './App.css';
import Header from './resource/Header';
import NurPatientList from './resource/NurPatientList';
import Sidebar from './resource/Sidebar';
import Login from './resource/Login';
import DiagnosisPatient from './resource/DiagnosisPatient';
import Admin from './resource/Admin';

function App() {
  return (
    <div className="App">
      <Header/>
      <Sidebar/>
      <DiagnosisPatient/>
      {/* <NurPatientList/> */}
      {/* <Login/> */}
      {/* <Sidebar/>
      <NurPatientList/>
      <Login/> */}
      <Admin/>
    </div>
  );
}

export default App;
