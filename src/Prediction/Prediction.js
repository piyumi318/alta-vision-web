import React, { useEffect,useState,Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link,Router, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'C:/Users/piyumi/alta-vision-web/src/Style/CustomerReg.css';
import {  CustomerAdminAuthorize,BindNavigationBar } from 'C:/Users/piyumi/alta-vision-web/src/Authorization/Authorization';
import CustomerNav from 'C:/Users/piyumi/alta-vision-web/src/NavigationBar/CusNavigationBar';
import AdminNav from 'C:/Users/piyumi/alta-vision-web/src/NavigationBar/AdminNavigationBar';
import data_icon from 'C:/Users/piyumi/alta-vision-web/src/icon/Data.png';

function Prediction(){
  CustomerAdminAuthorize();
const header = new Headers();
const [result, setResult] = useState(null);
const[Windspeed,setWindspeed]=useState();
const[SunshineDuration,setSunshineDuration]=useState();
const[AirPressure,setAirPressure]=useState();
const[Radiation,setRadiation]=useState();
const[AirTemperature,setAirTemperature]=useState();
const[RelativeAirHumidity,setRelativeAirHumidity]=useState();
const[Hour,setHour]=useState();
const[Day,setDay]=useState();
const[Month,setMonth]=useState();
const[SolarPower,setSolarPower]=useState();
const navigate = useNavigate();
header.append('Access-Control-Allow-Origin', 'http://127.0.0.1:5000'); // You can specify specific origins instead of '*'
header.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
header.append('Access-Control-Allow-Headers','Accept', 'Accept-Language', 'Content-Language', 'Content-Type');

const validationSchema = Yup.object().shape({
  windspeed: Yup.number()
  .min(0, 'Wind speed must be greater than or equal to 0')
  .max(75, 'Wind speed must be less than or equal to 75')
  .typeError('Wind speed value is invalid')
  .required('Wind speed is required'),
  sunshineDuration: Yup.number()
  .min(0, 'Sunshine duration must be greater than or equal to 0')
  .max(60, 'Sunshine duration must be less than or equal to 60')
  .typeError('Invalid Sunshine Value')
  .required('Sunshine duration is required'),
  airPressure: Yup.number()
  .min(100, 'Air pressure must be greater than or equal to 100')
  .max(1050, 'Air pressure must be less than or equal to 1050')
  .typeError('Invalid Air Pressure Value')
  .required('Air Pressure is required'),
  radiation: Yup.number()
  .min(0, 'Radiation must be greater than or equal to 0')
  .max(1000, 'Radiation must be less than or equal to 1000')
  .typeError('Invalid Radiation value')
  .required('Radiation is required'),

airTemperature: Yup.number()
  .min(-12, 'Air temperature must be greater than or equal to -12')
  .max(38, 'Air temperature must be less than or equal to 38')
  .typeError('Invalid Air Temperature Value')
  .required('Air Temperature is required'),
  relativeAirHumidity: Yup.number()
  .min(0, 'Relative air humidity must be greater than or equal to 0')
  .max(100, 'Relative air humidity must be less than or equal to 100')
  .typeError('Invalid Relative Air Humidity Value')
  .required('Relative Air Humidity is required'),
hour: Yup.number().typeError('Pelese Select Hour'), 
day: Yup.number().typeError('Pelese Select Day'), 
month: Yup.number().typeError('Pelese Select Month'), 
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const closeModal = () => {
    setResult(null);
  };
  const onSubmit = data => {
    const userDataString = sessionStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
    const url='http://127.0.0.1:5000/predict';
    const details={
   "WindSpeed": data.windspeed ,
   "Sunshine": data.sunshineDuration,
   "Radiation": data.radiation,
   "AirTemperature": data.airTemperature,
   "RelativeAirHumidity": data.relativeAirHumidity,
   "AirPressure":data.airPressure,
   "Hour":data.hour,
   "Month":data.month,
   "Day":data.day,
   
  }
  axios.post(url,details,header).then((result) =>{
    console.log(JSON.stringify(result, null, 2));
    toast.success('Data Predicted Sucessfully');
    //const Predict = JSON.parse(result.data);
    setResult(result.data.prediction);
    setSolarPower(result.data.prediction);
    const prediction = parseInt(result.data.prediction);
    alert(prediction);
    const savedetails={
      ...details,
      "predictedBy": userData.userID,
      "solarPowerProduction":prediction,
      
     }
     alert(savedetails.solarPowerProduction)
    axios.post('http://localhost:5089/api/Prediction/SavePrediction',savedetails,header).then((saveresult) =>{
      
     // setResult(result.data.prediction);
      //clear();
      console.log(JSON.stringify(saveresult, null, 2));
        toast.success('Data Predicted Sucessfully');
       
    }).catch((error)=>{
        toast.error(error);
    });
       
 
  
   
}).catch((error)=>{
    toast.error(error);
});
   
    console.log(JSON.stringify(data, null, 2));
  

  
 }
 const clear =()=>{
 
  setWindspeed('');
  setAirPressure('');
  setAirTemperature('');
  setRelativeAirHumidity('');
  setRadiation('');
  setSunshineDuration('');
  setMonth('');  
  setDay('');
  setHour('');
  //navigate("/Prediction",{replace: true});
  window.location.reload();
  //reset();
}
  return (
    <Fragment>
            <ToastContainer />
            {(() => {
      const userDataString = sessionStorage.getItem('userData');
      const userData = JSON.parse(userDataString);
      if (userData && userData.userRole === 'Admin') {
        return <AdminNav />;
      } else {
        return <CustomerNav />;
      }
    })()}
        <div className="Reg-container">
      <div className='contrainer'>
        <div className='header'>
<div className='text'>Solar Power Predictor</div>
<div className='underline'></div> 
    <div className="register-form">
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="two-column-container">
      <div className="left-column">
      <div className="inputs">
        <div className="input">
        <img src={data_icon} alt='' style={{ height: '20px',width:'25px' }}/>
         
          <input
          
            name="windspeed"
            type="text"
            placeholder='Wind Speed (km/h)'
           value={Windspeed} 
           onChange={(e)=> setWindspeed(e.target.value)}
            {...register('windspeed')}
            className={`form-control ${errors.windspeed ? 'is-invalid' : null}`}
           
          />
         
        </div>
        <div className="invalid-feedback">{errors.windspeed?.message}</div>
        <div className="input">
        <img src={data_icon} alt='' style={{ height: '20px',width:'25px' }}/>
          <input
            name="sunshineDuration"
            type="text"
            placeholder='Sunshine Duration (min)'
            value={SunshineDuration} 
            onChange={(e)=> setSunshineDuration(e.target.value)}
            {...register('sunshineDuration')}
            className={`form-control ${errors.sunshineDuration ? 'is-invalid' : ''}`}
          />
          
        </div>
        <div className="invalid-feedback">{errors.sunshineDuration?.message}</div>
        <div className="input">
        <img src={data_icon} alt='' style={{ height: '20px',width:'25px' }}/>
          <input
            name="airPressure"
            type="text"
            placeholder='Air Pressure (Pa)'
            value={AirPressure} 
           onChange={(e)=> setAirPressure(e.target.value)}
            {...register('airPressure')}
            className={`form-control ${errors.airPressure ? 'is-invalid' : ''}`}
          />
        
        </div>
        <div className="invalid-feedback">{errors.airPressure?.message}</div>
        <div className="input">
        <img src={data_icon} alt='' style={{ height: '20px',width:'25px' }}/>
          <input
            name="radiation"
            type="text"
            placeholder='Radiation (J/kg)'
            value={AirTemperature} 
           onChange={(e)=> setAirTemperature(e.target.value)}
            {...register('radiation')}
            className={`form-control ${errors.radiation ? 'is-invalid' : ''}`}
          />
         
        </div>
        <div className="invalid-feedback">{errors.radiation?.message}</div>
        <div className="input">
        <img src={data_icon} alt='' style={{ height: '20px',width:'25px' }}/>
          <input
            name="airTemperature"
            type="text"
            placeholder='Air Temperature (°C)'
            value={Radiation} 
           onChange={(e)=> setRadiation(e.target.value)}
            {...register('airTemperature')}
            className={`form-control ${errors.airTemperature ? 'is-invalid' : ''}`}
          />
       
        </div>
        <div className="invalid-feedback">{errors.airTemperature?.message}</div>
        </div>
        </div>
        
        <div className='right-column'>
         <div className="inputs">

        <div className="input">
        <img src={data_icon} alt='' style={{ height: '20px',width:'25px' }}/>
          <input
            name="relativeAirHumidity"
            type="text"
            placeholder='Relative Air Humidity (%)'
            value={RelativeAirHumidity} 
           onChange={(e)=> setRelativeAirHumidity(e.target.value)}
            {...register('relativeAirHumidity')}
            className={`form-control ${errors.relativeAirHumidity ? 'is-invalid' : ''}`}
          />
          <input type="hidden" name="solar" value={SolarPower}   onChange={(e)=> setSolarPower(e.target.value) }  {...register('solar')} className={`form-control ${errors.relativeAirHumidity ? 'is-invalid' : ''}`}/>
        </div>
        <div className="invalid-feedback">{errors.relativeAirHumidity?.message}</div>
  
<div className="input">
<img src={data_icon} alt='' style={{ height: '20px',width:'25px' }}/>
  <select
    name="month"
    value={Month} 
           onChange={(e)=> setMonth(e.target.value)}
    {...register('month')}
    className={`form-control ${errors.month ? 'is-invalid' : ''}`}
  >
    <option value="">Select Month</option>
    <option value="1">January</option>
    <option value="2">February</option>
    <option value="3">March</option>
    <option value="4">April</option>
    <option value="5">May</option>
    <option value="6">June</option>
    <option value="7">July</option>
    <option value="8">August</option>
    <option value="9">September</option>
    <option value="10">October</option>
    <option value="11">November</option>
    <option value="12">December</option>
  </select>
  
  
</div>
<div className="invalid-feedback">{errors.month?.message}</div>
<div className="input">
<img src={data_icon} alt='' style={{ height: '20px',width:'25px' }}/>
  <select
    name="day"
    value={Day} 
           onChange={(e)=> setDay(e.target.value)}
    {...register('day')}
    className={`form-control ${errors.day ? 'is-invalid' : ''}`}
  >
    <option value="">Select Day</option>
    {[...Array(31).keys()].map((day) => (
      <option key={day + 1} value={day + 1}>
        {day + 1}
      </option>
    ))}
  </select>
  
</div>
<div className="invalid-feedback">{errors.day?.message}</div>
<div className="input">
<img src={data_icon} alt='' style={{ height: '20px',width:'25px' }}/>
  <select
    name="hour"
    value={Hour} 
           onChange={(e)=> setHour(e.target.value)}
    {...register('hour')}
    className={`form-control ${errors.hour ? 'is-invalid' : ''}`}
  >
    <option value="">Select Hour</option>
    {[...Array(13).keys()].map((hour) => {
      return (
        <option key={hour + 6} value={hour + 6}>
          {hour + 6}:00
        </option>
      );
    })}
  </select>
 
</div>
<div className="invalid-feedback">{errors.hour?.message}</div>
<div className="submit-Predictcontrainer">
          <button type="submit" className="btn btn-primary">
            Predict
          </button>
          <button
            type="button"
            onClick={()=>clear()}
            className="btn btn-warning float-right"
          >
            Reset
          </button>
        </div>
       </div>
       </div>
</div>
 
        
      </form>
<div className='result'>
{result !== null && (
        <div id="resultModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>The Predicted Solar Power Prodcution Is: {result} Wh</p>
          </div>
        </div>
      )}
</div>
  
    </div>
    </div>
    </div>
    </div>
    
    </Fragment>
  );
};

export default Prediction;
