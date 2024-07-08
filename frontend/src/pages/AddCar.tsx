import FormItem from "antd/es/form/FormItem";
import DefaultLayout from "../components/DefaultLayout";
import { Col, Form, Input, Row } from "antd";
import { useDispatch } from "react-redux";
import { addCar } from "../redux/actions/carsActions";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { AlertStateType } from "../redux/reducers/alertReducer";
import { RootState } from "../redux/store";


function AddCar() {

  const {loading} = useSelector<RootState, AlertStateType>(state=>state?.alert);

  const dispatch = useDispatch();

  const onFinish = (values) => {

    values.bookedTimeSlots = [];
    values.capacity = Number.parseInt(values.capacity);
    values.displacement = Number.parseInt(values.displacement);
    values.rentPerHour = Number.parseInt(values.rentPerHour);
    values.power = Number.parseInt(values.power);
    values.torque = Number.parseInt(values.torque);

    console.log({values})

    dispatch(addCar(values));
  }

  return (
    <DefaultLayout>

      {loading && <Loader/>}

      <h2 className="text-center mt-3">Add new car</h2>

      <Row justify="center" className="mx-2">
        <Col lg={12} sm={24}>
        <Form className="bs-1 p-2 d-flex flex-column rounded pt-3 mb-5" layout="vertical" onFinish={onFinish}>
        <FormItem name="name" label="Car name" rules={[{required: true}]}>
          <Input type="text" />
        </FormItem >

        <FormItem name="image" label="Image" rules={[{required: true}]}>
          <Input type="text" />
        </FormItem>

        <FormItem name="capacity" label="Capacity (Number of passangers including driver)" rules={[{required: true}]}>
          <Input type="number" min={2} max={20}/>
        </FormItem>

        <FormItem name="displacement" label="Displacement (CC)" rules={[{required: true}]}>
          <Input type="text" />
        </FormItem>

        <FormItem name="power" label="Power (BHP)" rules={[{required: true}]}>
          <Input type="text" />
        </FormItem>

        <FormItem name="torque" label="Torque (Nm)" rules={[{required: true}]}>
          <Input type="text" />
        </FormItem>

        <FormItem name="fuelType" label="Fuel type (Petrol/Diesel/EV/Hybrid)" rules={[{required: true}]}>
          <Input type="text" />
        </FormItem>

        <FormItem name="rentPerHour" label="Rent per hour (₹)" rules={[{required: true}]}>
          <Input type="text" />
        </FormItem>

        <button className="btn-1 w-50 align-self-center mb-3" type="submit" >Add Car</button>
      </Form>
        
        </Col>
      </Row>

      
    </DefaultLayout>
  )
}

export default AddCar