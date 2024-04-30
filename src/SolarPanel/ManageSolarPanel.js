import React, { useState, useEffect, Fragment } from "react";
import { useForm } from 'react-hook-form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'C:/Users/piyumi/alta-vision-web/src/Style/PredictionHistory.css';
import AdminNav from 'C:/Users/piyumi/alta-vision-web/src/NavigationBar/AdminNavigationBar';
import data_icon from 'C:/Users/piyumi/alta-vision-web/src/icon/Data.png';
import 'C:/Users/piyumi/alta-vision-web/src/Style/CustomerReg.css';


const ManageSolarPanel = () => {
 
  const header = new Headers();
  header.append('Access-Control-Allow-Origin', '*');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const [solarPanelId, setsolarPanelId] = useState('');
  const [capacity, setcapacity] = useState('');
  const [price, setprice] = useState('');
  const [createdBy, setcreatedBy] = useState('');
  const [status, setstatus] = useState('');

  const [data, setData] = useState([]);

  useEffect(() => {
    // Only fetch data if it's not already loaded
    if (data.length === 0) {
        getData();
    }
}, [data]);
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
  const getData = () => {
    axios.get('http://localhost:5089/api/SolarPanel/GetAllSolarpanels', header)
      .then((result) => {
        setData(result.data);
     //   alert(result.data.solarPanelId)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const onSubmit = async (data) => {}
  return (
    <Fragment>
      <AdminNav />
      <ToastContainer />
      <Container>
        <div className="Reg-container">
          <div className='contrainer'>
            <div className='header'>
              <div className='text'>Manage Solar panel</div>
            </div>
            
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
            placeholder='Solar Panel Name'
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
            placeholder='Capacity'
            {...register('email')}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          
        </div>
        <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        <div className="submit-CusRegcontrainer">
       
       <button type="submit" className="btn btn-primary">
          Update
         </button>
    </div>
      </div>
     
        
       < div className='right-column'>
        <div className="inputs">
        <div className="input">
        <img src={data_icon} alt='' style={{ height: '20px',width:'25px' }}/>
         
          <input
            name="password"
            type="password"
            placeholder='Price'
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
            placeholder='Is Active'
            {...register('confirmPassword')}
            className={`form-control ${
              errors.confirmPassword ? 'is-invalid' : ''
            }`}
          />
          
        </div>
        <div className="invalid-feedback">
            {errors.confirmPassword?.message}
          </div>
          
          </div>
        <div className="submit-CusRegcontrainer">
       
        <button type="submit" className="btn btn-primary">
           Add
          </button>
     </div>
        
  </div>
  </div>
      </form>
    <br />
    <br />
   </div>
            <div className="container mt-5">
              
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Solar Panel ID</th>
                    <th>Solar Name</th>
                    <th>Capacity</th>
                    <th>Price</th>
                    <th>Created By</th>
                    <th>Status</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    currentData && currentData.length > 0 ?
                      currentData.map((solarpanel, index) => (
                        <tr key={index}>
                          <td>{solarpanel.solarPanelId}</td>
                          <td>{solarpanel.solarPanelName}</td>
                          <td>{solarpanel.capacity}</td>
                          <td>{solarpanel.price}</td>
                          <td>{solarpanel.createdBy}</td>
                          <td>{solarpanel.statusId}</td>
                          <td colSpan={2}>
                            <button className="btn btn-primary">Edit</button>&nbsp;
                            
                          </td>
                        </tr>
                      )) : <tr><td colSpan="6">Loading...</td></tr>
                  }
                </tbody>
              </table>
              {/* Pagination */}
              {totalPages > 1 && (
                 <div className="pagination-container">
                <ul className="pagination">
                  {[...Array(totalPages).keys()].map(pageNumber => (
                    <li key={pageNumber + 1} className={`page-item ${pageNumber + 1 === currentPage ? 'active' : ''}`}>
                      <button onClick={() => handlePageChange(pageNumber + 1)} className="page-link">
                        {pageNumber + 1}
                      </button>
                    </li>
                  ))}
                 
                </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}

export default ManageSolarPanel;
