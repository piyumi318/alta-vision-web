import React, { useState, useEffect, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'C:/Users/piyumi/alta-vision-web/src/Style/PredictionHistory.css';
import AdminNav from 'C:/Users/piyumi/alta-vision-web/src/NavigationBar/AdminNavigationBar';

const ReviewAppointment = () => {
 
  const header = new Headers();
  header.append('Access-Control-Allow-Origin', '*');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  const getData = () => {
    axios.get('http://localhost:5089/api/Appoinment/GetAllAppointment', header)
      .then((result) => {
        setData(result.data);
       

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
  const handleEdit=(appoinmentId)=>{
    alert(appoinmentId);
    //handleShow();
    axios.put('http://localhost:5089/api/Appoinment/ReviewAppointment?appointmentid='+appoinmentId,
    header
   )
    .then((result)=>{
      if(result.data)
      {toast.success('Appointment Reviewed Successfully');
      getData();}
      

   })
   .catch((error)=>{
     console.log(error)
   })
   }
  return (
    <Fragment>
   <AdminNav />
      <ToastContainer />
      <Container>
      <div className="Reg-container">
      <div className='contrainer'>
      <div className='header'>
        <div className='text'>Review Appointment</div></div>
        <div className="container mt-5">
         
          <table className="custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Address</th>
              
                <th>Customer Id</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>
              {
                currentData && currentData.length > 0 ?
                  currentData.map((Appointment, index) => (
                    <tr key={index}>
                      <td>{Appointment.name}</td>
                      <td>{Appointment.mobileNo}</td>
                      <td>{Appointment.address}</td>
                      
                      <td>{Appointment.customerId}</td>
                      
                      <td className="col-span-2">
          {Appointment.isReview ? (
            <button className="btn btn-primary" disabled style={{ color: 'white', backgroundColor:'rgb(87, 105, 87)' }} >Reviewed</button>
          ) : (
            <button className="btn btn-primary" onClick={()=>handleEdit(Appointment.appoinmentId)} style={{ color: 'white' }}>Review</button>
          )}
          &nbsp;
        </td>
                    </tr>
                  )) : <tr><td colSpan="6">Loading...</td></tr>
              }
            </tbody>
          </table>
          {/* Pagination */}
          {totalPages > 1 && (
            <ul className="pagination">
              {[...Array(totalPages).keys()].map(pageNumber => (
                <li key={pageNumber + 1} className={`page-item ${pageNumber + 1 === currentPage ? 'active' : ''}`}>
                  <button onClick={() => handlePageChange(pageNumber + 1)} className="page-link">
                    {pageNumber + 1}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>
        </div>
      </Container>
    </Fragment>
  );
}

export default ReviewAppointment;
