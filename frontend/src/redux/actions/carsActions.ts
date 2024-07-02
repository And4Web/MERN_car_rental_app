import axios from "axios";

export const getAllCars = () => async (dispatch) => {
  dispatch({type: "LOADING", payload: true});
  try {
    const response = await axios.get('/api/v1/cars/getAllCars');
    dispatch({type: "GET_ALL_CARS", payload: response.data});
    dispatch({type: "LOADING", payload: false});

  } catch (error) {
    console.log("Error in fetching all cars data >>> ", error);
    dispatch({type: "LOADING", payload: false});
  }
}