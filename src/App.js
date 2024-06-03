import './css/App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Header from './resource/Header';
import NurPatientList from './resource/NurPatientList';
import Sidebar from './resource/Sidebar';
import Login from './resource/Login';
import DiagnosisPatient from './resource/DiagnosisPatient';
import Admin from './resource/Admin';
import NurPatientInfo from './resource/NurPatientInfo';
import NurDailyPrescription from './resource/NurDailyPrescription';
import NurDisAdmModal from './resource/NurDisAdmModal';
import NurWardList from './resource/NurWardList';
import OpenCalendar from './resource/OpenCalendar';

function App() {
  return (
    <div className="App">
      <Header/>
      <Sidebar/>
      {/* <NurPatientList/> */}
      {/* <Login/> */}
      {/* <Sidebar/>
      <NurPatientList/>
      <Login/> */}
    {/* <NurPatientInfo/>  */}
     {/* <NurDailyPrescription/> */}
     {/* <NurWardList /> */}
      {/* <DiagnosisPatient/> */}
      {/* <Admin/> */}
    </div>
  );
}

export default App;
