
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect,useState, useRef,Fragment } from "react";
import * as Yup from 'yup';
import axios from 'axios';
import { Link,Router, useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from 'react-bootstrap/Container';
import user_icon from 'C:/Users/piyumi/alta-vision-web/src/icon/user.jpg'
import password_icon from 'C:/Users/piyumi/alta-vision-web/src/icon/password.png'
import email_icon from 'C:/Users/piyumi/alta-vision-web/src/icon/email.png'
import CustomerReg from "./CustomerRegister";
import SideImage from 'C:/Users/piyumi/alta-vision-web/src/icon/solar.png'
import 'C:/Users/piyumi/alta-vision-web/src/Style/CustomerLogin.css'
function CustomerLogin(){
 // const history = useHistory();
  const header = new Headers();
  header.append('Access-Control-Allow-Origin', '*');
  const[email,setemail]=useState('')
  const[password,setpassword]=useState('')
  
 const navigate = useNavigate();

 useEffect(()=>{
  sessionStorage.clear();
 
      },[]);

const validationSchema = Yup.object().shape({
    
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password is invalid')
      .max(40, 'Password is invalid')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]*$/,
        'Password is invalid'
    )
  });
  function setSessionUserID(userID, expirationMinutes,userRole,Username) {
    const now = new Date();
    const expirationTime = now.getTime() + (expirationMinutes * 60 * 1000); 
    const userData = {
        userID: userID,
        userRole:userRole,
        expirationTime: expirationTime,
        username:Username
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));
}
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });
  
  const onSubmit = data => {
   //alert(data.email + data.password);
   axios.get('http://localhost:5089/api/Customer/customerLogin?email='+data.email +'&password=' +data.password,
   header
  )
   .then((result)=>{
    setemail(result.data.email);
    setpassword(result.data.password);
   //alert("Hit"+result.data.customerId);
   if(result.data.customerId){
    //sessionStorage.setItem('userID',result.data.customerId);
    //sessionStorage.setItem('userrole',"customer")
    setSessionUserID(result.data.customerId,15,"Customer",result.data.firstName);
    alert("Login Successfully");
   
   //toast.success("closeAfter10Seconds", {autoClose: 10000});
  navigate("/Prediction",{replace: true});
   
  
   }
   else{
    toast.error('Invalid Login  Credentials');
    setSessionUserID("",15,"");
   }
  
  })
  .catch((error)=>{
    console.log(error)
    toast.error("Unable to Login" +error.message);
  })
    console.log(JSON.stringify(data, null, 2));
  };
  return (
    <Fragment>
    <ToastContainer></ToastContainer>
    <Container>
    <div className="login-container">
      <div className='contrainer'>
        <div className='header'>
<div className='text'>Customer Login</div>
<div className='underline'></div>
    <div className="register-form">
      <form onSubmit={handleSubmit(onSubmit)}>
       

      
      <div className="inputs">
        <div className="input">
          
          <img src={email_icon} alt='' style={{ height: '20px',width:'25px' }}/>
          <input
            name="email"
            type="text"
            placeholder='Email'
            onChange={(e)=> setemail(e.target.value)}
            {...register('email')}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            
          />
       
        </div>
        <div className="invalid-feedback">{errors.email?.message}</div>

        <div className="input">
        <img src={password_icon} alt='' style={{ height: '20px' }}/>
          
          <input
            name="password"
            type="password"
            placeholder='Password'
            onChange={(e)=> setpassword(e.target.value)}
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          
        </div>
        <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <div className="submit-contrainer">
          <button type="submit" className="btn btn-primary">
           Sign In
          </button>
          
         
          
        </div>
        <div className="Links">Not A Member? <span><a href="#" onClick={() => navigate('/CustomerRegister')}>Sign Up</a></span></div>

        <div className="Links">Login as Admin? <span><a href="#" onClick={() => navigate('/AdminLogin')}>Admin Website</a></span></div>

      </form>
    </div>
    </div>
    </div>
    <div className="side-image">
                <img src={SideImage} alt="side" />
    </div>
    </div>
    
    </Container>
    </Fragment>
  );
};

export default CustomerLogin;
