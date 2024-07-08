import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import BookingCar from './pages/BookingCar';
import Register from './pages/Register';
import UserBookings from './pages/UserBookings';
import ProtectedPath from './components/ProtectedPath';
import DefaultLayout from './components/DefaultLayout';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';

function App() {
  return (
    <>        
      <Routes>
        <Route path='/' element={<ProtectedPath><Home/></ProtectedPath>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/booking/:carId' element={<ProtectedPath><BookingCar/></ProtectedPath>}/>
        <Route path='/profile' element={<ProtectedPath><><DefaultLayout>Profile</DefaultLayout></></ProtectedPath>}/>
        <Route path='/bookings' element={<ProtectedPath><UserBookings/></ProtectedPath>}></Route>
        <Route path="/addcar" element={<ProtectedPath><AddCar/></ProtectedPath>}/>
        <Route path="/admin" element={<ProtectedPath><AdminHome/></ProtectedPath>}/>
        <Route path="/editcar/:carId" element={<ProtectedPath><EditCar/></ProtectedPath>}/>
      </Routes>
      
    </>
  )
}

export default App
