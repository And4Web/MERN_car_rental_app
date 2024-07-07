import { useParams } from "react-router-dom"
import DefaultLayout from "../components/DefaultLayout"
import { useSelector } from "react-redux";
import { CarType } from "./BookingCar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSingleCar } from "../redux/actions/carsActions";
import Loader from "../components/Loader";
import { Col, Form, Input, Row } from "antd";
import FormItem from "antd/es/form/FormItem";


function EditCar() {
  const dispatch = useDispatch();
  const params = useParams();
  const {loading} = useSelector(state=>state?.alert);
  const {car} = useSelector(state=>state?.car);

  const [currentCar, setCurrentCar] = useState<CarType>({});

  useEffect(()=>{
    dispatch(getSingleCar(params.carId));
  },[])

  const onFinish = (values) => {
    const prevValues = car;
    
    console.log(values);
  }

  
  console.log(car, currentCar)
  return (
    <DefaultLayout>

    {loading && <Loader/>}

    <h2 className="text-center mt-3">Add new car</h2>

    <Row justify="center" className="mx-2">
      <Col lg={12} sm={24}>
      <Form className="bs-1 p-2 d-flex flex-column rounded pt-3 mb-5" layout="vertical" onFinish={onFinish}>
      <FormItem name="name" label="Car name" rules={[{required: true}]} >
        <Input type="text" placeholder={car.name}/>
      </FormItem >

      <FormItem name="image" label="Image" rules={[{required: true}]}>
        <Input type="text" placeholder={car.image}/>
      </FormItem>

      <FormItem name="capacity" label="Capacity (Number of passangers including driver)" rules={[{required: true}]}>
        <Input type="number" min={2} max={20} placeholder={car.capacity}/>
      </FormItem>

      <FormItem name="displacement" label="Displacement (CC)" rules={[{required: true}]}>
        <Input type="text" placeholder={car.displacement}/>
      </FormItem>

      <FormItem name="power" label="Power (BHP)" rules={[{required: true}]}>
        <Input type="text" placeholder={car.power}/>
      </FormItem>

      <FormItem name="torque" label="Torque (Nm)" rules={[{required: true}]}>
        <Input type="text" placeholder={car.torque}/>
      </FormItem>

      <FormItem name="fuelType" label="Fuel type (Petrol/Diesel/EV/Hybrid)" rules={[{required: true}]}>
        <Input type="text" placeholder={car.fuelType}/>
      </FormItem>

      <FormItem name="rentPerHour" label="Rent per hour (₹)" rules={[{required: true}]}>
        <Input type="text" placeholder={car.rentPerHour}/>
      </FormItem>

      <button className="btn-1 w-50 align-self-center mb-3" type="submit" >Edit Car</button>
    </Form>
      
      </Col>
    </Row>

    
  </DefaultLayout>
  )
}

export default EditCar