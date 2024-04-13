
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect,useState, useRef,Fragment } from "react";
import axios from 'axios';
import 'C:/Users/piyumi/alta-vision-web/src/Style/CustomerReg.css';
import password_icon from 'C:/Users/piyumi/alta-vision-web/src/icon/password.png';
import name_icon from 'C:/Users/piyumi/alta-vision-web/src/icon/Name.png';
import calender_icon from 'C:/Users/piyumi/alta-vision-web/src/icon/calender.png';
import mobile_icon from 'C:/Users/piyumi/alta-vision-web/src/icon/Mobile.png';
import email_icon from 'C:/Users/piyumi/alta-vision-web/src/icon/email.png'
import address_icon from 'C:/Users/piyumi/alta-vision-web/src/icon/address.png'
import {  CustomerAuthorize } from 'C:/Users/piyumi/alta-vision-web/src/Authorization/Authorization';
import CustomerNav from 'C:/Users/piyumi/alta-vision-web/src/NavigationBar/CusNavigationBar';
function MakeAppointment(){
  CustomerAuthorize();
  const header = new Headers();
  const navigate = useNavigate();
  header.append('Access-Control-Allow-Origin', '*');
  const current = new Date().toISOString().split("T")[0]
const validationSchema = Yup.object().shape({
    name: Yup.string().required('First Name is required'),
    address: Yup.string()
      .required('Address is required'),
      
      mobileNo: Yup.string()
      .required('Mobile number is required')
      .matches(/^[0-9]{10}$/, 'Mobile number must be Number and should have 10 digits'),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const { reset: formReset } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const userDataString = sessionStorage.getItem('userData');
  const userData = JSON.parse(userDataString);
  const alreadyexsist = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5089/api/Appoinment/Exsist?Id=' + userData.userID, header)
            .then((result) => {
                if (result.data) {
                    resolve(true); // If user exists
                } else {
                    resolve(false); // If user does not exist
                }
            })
            .catch(error => {
                reject(error); // In case of any error
            });
    });
}
  
const onSubmit = async (data) => {
  try {
    const exists = await alreadyexsist(data.email);
    if (!exists) {
    let currentDate = new Date(); 
          const url = 'http://localhost:5089/api/Appoinment/MakeAppointment';
          const customer = {
              "Name": data.name,
              "MobileNo": data.mobileNo,
              "Address": data.address,
              "CustomerId": userData.userID,
              "RequestedDate": currentDate,
              "isReview":false
          };
          
          console.log(data);
          const result = await axios.post(url, customer, header);
          if (result.data) {
            await new Promise((resolve, reject) => {
                toast.promise(
                    Promise.resolve(),
                    {
                        pending: 'Saving...',
                        success: 'Appointment Requested Sucessfully',
                        error: 'Error occurred while adding student data',
                    }
                ).then(() => {
                    clear(); 
                    resolve();
                  });
            });
           
           
        }
      } else {
        toast.error('User Already Made an Appointment');
    }}
   catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while Requesting Appointmnt');
  }
};

  
  const clear = () => {
    formReset({
      name: '',
      mobileNo: '',
      address: ''
    });
  };
  
  return (
    
    <Fragment>
    <ToastContainer></ToastContainer>
    <Container>
    <CustomerNav/>
    <div className="Reg-container">
      <div className='contrainer'>
        <div className='header'>
<div className='text'>Request Appoinment</div>
<div className='underline'></div>
    <div className="register-form">
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="two-column-container">
      <div className="left-column">
      <div className="inputs">
        <div className="input">
        <img src={name_icon} alt='' style={{ height: '15px' }}/>
          <input
            name="name"
            placeholder='Name'
            type="text"
            {...register('name')}
            className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
          />
          </div>
          <div className="invalid-feedback">{errors.name?.message}</div>
        
       
   
        <div className="input">
        <img src={calender_icon} alt='' style={{ height: '15px' }}/>
            <input 
            name='mobileNo'
            type='text'
            placeholder='Mobile Number'
            {...register('mobileNo')}
            className={`form-control ${errors.mobileNo ? 'is-invalid' : ''}`}
            max={current}
          />
          </div>
          <div className="invalid-feedback">{errors.mobileNo?.message}</div>
        
        
        

        <div className="input">
        <img src={address_icon} alt='' style={{ height: '15px' }}/>
          <input
            name="address"
            type="text"
            placeholder='Address'
            {...register('address')}
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
          />
          </div>
          <div className="invalid-feedback">{errors.address?.message}</div>
       
          <div className="submit-Appointmentcontrainer">
        <button type="submit" className="btn btn-primary">
          Request Appointment
          </button>
          </div>
      </div>  
    </div>    
       
   

        
        </div>
      </form>
    </div>
    </div>
    </div>
    </div>
    </Container>
    </Fragment>
  );
};

export default MakeAppointment;
