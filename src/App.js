import './App.css';
import Header from './resource/Header';
import NurPatientList from './resource/NurPatientList';
import Sidebar from './resource/Sidebar';

function App() {
  return (
    <div className="App">
      <Header/>
      <Sidebar/>
      <NurPatientList/>
    </div>
  );
}

export default App;
