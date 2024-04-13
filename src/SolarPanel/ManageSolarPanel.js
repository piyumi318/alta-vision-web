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

const ManageSolarPanel = () => {
 
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
            <div className="container mt-5">
              <div className="txet-end"><button onClick={handleShow}>Add</button></div>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Solar Panel ID</th>
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
                          <td>{solarpanel.capacity}</td>
                          <td>{solarpanel.price}</td>
                          <td>{solarpanel.createdBy}</td>
                          <td>{solarpanel.statusId}</td>
                          <td colSpan={2}>
                            <button className="btn btn-primary">Review</button>&nbsp;
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

export default ManageSolarPanel;
