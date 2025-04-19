import React from "react";
import {Routes,Route} from 'react-router-dom'
import Home from "./components/Home";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Welcome from "./pages/Welcome";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";

import BloodPressure from "./pages/BloodPressure";
import BloodSugar from "./pages/BloodSugar";
import FBC from "./pages/FBC";
import LipidProfile from "./pages/LipidProfile";
import Others from "./pages/Others";
import HealthTracker from "./pages/HealthTracker"
import DoctorDashboard from "./pages/DoctorDashboard";
import PrescribedDrugs from "./pages/PrescribedDrugsPage";
import MealTracker from "./pages/MealTracker";
import BMICalculator from "./pages/BMICalculator";
import CalorieCalculator from "./pages/CalorieCalculator";
import ViewPatientReports from "./pages/viewPatientReports";
import ViewReports from "./pages/ViewReports";

const App = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Welcome/>}/>
      <Route path='/userlogin' element={<UserLogin/>}/>
      <Route path='/userregister' element={<UserRegister/>}/>

      <Route path='/healthtracker' element={<HealthTracker/>}/>
      <Route path='/bloodsugar' element={<BloodSugar/>}/>
      <Route path='/bloodpressure' element={<BloodPressure/>}/>
      <Route path='/fbc' element={<FBC/>}/>
      <Route path='/lipidprofile' element={<LipidProfile/>}/>
      <Route path='/others' element={<Others/>}/>
      <Route path='/docdashboard' element={<DoctorDashboard/>}/>
      <Route path='/pdrug' element={<PrescribedDrugs/>}/>
      <Route path='/mealtracker' element={<MealTracker/>}/>
      <Route path='/bmiCal' element={<BMICalculator/>}/>
      <Route path='/bmiCal' element={<BMICalculator/>}/>
      <Route path='/caloriesCal' element={<CalorieCalculator/>}/>
      <Route path='/reports' element={<ViewPatientReports/>}/>
      <Route path= '/view' element={<ViewReports/>}/>


    </Routes>
  );
};

export default App;
