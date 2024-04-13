import CustomerNav from 'C:/Users/piyumi/alta-vision-web/src/NavigationBar/CusNavigationBar';
import AdminNav from 'C:/Users/piyumi/alta-vision-web/src/NavigationBar/AdminNavigationBar';
export function CustomerAuthorize() {
    const userDataString = sessionStorage.getItem('userData');
  //  alert("hi"+userDataString);
    if (userDataString!=null) {
        const userData = JSON.parse(userDataString);
        if (!userData.userID || userData.userRole !=="Customer") {
            window.location.href = '/'; 
            return; 
        }
    }
else{  window.location.href = '/'; 
return; }}
export function AdminAuthorize() {
        const userDataString = sessionStorage.getItem('userData');
        if (userDataString!=null) {
            const userData = JSON.parse(userDataString);
            if (!userData.userID || userData.userRole !== "Admin") {
                window.location.href = '/AdminLogin'; 
                return; 
            }
        }
        else{  window.location.href = '/AdminLogin'; 
        return; }}

        export function CustomerAdminAuthorize() {
            const userDataString = sessionStorage.getItem('userData');
            if (userDataString!=null) {
                const userData = JSON.parse(userDataString);
                if (!userData.userID || !(userData.userRole === 'Admin'||userData.userRole === "Customer")) {
                    window.location.href = '/'; 
                    return; 
                }
            }
            else{  window.location.href = '/'; 
            return; }}

            export function BindNavigationBar(){
                const userDataString = sessionStorage.getItem('userData');
                if (userDataString!=null) {
                    const userData = JSON.parse(userDataString);
                    if (userData.userRole === "Admin") {
                         <AdminNav/> 
                    }
                    else if(userData.userRole === "Customer")
                    {
						<CustomerNav/>
                    }
                }
                else{  window.location.href = '/'; 
                return; }}