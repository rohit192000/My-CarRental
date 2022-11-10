import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './component/User/about';
import Contact from './component/User/contact';
import Home from './component/User/home';
import Login from './component/User/login';
import Adminlogin from './component/Admin/adminlogin';
import Cardetail from './component/Admin/cardetail';
import Category from './component/Admin/catgory';
import Driver from './component/Admin/driver';
import AdminNavbar from './component/Admin/adminNavbar';
import Dashboard from './component/Admin/dashboard';
import Signup from './component/User/signup';
import Carlist from './component/Admin/carlist';
import Userlist from './component/Admin/userlist';
import Driverlist from './component/Admin/driverlist';
import Booking from './component/Admin/booking';
import Driverlogin from './component/Driver/driverlogin';
import Driverdb from './component/Driver/driverdb';
import Usernavbar from './component/User/usernavbar';
import Lookdetail from './component/User/lookdetail';
import Viewmore from './component/viewmore';
import Userdetail from './component/User/userdetail';
import Carsearch from './component/User/carsearch';
import Confirm from './component/User/confirm';
import Vacantform from './component/User/vacantform';
import Userprofile from './component/User/userprofile';
import Userbooking from './component/User/userbooking';
import Topnavadmin from './component/Admin/topnavadmin';
import Registration from './component/User/registration';
import Myorder from './component/User/myorder';
import Viewbooking from './component/User/viewbooking';
import Viewbookingadmin from './component/Admin/viewbookingadmin';
import Viewbookingdriver from './component/Driver/viewbookingdriver';
import Contactinfo from './component/Admin/contactinfo';

const App = () => {
  return (
    <>
      <Router>

        <Routes>

          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Login />} />
          <Route path='/adminlogin' element={<Adminlogin />} />
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
    </>
  );
}
export default App;
