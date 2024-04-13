
import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import Routes along with BrowserRouter and Route
import AdminLogin from "./Admin/AdminLogin";
import AdminReg from "./Admin/AdminReg";
import CustomerLogin from "./Customer/CustomerLogin";
import CustomerReg from "./Customer/CustomerRegister";
import Prediction from "./Prediction/Prediction";
import PredictionHistory from "./Prediction/PredictionHistory";
import Appointment from "./Appointment/Appointment";
import ReviewAppointment from "./Appointment/ReviewAppointment";
import Managesolarpanel  from "./SolarPanel/ManageSolarPanel";
import SolarPanel  from "./SolarPanel/SolarPanel";
import CalculateCapacityandCost  from "./SolarPanel/CalculateCapacityandCost";
import CustomerNav from './NavigationBar/CusNavigationBar';
import AdminNav from 'C:/Users/piyumi/alta-vision-web/src/NavigationBar/AdminNavigationBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
      <BrowserRouter>
      
      <Routes>
      
      <Route path='/' element={<CustomerLogin/>}></Route>
      <Route path='/CustomerRegister' element={<CustomerReg/>}></Route>
      <Route path='/Prediction' element={<Prediction/>}></Route>
      <Route path='/Appointment' element={<Appointment/>}></Route>
      <Route path='/AdminLogin' element={<AdminLogin/>}></Route>
      <Route path='/ManageSolarPanel' element={<Managesolarpanel/>}></Route>
      <Route path='/SolarPanel' element={<SolarPanel/>}></Route>
      <Route path='/AdminReg' element={<AdminReg/>}></Route>
      <Route path='/CustomerNav' element={<CustomerNav/>}></Route>
      <Route path='/AdminNav' element={<AdminNav/>}></Route>
      <Route path='/ReviewAppointment' element={<ReviewAppointment/>}></Route>
      <Route path='/CalculateCapacityandCost' element={<CalculateCapacityandCost/>}></Route>
      <Route path='/PredictionHistory' element={<PredictionHistory/>}></Route>
      </Routes>
      
      </BrowserRouter>
      </header>
    </div>
  );

}


export default App;

