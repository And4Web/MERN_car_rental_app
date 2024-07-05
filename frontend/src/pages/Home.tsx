import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { Row, Col, DatePicker } from "antd";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsActions";
import moment from "moment";
import { CarType } from "./BookingCar";

const { RangePicker } = DatePicker;

function Home() {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state?.cars);
  const { loading } = useSelector((state) => state?.alert);

  const [availableCars, setAvailableCars] = useState<CarType[]>([]);

  useEffect(() => {
    dispatch(getAllCars());
  }, []);

  useEffect(() => {
    setAvailableCars(cars);
  }, [cars]);

  console.log(availableCars, loading);

  const handleFilterSlot = (values) => {
    const fromFilter = moment(values[0].$d).format("DD MMM YYYY HH:mm");
    const toFilter = moment(values[1].$d).format("DD MMM YYYY HH:mm");

    const temp: CarType[] = [];

    for (const car of cars) {
      if (car.bookedTimeSlots.length === 0) {
        temp.push(car);
      } else {
        for (const booking of car.bookedTimeSlots) {
          const filterOptions =
            moment(fromFilter).isSame(booking.from) ||
            moment(toFilter).isSame(booking.to) ||
            moment(fromFilter).isBetween(booking.from, booking.to) ||
            moment(toFilter).isBetween(booking.from, booking.to) ||
            moment(booking.from).isBetween(fromFilter, toFilter) ||
            moment(booking.to).isBetween(fromFilter, toFilter);

          if (filterOptions) {
            console.log("");
          } else {
            temp.push(car);
          }
        }
      }
    }

    setAvailableCars(temp);
    console.log(fromFilter, toFilter);
  };

  return (
    <DefaultLayout>
      {loading && <Loader />}
      <h1 className="text-center">Available Cars</h1>
      {
        <Row gutter={16} className="mt-3" justify="center">
          <Col lg={20} sm={20}>
            <b>Check Available Slots: </b>
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="DD MM YYYY HH:mm"
              onChange={handleFilterSlot}
            ></RangePicker>
          </Col>
        </Row>
      }

      {!loading && (
        <div className="cars-container">
          <Row justify="center" align="middle" gutter={16} className="mt-3">
            {availableCars?.map((car, index) => {
              return (
                <Col lg={5} md={8} sm={12} xs={20}>
                  <div key={index} className="car p-2 bs-1 mt-3">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="car-img mb-2"
                    />

                    <div className="car-content d-flex align-items-center justify-content-between">
                      <div>
                        <h6>{car.name}</h6>
                        <p>&#8377;{car.rentPerHour} per hour</p>
                      </div>

                      <div>
                        <button className="btn-1">
                          <Link to={`/booking/${car._id}`}>Book now</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </DefaultLayout>
  );
}

export default Home;
