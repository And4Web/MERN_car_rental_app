import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import BookingCar from './pages/BookingCar';
import Register from './pages/Register';

function App() {
  return (
    <>        
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/bookingcar' element={<BookingCar/>}/>
      </Routes>
      
    </>
  )
}

export default App
