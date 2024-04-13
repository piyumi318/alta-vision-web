import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'C:/Users/piyumi/alta-vision-web/src/Style/PredictionHistory.css'; // Import your CSS file for component-specific styles
import CustomerNav from 'C:/Users/piyumi/alta-vision-web/src/NavigationBar/CusNavigationBar';


const SolarPanel = () => {
const header = new Headers();
  header.append('Access-Control-Allow-Origin', '*');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [show, setShow] = useState(false);
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

      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Fragment>
      <ToastContainer />
      <CustomerNav />;
      <div className="Reg-container">
        <div className='contrainer'>
          <div className='header'>
            <div className='text'>Review Appointment</div>
          </div>
          <div className="container mt-5">
            <div className="row">
              {
                data && data.length > 0 ?
                  data.slice(indexOfFirstItem, indexOfLastItem).map((prediction, index) => (
                    <div key={index} className="col-md-4 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Solar Panel ID: {prediction.solarPanelId}</h5>
                          <p className="card-text">Capacity: {prediction.capacity}</p>
                          <p className="card-text">Price: {prediction.price}</p>
                          <p className="card-text">Created By: {prediction.createdBy}</p>
                          <p className="card-text">Status: {prediction.status}</p>
                          {/* Add any other details you want to display */}
                          <button className="btn btn-primary">Options</button>
                        </div>
                      </div>
                    </div>
                  )) : <div className="col">Loading...</div>
              }
            </div>
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
    </Fragment>
  );
}

export default SolarPanel;
