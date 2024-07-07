import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { getAllBookings } from "../redux/actions/bookingsActions";
import DefaultLayout from "../components/DefaultLayout";
import { Col, Row } from "antd";
import moment from "moment";


function UserBookings() {

  const dispatch = useDispatch();
  const {bookings} = useSelector(state => state?.bookings);

  console.log(bookings);

  useEffect(()=>{
    dispatch(getAllBookings(JSON.parse(localStorage.getItem('user') as string)._id));
  },[])

  return (
    <DefaultLayout>
      <h3 className="text-center mt-3">My Bookings</h3>
      <Row justify="center" gutter={16}>
        <Col lg={20} sm={24}>
          
            {
              bookings?.map((booking, index)=>{
                return (
                  <Row gutter={16} className="bs-1 m-2 rounded p-2 text-left " >
                    <Col lg={7} sm={24}>
                      <p style={{textDecoration: "underline"}}>{booking.car.name}</p>
                      <p><b>Total Hours: </b>{booking.totalHours}</p>
                      <p><b>Total Amount: </b>&#8377;{booking.totalCost}</p>
                    </Col>

                    <Col lg={10} sm={24}>
                      <p><b>Transaction Id: </b>{booking.transactionId}</p>
                      <p><b>From: </b>{booking.bookedTimeSlots.from}</p>
                      <p><b>To: </b>{booking.bookedTimeSlots.to}</p>
                      <p><b>Date of Booking: </b>{moment(booking.createdAt).format("DD MMM YYYY")}</p>
                    </Col>

                    <Col lg={7} sm={24}>
                      <img src={booking.car.image} alt={booking.car.name} height="120" className="p-2 " style={{borderRadius: 5}}/>
                    </Col>
                  </Row>
                )
              })
            }
        
        </Col>
      </Row>
    </DefaultLayout>
  )
}

export default UserBookings