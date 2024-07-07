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

    message.success('Booking successfull.');
    setTimeout(()=>{
      window.location.href="/bookings";
    }, 500);
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

export type AddCarType = {
  name: string;
  image: string;
  capacity: number;
  rentPerHour: number;
  displacement: number;
  power: number;
  torque: number;
  fuelType: string;
  bookedTimeSlots: [] | {
    from: string;
    to: string;
    user: string
  }[]

}

export const addCar = (reqObj:AddCarType) => async (dispatch) => {

  dispatch({type: "LOADING", payload: true});

  try {  
    await axios.post(`${backendUrl}/cars/addnewcar`, reqObj);

    message.success("new Car created. navigating back to home.")

    setTimeout(()=>{
      window.location.href="/";
    }, 500);

    dispatch({type: 'LOADING', payload: false})
  } catch (error) {
    console.log("error >>> ", error);
    message.error(error?.message);
    dispatch({type: 'LOADING', payload: false})
  }

}

export const getSingleCar = (carId:string) => async (dispatch) => {
  dispatch({type: "LOADING", payload: true});
  try {    
    const response = await axios.get(`${backendUrl}/cars/getsinglecar/${carId}`);

    dispatch({type: 'GET_SINGLE_CAR', payload: response.data.car});

    dispatch({type: "LOADING", payload: false})
    return response.data.car;

  } catch (error) {
    console.log(error);
    dispatch({type: "LOADING", payload: false});
  }
}