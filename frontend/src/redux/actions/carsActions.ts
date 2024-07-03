import axios from "axios";
import { backendUrl } from "./userActions";

// type GetAllCarsActionType = {type: string, payload: Promise<string>|boolean}

export const getAllCars = () => async (dispatch) => {
  dispatch({type: "LOADING", payload: true});
  try {
    const response = await axios.get(`${backendUrl}/cars/getAllCars`);
    dispatch({type: "GET_ALL_CARS", payload: response.data});
    dispatch({type: "LOADING", payload: false});

  } catch (error) {
    console.log("Error while fetching all cars data >>> ", error);
    dispatch({type: "LOADING", payload: false});
  }
}