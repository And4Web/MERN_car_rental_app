import { CarType } from "../../pages/BookingCar";

const initialData = {
  car: {}
}

export type SingleCarReducerAction = {
  type: string;
  payload: CarType;
}

export type CarStateType = {
  car: CarType | null
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