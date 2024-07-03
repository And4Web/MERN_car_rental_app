import { useParams } from 'react-router-dom'
import DefaultLayout from '../components/DefaultLayout'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllCars } from '../redux/actions/carsActions';
import Loader from '../components/Loader';
import { DatePicker } from 'antd';
import moment from 'moment';
// import axios from 'axios';
// import { backendUrl } from '../redux/actions/userActions';

const {RangePicker} = DatePicker;

export type CarType = {
  _id: string;
  name: string;
  capacity: number;
  displacement: number;
  power: number;
  torque: number;
  fuelType: string;
  bookedTimeSlots: {from: string; to: string}[];
  image: string;
  rentPerHour: number;
};

function BookingCar() {
  const params = useParams();
  const {cars} = useSelector(state=>state?.cars);
  const {loading} = useSelector(state=>state?.alert);
  const dispatch = useDispatch();

  const [car, setCar] = useState<CarType>();
  
  useEffect(()=>{
    if(cars.length === 0){
      dispatch(getAllCars());
    }
    
    if(cars.length > 0){
      const carVal = cars.find(i=>i._id === params.carId);
      setCar(carVal);    
    }

  }, [cars])

  const handleSelectTimeSlot = (values):undefined =>{
    console.log(values);
    console.log(moment(values[0].$d).format('DD MMM YYYY HH:mm'))
    console.log(moment(values[1].$d).format('DD MMM YYYY HH:mm'))
  }

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
            <p className="car-info-capacity"><b>Capacity:</b> {car?.capacity} Person</p>
            <p className="car-info-cc"><b>Displacement, Power & Torque:</b> {car?.displacement}CC, {car?.power} BHP, {car?.torque} Nm</p>
            <p className="car-info-fuel"><b>Fuel type:</b> {`${car?.fuelType.split("")[0].toUpperCase()}${car?.fuelType.split("").slice(1).join("")}`}</p>
            <p className="car-info-rent-per-hour"><b>Rent per hour:</b> &#8377;{car?.rentPerHour}</p>
          </div>

          <h3>Time slots</h3>
          <div className="car-time-slots">
            <button className="btn-1">See booked time slots</button>
            <RangePicker showTime={{format: "HH:mm"}} format="DD MM YYYY HH:mm" onChange={handleSelectTimeSlot}/>
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