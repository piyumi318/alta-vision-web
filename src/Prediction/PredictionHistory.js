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
import CustomerNav from 'C:/Users/piyumi/alta-vision-web/src/NavigationBar/CusNavigationBar';

const PredictionHistory = () => {
 
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
const userDataString = sessionStorage.getItem('userData');
    const userData = JSON.parse(userDataString);
  const getData = () => {
    axios.get('http://localhost:5089/api/Prediction/GetPredictionsbyUserId?userid='+userData.userID, header)
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
      <Container>
      <div className="Reg-container">
      <div className='contrainer'>
      <div className='header' style={{padding:'25px'}}>
        <div className='text' >Prediction History</div></div>
        <div className="container mt-5">
         
          <table className="custom-table">
            <thead>
              <tr>
                <th>WindSpeed (km/h)</th>
                <th>Sunshine Duration (min)</th>
                <th>Radiation (J/kg)</th>
                <th>Air Pressure (mb)</th>
                <th>Air Temperature (°C)</th>
              
                <th> Relative Air Humidity (%)</th>
                <th>Month</th>
                <th>Day</th>
                <th>Hour</th>
                <th>Predicted Solar Power (Wh)</th>
              </tr>
            </thead>
            <tbody>
              {
                currentData && currentData.length > 0 ?
                  currentData.map((prediction, index) => (
                    <tr key={index}>
                      <td>{prediction.windSpeed}</td>
                      <td>{prediction.sunshine}</td>
                      <td>{prediction.radiation}</td>
                      <td>{prediction.airPressure}</td>
                      <td>{prediction.airTemperature}</td>
                      
                      <td>{prediction.relativeAirHumidity}</td>
                      <td>{prediction.month}</td>
                      <td>{prediction.day}</td>
                      <td>{prediction.hour}</td>
                      <td>{prediction.solarPowerProduction}</td>
                      
                  
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

export default PredictionHistory;
