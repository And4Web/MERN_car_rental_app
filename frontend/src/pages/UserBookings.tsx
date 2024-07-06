import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { getAllBookings } from "../redux/actions/bookingsActions";


function UserBookings() {

  const dispatch = useDispatch();
  const {bookings} = useSelector(state => state?.bookings);
  console.log(bookings);

  useEffect(()=>{
    dispatch(getAllBookings(JSON.parse(localStorage.getItem('user') as string)._id));
  },[])

  return (
    <div>UserBookings</div>
  )
}

export default UserBookings