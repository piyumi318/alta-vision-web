import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'C:/Users/piyumi/alta-vision-web/src/Style/CustomerNav.css';
import logo_icon from 'C:/Users/piyumi/alta-vision-web/src/icon/logo.png';
function CustomerNav(){
    const [displayusername, displayusernameupdate] = useState('');
    const [showmenu, showmenuupdateupdate] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();
    function getSessionUserID() {
        const userDataString = sessionStorage.getItem('userData');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            const now = new Date();
            if (now.getTime() < userData.expirationTime) {
                return userData.userID; 
            } else {
                sessionStorage.removeItem('userData'); 
            }
        }
        return null; 
    }
    useEffect(() => {
        if (location.pathname === '/' || location.pathname === '/CustomerReg') {
            showmenuupdateupdate(false);
        } else {
            showmenuupdateupdate(true);
            //let username = sessionStorage.getItem('username');
            const userid = getSessionUserID();
            if (userid === '' || userid === null) {
                usenavigate('/');
            } else {
                const userDataString = sessionStorage.getItem('userData');
                const userData = JSON.parse(userDataString);
                displayusernameupdate(userData.username);
            }
        }

    }, [location])
    return(
        
              
                    <div>
                    {showmenu &&
                      <nav>
                        <img src={logo_icon} alt='' style={{ height: '35px',marginLeft:'18px'}}/>
                        <ul id="navbar">
                        
                            <li><a className="active" 
                            href="/Prediction">Predictor</a></li>
                             <li><a href="/PredictionHistory">Prediction History</a></li>
                            <li><a href="/CalculateCapacityandCost">Capacity Calculator</a></li> 
                            <li><a href="/SolarPanel">Solar Panel</a></li>
                            <li><a href="/Appointment">Appoinment Request</a></li>
                            <li><span style={{ fontSize:'15px',color:"white" }}>Welcome <br /> {displayusername}</span>
                            <br />
                                <Link style={{ float: 'right' }} to={'/'}>Logout</Link>
                            </li>
                        </ul>
                        </nav> }
                    </div>
                  
        
    )
}
export default CustomerNav;