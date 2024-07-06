import axios from "axios";
import { backendUrl } from "./userActions";
import { message } from "antd";
import { PaymentIntentResponse } from "../../types";

// type GetAllCarsActionType = {type: string, payload: Promise<string>|boolean}

export const getAllCars = () => async (dispatch) => {
  dispatch({type: "LOADING", payload: true});
  try {
    const response = await axios.get(`${backendUrl}/cars/getallcars`);
    dispatch({type: "GET_ALL_CARS", payload: response.data});
    dispatch({type: "LOADING", payload: false});

  } catch (error) {
    message.error("Can't fetch data at this moment.")
    console.log("Error while fetching all cars data >>> ", error);
    dispatch({type: "LOADING", payload: false});
  }
}

export type BookCarRequestObject = {
    user: string;
    car: string;
    totalHours: number;
    totalCost: number;
    driverRent: number;
    driverRequired: boolean;
    bookedTimeSlots: {
        from: string;
        to: string;
    };
}

export const bookCar = (reqObj:BookCarRequestObject) => async(dispatch)=>{
  dispatch({type: "LOADING", payload: true});

  try {
    await axios.post(`${backendUrl}/cars/bookcar`, reqObj);   
    message.success('Booking successfull.')
    dispatch({type: "LOADING", payload: false});
  } catch (error) {
    message.error("Something went wrong. Try again later.")
    dispatch({type: "LOADING", payload: false});
  }

}

// export type PaymentIntentRequestObject = {
//   car: string, 
//   user: string, 
//   totalCost: string
// }

// export const createPaymentIntent = (reqObj: PaymentIntentRequestObject) => async(dispatch) => {
//   dispatch({type: "LOADING", payload: true});
//   try {
//     const response = await axios.post(`${backendUrl}/cars/${reqObj.car}/payment-intent`, reqObj);

//     const stripeData = response.data.response;

//     localStorage.setItem('stripeData',JSON.stringify(stripeData) as string);
    
//     dispatch({type: "LOADING", payload: false});
//   } catch (error) {
//     console.log('Error >>> ', error); 
//     dispatch({type: "LOADING", payload: false});
//   }
// }