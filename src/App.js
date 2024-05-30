import './App.css';
import Header from './resource/Header';
import NurPatientList from './resource/NurPatientList';
import Sidebar from './resource/Sidebar';
import Login from './resource/Login';
import DiagnosisPatient from './resource/DiagnosisPatient';

function App() {
  return (
    <div className="App">
      <Header/>
      <Sidebar/>
      <DiagnosisPatient/>
      {/* <NurPatientList/> */}
      {/* <Login/> */}
    </div>
  );
}

export default App;
