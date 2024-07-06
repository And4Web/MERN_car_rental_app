import axios from "axios";
import { backendUrl } from "./userActions";
import { message } from "antd";

export const getAllBookings = (userId: string) => async(dispatch)=>{
  dispatch({type: "LOADING", payload: true});
  try {
    const response = await axios.get(`${backendUrl}/bookings/${userId}/getallbookings`);

    // console.log("action fetch >>> ", response.data.bookings);
    
    dispatch({type: "GET_ALL_BOOKINGS", payload: response.data.bookings})
    
    dispatch({type: "LOADING", payload: false})
    message.success('All bookings are listed below')
    
  } catch (error) {
    console.log("can't fetch userBookings.")
    message.error(error?.message as string);
    dispatch({type: "LOADING", payload: false})
  }


}