
import { useForm} from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect,useState, useRef,Fragment } from "react";
import * as Yup from 'yup';
import axios from 'axios';
import { Link,Router, useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from 'react-bootstrap/Container';
import data_icon from 'C:/Users/piyumi/alta-vision-web/src/icon/Data.png';
import CustomerNav from 'C:/Users/piyumi/alta-vision-web/src/NavigationBar/CusNavigationBar';
import AdminNav from 'C:/Users/piyumi/alta-vision-web/src/NavigationBar/AdminNavigationBar';
import CustomerLogin from "C:/Users/piyumi/alta-vision-web/src/Customer/CustomerLogin";
import 'C:/Users/piyumi/alta-vision-web/src/Style/AdminLogin.css'
function CalculateCapacityAndCost(){
 // const history = useHistory();
 const [price, setPrice] = useState(null);
 const [capacity, setCapacity] = useState(['']);
  const header = new Headers();
  header.append('Access-Control-Allow-Origin', '*');
  const[monthlyElectricityUsage,setmonthlyElectricityUsage]=useState('')
 // const[password,setpassword]=useState('')
  
 const navigate = useNavigate();

 //useEffect(()=>{
  //sessionStorage.clear();
  //    },[]);

const validationSchema = Yup.object().shape({
    
  monthlyElectricityUsage: Yup.number()
  .required('Monthly Electricity Usage Is Required')
  .min(1, 'Monthly Electricity Usage must be more than 0')
  .max(900, 'Monthly Electricity Usage cannot exceed 900')
  .integer('Monthly Electricity Usage must be an integer'),
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
    setPrice(null);
  };
  const onSubmit = data => {
   alert(data.monthlyElectricityUsage);
   axios.get('http://localhost:5089/api/SolarPanel/CapacityandCost?units='+data.monthlyElectricityUsage ,
   header
  )
   .then((result)=>{
   
   //alert("Hit"+result.data.customerId);
   if(result.data.capacities){
    alert(result.data.capacities +result.data.totalprice)
    setPrice(result.data.totalprice);
    


    setCapacity(result.data.capacities);
    //sessionStorage.setItem('userID',result.data.customerId);
    //sessionStorage.setItem('userrole',"customer")
   // setSessionUserID(result.data.adminId,15,"Admin");
    
  // navigate("/Prediction",{replace: true});
   toast.success('Calculated Capacity and Cost Successfully',{ autoClose: false });
  // navigate("/Prediction",{replace: true});
   //history.push('/Prediction'); 
  
   }
   else{
    toast.error('Invalid Login  Credentials');
   }
  
  })
  .catch((error)=>{
    console.log(error)
    toast.error("Login unsuccess" +error.message);
  })
    console.log(JSON.stringify(data, null, 2));
  };
  return (
    <Fragment>
    <ToastContainer></ToastContainer>
    {(() => {
      const userDataString = sessionStorage.getItem('userData');
      const userData = JSON.parse(userDataString);
      if (userData && userData.userRole === 'Admin') {
       
        return <AdminNav />;
      } else if (userData && userData.userRole === 'Customer') {
        return <CustomerNav />;
      }
      else{return <CustomerLogin /> }
    })()}
    <Container>
    <div className="login-container">
      <div className='contrainer'>
        <div className='header'>
<div className='text'>Calculate Required Capacity and Cost of Solar panel</div>
<div className='underline'></div>
    <div className="register-form">
      <form onSubmit={handleSubmit(onSubmit)}>
       

      
      <div className="inputs">
        <div className="input">
          
          <img src={data_icon} alt='' style={{ height: '20px',width:'25px' }}/>
            <input
        name="monthlyElectricityUsage"
        type="text"
        placeholder='Monthly Electricity Usage'
        defaultValue={0} 
        {...register('monthlyElectricityUsage')}
        className={`form-control ${errors.monthlyElectricityUsage ? 'is-invalid' : ''}`}
        inputMode="numeric" // Set inputMode to "numeric"
        pattern="[0-9]*" 
       />
       
        </div>
        <div className="invalid-feedback">{errors.monthlyElectricityUsage?.message}</div>

        
        
        </div>
        
        <div className="submit-contrainer">
          <button type="submit" className="btn btn-primary">
           Calculate
          </button>
         
          
        </div>
      </form>
      <div className='result'>
{price !== null && (
        <div id="resultModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>The Required Capacity Of Solar Panel: {price} Kwh</p>
            
            <p>The Cost of Required Capacity Of Solar Panel: {capacity.map((value, index) => (
    <li key={index}>{value} Kwh</li>
  ))} </p>
          </div>
        </div>
      )}
</div>
    </div>
    </div>
    </div>
   
    </div>
    
    </Container>
    </Fragment>
  );
};

export default CalculateCapacityAndCost;
