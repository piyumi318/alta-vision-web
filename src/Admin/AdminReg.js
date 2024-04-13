import React, { useEffect,useState, useRef,Fragment } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {  AdminAuthorize } from 'C:/Users/piyumi/alta-vision-web/src/Authorization/Authorization';
import AdminNav from 'C:/Users/piyumi/alta-vision-web/src/NavigationBar/AdminNavigationBar';
import { Container } from "react-bootstrap";
import 'C:/Users/piyumi/alta-vision-web/src/Style/CustomerReg.css';
import data_icon from 'C:/Users/piyumi/alta-vision-web/src/icon/Data.png';
function AdminRegister(){
  AdminAuthorize();
  const header = new Headers();
const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Full name is required'),
    
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const alreadyexsist = (email) => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:5089/api/Admin/Exsist?Email=' + email, header)
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
              const url = 'http://localhost:5089/api/Admin/RegisterAdmin';
              const customer = {
                "AdminName": data.fullname ,
                "Email": data.email,
                "Password": data.password,
              };
              console.log(data);
              const result = await axios.post(url, customer, header);
              if (result.data) {
                await new Promise((resolve, reject) => {
                    toast.promise(
                        Promise.resolve(),
                        {
                            pending: 'Saving...',
                            success: 'New Admin Registered Successfully',
                            error: 'Error occurred while adding student data',
                        }
                    ).then(() => resolve());
                });
               
            }
          } else {
              toast.error('User Already Exists With This Email');
          }
      } catch (error) {
          console.error('Error:', error);
          toast.error('An error occurred while checking for existing user');
      }
    };

 
  return (
    <Fragment>
        <AdminNav />
       <ToastContainer></ToastContainer>
  
    <Container>
    <div className="Reg-container">
      <div className='contrainer'>
        <div className='header'>
<div className='text'>Admin Registration</div>
<div className='underline'></div>
    <div className="register-form">
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="two-column-container">
      <div className="left-column">
      <div className="inputs">
        <div className="input">
       
        <img src={data_icon} alt='' style={{ height: '20px',width:'25px' }}/>
         
          <input
            name="fullname"
            type="text"
            placeholder='Admin Name'
            {...register('fullname')}
            className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
          />
          </div>
          <div className="invalid-feedback">{errors.fullname?.message}</div>
       
        <div className="input">
        <img src={data_icon} alt='' style={{ height: '20px',width:'25px' }}/>
         
          <input
            name="email"
            type="text"
            placeholder='Email'
            {...register('email')}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          
        </div>
        <div className="invalid-feedback">{errors.email?.message}</div>
        <div className="input">
        <img src={data_icon} alt='' style={{ height: '20px',width:'25px' }}/>
         
          <input
            name="password"
            type="password"
            placeholder='Password'
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          </div>
          <div className="invalid-feedback">{errors.password?.message}</div>
        
        <div className="input">
        <img src={data_icon} alt='' style={{ height: '20px',width:'25px' }}/>
         
          <input
            name="confirmPassword"
            type="password"
            placeholder='confirmPassword'
            {...register('confirmPassword')}
            className={`form-control ${
              errors.confirmPassword ? 'is-invalid' : ''
            }`}
          />
          
        </div>
        <div className="invalid-feedback">
            {errors.confirmPassword?.message}
          </div>
          
        
        <div className="submit-CusRegcontrainer">
       
        <button type="submit" className="btn btn-primary">
           Sign Up
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

export default AdminRegister;
