import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Adminlogin from './component/Admin/AdminLogin';
import AdminNavbar from './component/Admin/AdminNavbar';
import Dashboard from './component/Admin/Dashboard';
import Userlist from './component/Admin/userlist';
import Booking from './component/Admin/Booking';
import Viewbookingadmin from './component/Admin/viewbookingadmin';
import Driverlist from './component/Admin/DriverList';
import Carlist from './component/Admin/CarList';
import Category from './component/Admin/Category';
import ContactInfo from './component/Admin/ContactInfo';

import About from './component/User/about';
import Contact from './component/User/contact';
import Home from './component/User/home';
import Login from './component/User/login';
import Signup from './component/User/signup';
import Usernavbar from './component/User/usernavbar';
import Lookdetail from './component/User/lookdetail';
import Userdetail from './component/User/userdetail';
import Carsearch from './component/User/carsearch';
import Confirm from './component/User/confirm';
import Vacantform from './component/User/vacantform';
import Userprofile from './component/User/userprofile';
import Userbooking from './component/User/userbooking';
import Registration from './component/User/registration';
import Myorder from './component/User/myorder';
import Viewbooking from './component/User/viewbooking';

import Driverlogin from './component/Driver/driverlogin';
import Viewbookingdriver from './component/Driver/viewbookingdriver';
import Driverdb from './component/Driver/driverdb';
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/adminlogin' element={<Adminlogin />} />
          <Route path='/adminNavbar' element={<AdminNavbar />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/carlist' element={<Carlist />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/category' element={<Category />} />
          <Route path='/viewbookingadmin' element={<Viewbookingadmin />} />
          <Route path='/driverlist' element={<Driverlist />} />

          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/userlist' element={<Userlist />} />
          <Route path='/usernavbar' element={<Usernavbar />} />
          <Route path='/lookdetail' element={<Lookdetail />} />
          <Route path='/userdetail' element={<Userdetail />} />
          <Route path='/carsearch' element={<Carsearch />} />
          <Route path='/confirm' element={<Confirm />} />
          <Route path='/vacantform' element={<Vacantform />} />
          <Route path='/userprofile' element={<Userprofile />} />
          <Route path='/userbooking' element={<Userbooking />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/myorder' element={<Myorder />} />
          <Route path='/viewbooking' element={<Viewbooking />} />
          <Route path='/contactinfo' element={<ContactInfo />} />
    
          <Route path='/driverdb' element={<Driverdb />} />
          <Route path='/driverlogin' element={<Driverlogin />} />
          <Route path='/viewbookingdriver' element={<Viewbookingdriver />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
