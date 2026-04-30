// import './App.css'
// import Client from "./Clients/Client"
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./Login/Login";
// import Dashboard from './Login/Dashboard';
// import Footer from "./Footer/Footer"
// import General from './General/General';
// import Pathhade from "./Pathology/Path_Root/Pathhade";
// import Test from './Pathology/Path_Root/Diagonsis_Root/Test/Test';
// import Diagonsis from "./Pathology/Path_Root/Diagonsis_Root/Diagonsis";
// import Setting from './SubNab/Setting/Setting';
// import Diagnosis from './Pathology/Path_Root/Diagonsis_Root/Diagonsis';
// // import GeneralSettings from './SubNab/Setting/GeneralSettings';
// function App() {
//   return (

//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />

//         <Route path="/setting" element={<Setting/>}/>
//         <Route path="/pathhade" element={<Pathhade/>}/>
//         <Route path="/diagnosis" element={<Diagnosis/>}/>
//         <Route path="/pathhade/diagnosis/test" element={<Test/>}/>
//       </Routes>
//     </BrowserRouter>


//   );
// }

//  export default App
import './App.css'
import Client from "./Clients/Client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Dashboard from './Login/Dashboard';
import Footer from "./Footer/Footer"
import General from './General/General';
import Pathhade from "./Pathology/Path_Root/Pathhade";
import Test from './Pathology/Path_Root/Diagonsis_Root/Test/Test';
import Diagonsis from "./Pathology/Path_Root/Diagonsis_Root/Diagonsis";
import Setting from './SubNab/Setting/Setting';
import Diagnosis from './Pathology/Path_Root/Diagonsis_Root/Diagonsis';
import GeneralSettings from './SubNab/Setting/GeneralSettings';
import Doctor from './SubNab/Setting/Doctors/Doctor';
import Admin from './SubNab/Admin_Pannel/Admin';
import Doc_Appoinment from './SubNab/Setting/Doctors/D-Appoinment/Doc_Appoinment';
import MySms from './SubNab/Setting/About-SMS/MySms';
import Pathology_Report from './Pathology/PathReport/Pathology_Report';
import Report_Part from './Pathology/All-Report/Report_Part';
import Reagent from './Pathology/Reagents/Reagent';
import InCustom from './ErrorFound';
import ErrorFound from './ErrorFound';
import DoctorsInfo from './SubNab/Setting/Doctors/DoctorsInfo';
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/pathhade" element={<Pathhade />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/pathhade/diagnosis/test" element={<Test />} />
        <Route path="/test" element={<Test />} />
        <Route path='/GeneralSettings' element={<GeneralSettings />} />
        <Route path='/Doctor' element={<Doctor />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/Doc_Appoinment' element={<Doc_Appoinment />} />
        <Route path='/MySms' element={<MySms />} />
        <Route path='/Pathology_Report' element={<Pathology_Report />} />
        <Route path='/Report_Part' element={<Report_Part/>} />
        <Route path='/Reagppood' element={<Reagent/>} />
        <Route path='/ErrorText' element={<ErrorFound/>}/>
         <Route path='/*' element={<ErrorFound/>}/>
         <Route path='/Doctors-Details' element={<DoctorsInfo/>}/>
      </Routes>
    </BrowserRouter>


  );
}

export default App
