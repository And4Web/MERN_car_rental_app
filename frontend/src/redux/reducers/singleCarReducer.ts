import { CarType } from "../../pages/BookingCar";

const initialData = {
  car: {}
}

export type SingleCarReducerAction = {
  type: string;
  payload: CarType;
}

export const singleCarReducer = (state=initialData, action: SingleCarReducerAction) => {
  switch(action.type){
    case 'GET_SINGLE_CAR':
      return {
        ...state,
        car: action.payload,
      }
      
    default: 
      return state
  }
}