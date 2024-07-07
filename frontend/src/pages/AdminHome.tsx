import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCars } from "../redux/actions/carsActions";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CarType } from "./BookingCar";

function AdminHome() {
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

  // console.log(availableCars, loading);

  return (
    <DefaultLayout>
      {loading && <Loader />}
      <h1 className="text-center mt-3">Edit Cars</h1>

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

                      <div className="d-flex justify-content-center align-items-center">
                        <Link to={`/editcar/${car._id}`}>
                        <EditOutlined
                          style={{ color: "red", cursor: "pointer" }}
                        />
                        </Link>

                        <Link to="/deletecar">                        
                          <DeleteOutlined
                            style={{ color: "green", cursor: "pointer" }}
                          />
                        </Link>
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

export default AdminHome;
