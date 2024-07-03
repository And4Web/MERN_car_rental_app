import { useParams } from 'react-router-dom'
import DefaultLayout from '../components/DefaultLayout'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllCars } from '../redux/actions/carsActions';
import Loader from '../components/Loader';
import { Col, Divider, Row } from 'antd';
// import axios from 'axios';
// import { backendUrl } from '../redux/actions/userActions';

export type CarType = {
  _id: string;
  name: string;
  capacity: number;
  fuelType: string;
  bookedTimeSlots: {from: string; to: string}[];
  image: string;
};

function BookingCar() {
  const params = useParams();
  const {cars} = useSelector(state=>state?.cars);
  const {loading} = useSelector(state=>state?.alert);
  const dispatch = useDispatch();

  const [car, setCar] = useState<CarType>();
  
  useEffect(()=>{
    dispatch(getAllCars());
    const carVal = cars.find(i=>i._id === params.carId);    
    setCar(carVal);    
  }, [car])

  return (
    <DefaultLayout>
      {loading && <Loader/>}

      <div className="booking-car-container">
        <div className="left">
          <img className='car-img-2' src={car?.image} alt={car?.name} />
        </div>

        <div className="right">
          <h3>Car info</h3>
          <div className="car-info">
            <p className="car-info-name"><b>Car name:</b> {car?.name}</p>
            <p className="car-info-capacity"><b>Capacity:</b> {car?.capacity}CC</p>
            <p className="car-info-rent-per-hour"><b>Rent per hour:</b> &#8377;{car?.rentPerHour}</p>
          </div>

          <h3>Time slots</h3>
          <div className="car-time-slots">
            <button className="btn-1">See booked time slots</button>
          </div>
        </div>
      </div>

      {/* <Row justify='center' className='d-flex align-items-center justify-content-center' style={{minHeight: "80vh"}}>
        <Col lg={10} sm={24} xs={24}>
          <img src={car?.image} alt={car?.name} className='car-img-2 bs-1'/>
        </Col>


        <Col lg={10} sm={24} xs={24}>
          <Divider type='horizontal' dashed>Car info</Divider>
        </Col>
      </Row> */}
      
    </DefaultLayout>
  )
}

export default BookingCar