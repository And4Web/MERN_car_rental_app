import { useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { bookCar, createPaymentIntent, getAllCars } from "../redux/actions/carsActions";
import Loader from "../components/Loader";
import { Checkbox, DatePicker, Modal } from "antd";
import moment from "moment";

import StripeCheckout from "react-stripe-checkout";

// import { CardElement, Elements } from "@stripe/react-stripe-js";
// import stripePromise from "../stripe/stripe";
// import axios from 'axios';
// import { backendUrl } from '../redux/actions/userActions';

const { RangePicker } = DatePicker;

export type CarType = {
  _id: string;
  name: string;
  capacity: number;
  displacement: number;
  power: number;
  torque: number;
  fuelType: string;
  bookedTimeSlots: { from: string; to: string }[];
  image: string;
  rentPerHour: number;
};

function BookingCar() {
  const params = useParams();
  const { cars } = useSelector((state) => state?.cars);
  const { loading } = useSelector((state) => state?.alert);
  const dispatch = useDispatch();

  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [totalHours, setTotalHours] = useState<number>(0);
  const [totalCarRent, setTotalCarRent] = useState<number>(0);

  const [car, setCar] = useState<CarType>();
  const [hireDriver, setHireDriver] = useState<boolean>(false);
  const [driverRent, setDriverRent] = useState<number>(0);

  const [totalCost, setTotalCost] = useState<number>(0);

  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    }

    if (cars.length > 0) {
      const carVal = cars.find((i) => i._id === params.carId);
      setCar(carVal);
    }
  }, [cars]);

  useEffect(() => {
    if (hireDriver && totalHours > 0) {
      setHireDriver(true);
      setDriverRent(Math.ceil(totalHours * 499 * 1.18));
    } else if (!hireDriver && totalHours > 0) {
      setHireDriver(false);
      setDriverRent(0);
    } else {
      setHireDriver(false);
      setDriverRent(0);
    }

    if (hireDriver) {
      const tCost = totalCarRent + driverRent;
      setTotalCost(tCost);
    } else {
      setTotalCost(totalCarRent);
    }
  }, [hireDriver, driverRent, totalHours, totalCarRent, totalCost]);

  const handleSelectTimeSlot = (values): undefined => {
    const from = moment(values[0].$d).format("DD MMM YYYY HH:mm");
    const to = moment(values[1].$d).format("DD MMM YYYY HH:mm");

    const fromMilliSeconds = Date.parse(from);
    const toMilliSeconds = Date.parse(to);
    const tHours = (toMilliSeconds - fromMilliSeconds) / (1000 * 60 * 60);

    const tCarRent = Math.ceil((car?.rentPerHour as number) * tHours * 1.18);

    setFrom(from);
    setTo(to);
    setTotalHours(tHours);
    setTotalCarRent(tCarRent);
  };

  const handleBookNow = () => {
    const reqObj = {
      user: JSON.parse(localStorage.getItem("user") as string)._id,
      car: car?._id,
      totalHours,
      totalCost,
      driverRent,
      carRent: totalCarRent,
      driverRequired: hireDriver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    // const bookingObj = {
    //   car: car?._id,
    //   user: JSON.parse(localStorage.getItem("user") as string)._id,
    //   totalCost,
    // }

    // localStorage.setItem("bookingInfo", JSON.stringify(reqObj));

    dispatch(bookCar(reqObj));
    // dispatch(createPaymentIntent(bookingObj));
  };

  const onToken = (token) => {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user") as string)._id,
      car: car?._id,
      totalHours,
      totalCost,
      driverRent,
      carRent: totalCarRent,
      driverRequired: hireDriver,
      bookedTimeSlots: {
        from,
        to,
      },
    };

    dispatch(bookCar(reqObj));
    
    console.log("stripe token >>> ", token);
  }

  // console.log(hireDriver, totalCarRent, driverRent, totalCost)


  return (
    <DefaultLayout>
      {loading && <Loader />}

      <div className="booking-car-container">
        <div className="left">
          <img className="car-img-2" src={car?.image} alt={car?.name} />
        </div>

        <div className="right">
          <h3>Car info</h3>
          <div className="car-info">
            <p className="car-info-name">
              <b>Car name:</b> {car?.name}
            </p>
            <p className="car-info-capacity">
              <b>Capacity:</b> {car?.capacity} Person
            </p>
            <p className="car-info-cc">
              <b>Displacement, Power & Torque:</b> {car?.displacement}CC,{" "}
              {car?.power} BHP, {car?.torque} Nm
            </p>
            <p className="car-info-fuel">
              <b>Fuel type:</b>{" "}
              {`${car?.fuelType.split("")[0].toUpperCase()}${car?.fuelType
                .split("")
                .slice(1)
                .join("")}`}
            </p>
            <p className="car-info-rent-per-hour">
              <b>Car's Rent:</b> &#8377;{car?.rentPerHour} per hour (+18% GST)
            </p>
            <p>
              <b>Driver's rent: </b>&#8377; 499 per hour (+18% GST)
            </p>
          </div>

          <h3>Time slots</h3>
          <div className="car-time-slots">
            <button className="btn-1" onClick={() => setShowModal(true)}>
              See booked time slots
            </button>
            <RangePicker
              showTime={{ format: "HH:mm" }}
              format="DD MM YYYY HH:mm"
              onChange={handleSelectTimeSlot}
            />
          </div>
          <div className="car-select-info">
            <div className="car-select-left">
              <div className="from">
                <p>
                  <b>From:</b>
                </p>
                <p>{from}</p>
              </div>
              <div className="to">
                <p>
                  <b>To:</b>
                </p>
                <p>{to}</p>
              </div>
              <p>
                <b>Total Hours: </b>
                {totalHours} {`${totalHours > 1 ? "hours" : "hour"}`}
              </p>
            </div>

            <div className="car-select-right">
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setHireDriver(true);
                  } else {
                    setHireDriver(false);
                  }
                }}
              >
                <b>Hire driver</b>
              </Checkbox>
              {hireDriver && (
                <p>
                  <b>Driver's Rent:</b> &#8377; {driverRent} (GST: &#8377;{" "}
                  {Math.ceil(499 * totalHours * 0.18)} inc.)
                </p>
              )}
              <p>
                <b>Car's Rent: </b>&#8377; {totalCarRent} (GST: &#8377;{" "}
                {Math.ceil(totalHours * (car?.rentPerHour as number) * 0.18)}{" "}
                inc.)
              </p>
              <p>
                <b>Total Cost: </b>&#8377; {totalCost}
              </p>

             
                {/* <Elements stripe={stripePromise} options={{
                clientSecret: JSON.parse(localStorage.getItem('stripeData') as string).clientSecret  
              }}>
                <CardElement className="my-3 border rounded p-2" id="payment-element"></CardElement>
              </Elements> */}

              <StripeCheckout
                shippingAddress
                name="A-cars co."
                description={`Payment for booking of ${car?.name}`}
                amount={totalCost * 100}
                currency="inr"
                stripeKey={import.meta.env.VITE_STRIPE_PUB_KEY}
                bitcoin
                token={onToken}                
              >
                <button className="btn-1" >
                  Book now
                </button>
              </StripeCheckout>

              
              <Modal
                closable
                footer={false}
                title="Booked time slots"
                open={showModal}
                onCancel={() => setShowModal(false)}
              >
                {car?.bookedTimeSlots?.length === 0 ? (
                  <p>No bookings yet</p>
                ) : (
                  car?.bookedTimeSlots.map((slot, index) => {
                    return (
                      <p
                        key={index}
                        style={{ borderBottom: "1px solid black" }}
                      >
                        {slot.from} - {slot.to}
                      </p>
                    );
                  })
                )}
              </Modal>
              
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default BookingCar;
