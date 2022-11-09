import './App.css';
import firebase from './firebase';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Button, ButtonGroup, } from '@material-ui/core';
import { AppBar, Typography, Toolbar } from '@material-ui/core';


import About from './component/about';
import Contact from './component/contact';
import Home from './component/home';
import Login from './component/login';
import Adminlogin from './component/adminlogin';
// import dashboard from './component/dashboard';
import Cardetail from './component/cardetail';
import Category from './component/catgory';
import Driver from './component/driver';
import AdminNavbar from './component/adminNavbar';
import Dashboard from './component/dashboard';
import Signup from './component/signup';
import Carlist from './component/carlist';
import Userlist from './component/userlist';
import Driverlist from './component/driverlist';
import Booking from './component/booking';
import Driverlogin from './component/driverlogin';
import Driverdb from './component/driverdb';
import Usernavbar from './component/usernavbar';
import Lookdetail from './component/lookdetail';
import Viewmore from './component/viewmore';
import Userdetail from './component/userdetail';
import Carsearch from './component/carsearch';
import Confirm from './component/confirm';
import Vacantform from './component/vacantform';
import Userprofile from './component/userprofile';
import Userbooking from './component/userbooking';
import Topnavadmin from './component/topnavadmin';
import Registration from './component/registration';
import Myorder from './component/myorder';
import Viewbooking from './component/viewbooking';
import Viewbookingadmin from './component/viewbookingadmin';
import Viewbookingdriver from './component/viewbookingdriver';
import Contactinfo from './component/contactinfo';

function App() {
  return (
    <Router>

      <Routes>

        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Login />} />
        <Route path='/adminlogin' element={<Adminlogin />} />
        {/* <Route path='/dashboard' element={<dashboard/>} /> */}
        <Route path='/cardetail' element={<Cardetail />} />
        <Route path='/driver' element={<Driver />} />
        <Route path='/adminNavbar' element={<AdminNavbar />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/carlist' element={<Carlist />} />
        <Route path='/userlist' element={<Userlist />} />
        <Route path='/driverlist' element={<Driverlist />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/driverlogin' element={<Driverlogin />} />
        <Route path='/driverdb' element={<Driverdb />} />
        <Route path='/usernavbar' element={<Usernavbar />} />
        <Route path='/lookdetail' element={<Lookdetail />} />
        <Route path='/viewmore' element={<Viewmore />} />
        <Route path='/userdetail' element={<Userdetail />} />
        <Route path='/carsearch' element={<Carsearch />} />
        <Route path='/confirm' element={<Confirm />} />
        <Route path='/vacantform' element={<Vacantform />} />
        <Route path='/userprofile' element={<Userprofile />} />
        <Route path='/userbooking' element={<Userbooking />} />
        <Route path='/category' element={<Category />} />
        <Route path='/topnavadmin' element={<Topnavadmin />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/myorder' element={<Myorder />} />
        <Route path='/viewbooking' element={<Viewbooking />} />
        <Route path='/viewbookingadmin' element={<Viewbookingadmin />} />
        <Route path='/viewbookingdriver' element={<Viewbookingdriver />} />
        <Route path='/contactinfo' element={<Contactinfo />} />
      </Routes>
    </Router>
  );
}

export default App;
