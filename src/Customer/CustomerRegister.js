
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
function CustomerRegister(){
  
  const header = new Headers();
  const navigate = useNavigate();
  header.append('Access-Control-Allow-Origin', '*');
  const current = new Date().toISOString().split("T")[0]
const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    birthdate:Yup.string().required('Date of Birth is required'),
    address: Yup.string()
      .required('Address is required'),
      mobile: Yup.string()
      .required('Mobile number is required')
      .matches(/^[0-9]{10}$/, 'Mobile number must be Number and should have 10 digits'),
  
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]*$/,
        'Password is not strong'
    ),
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
        axios.get('http://localhost:5089/api/Customer/Exsist?Email=' + email, header)
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
          const url = 'http://localhost:5089/api/Customer/RegisterCustomer';
          const customer = {
              "firstname": data.firstname,
              "lastname": data.lastname,
              "dob": data.birthdate,
              "mobileNo": data.mobile,
              "address": data.address,
              "email": data.email,
              "password": data.password,
          };
          console.log(data);
          const result = await axios.post(url, customer, header);
          if (result.data) {
            await new Promise((resolve, reject) => {
                toast.promise(
                    Promise.resolve(),
                    {
                        pending: 'Saving...',
                        success: 'Customer Registered Successfully',
                        error: 'Error occurred while adding student data',
                    }
                ).then(() => resolve());
            });
            alert("Customer Registered Successfully");
            navigate("/", { replace: true }); // Redirect to another page
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
    <ToastContainer></ToastContainer>
    <Container>
    <div className="Reg-container">
      <div className='contrainer'>
        <div className='header'>
<div className='text'>Customer Registration</div>
<div className='underline'></div>
    <div className="register-form">
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="two-column-container">
      <div className="left-column">
      <div className="inputs">
        <div className="input">
        <img src={name_icon} alt='' style={{ height: '15px' }}/>
          <input
            name="firstname"
            placeholder='First Name'
            type="text"
            {...register('firstname')}
            className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
          />
          </div>
          <div className="invalid-feedback">{errors.firstname?.message}</div>
        
       
   
        <div className="input">
        <img src={calender_icon} alt='' style={{ height: '15px' }}/>
            <input 
            name='birthdate'
            type='date'
            placeholder='Date of Birth'
            {...register('birthdate')}
            className={`form-control ${errors.birthdate ? 'is-invalid' : ''}`}
          //  max={current}
          />
          </div>
          <div className="invalid-feedback">{errors.birthdate?.message}</div>
        
        
        

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
       

        
        

        <div className="input">
        <img src={password_icon} alt='' style={{ height: '18px' }}/>
          <input
            name="password"
            type="password"
            placeholder='Password'
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          </div>
          <div className="invalid-feedback">{errors.password?.message}</div>
          <div className="submit-CusRegcontrainer">
        <button type="submit" className="btn btn-primary">
           Sign Up
          </button>
          </div>
      </div>  
    </div>    
       
<div className='right-column'>
<div className="inputs">
<div className="input">
<img src={name_icon} alt='' style={{ height: '15px' }}/>
          <input
            name="lastname"
            type="text"
            placeholder='Last Name'
            {...register('lastname')}
            className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
          />
          </div>
          <div className="invalid-feedback">{errors.lastname?.message}</div>
          <div className="input">
          <img src={mobile_icon} alt='' style={{ height: '15px' }}/>
          <input
            name="mobile"
            type="text"
            placeholder='Mobile Number'
            {...register('mobile')}
            className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
          />
          </div>
          <div className="invalid-feedback">{errors.mobile?.message}</div>
          <div className="input">
          <img src={email_icon} alt='' style={{ height: '15px' }}/>
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
          <img src={password_icon} alt='' style={{ height: '15px' }}/>
           <input
            name="confirmPassword"
            type="password"
            placeholder='Confirm password'
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
       
          <button type="button" className="btn btn-primary" onClick={() => navigate('/')}>
            Sign In
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

export default CustomerRegister;
