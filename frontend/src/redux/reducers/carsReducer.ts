const initialData = {
  cars: [],
};

export type Car = {
  _id: string;
  name: string;
  rentPerHours: number;
  fuelType: string;
};
export type CarActionType = {
  type: string;
  payload: Car[];
};

export const carsReducer = (state = initialData, action: CarActionType) => {
  switch (action.type) {
    case "GET_ALL_CARS":
      return {
        ...state,
        cars: action.payload,
      };
    default:
      return state;
  }
};
