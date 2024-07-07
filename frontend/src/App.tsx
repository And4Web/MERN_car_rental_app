import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import BookingCar from './pages/BookingCar';
import Register from './pages/Register';
import UserBookings from './pages/UserBookings';
import ProtectePath from './components/ProtectePath';
import DefaultLayout from './components/DefaultLayout';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';

function App() {
  return (
    <>        
      <Routes>
        <Route path='/' element={<ProtectePath><Home/></ProtectePath>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/booking/:carId' element={<ProtectePath><BookingCar/></ProtectePath>}/>
        <Route path='/profile' element={<ProtectePath><><DefaultLayout>Profile</DefaultLayout></></ProtectePath>}/>
        <Route path='/bookings' element={<ProtectePath><UserBookings/></ProtectePath>}></Route>
        <Route path="/addcar" element={<ProtectePath><AddCar/></ProtectePath>}/>
        <Route path="/admin" element={<ProtectePath><AdminHome/></ProtectePath>}/>
        <Route path="/editcar/:carId" element={<ProtectePath><EditCar/></ProtectePath>}/>
      </Routes>
      
    </>
  )
}

export default App
