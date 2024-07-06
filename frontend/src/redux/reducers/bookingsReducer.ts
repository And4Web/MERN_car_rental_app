const initialData: {bookings: BookingType[] | []} = {
  bookings: []
};

export type BookingType = {
  carName: string;
  totalHours: number;
  rentPerHour: number;
  totalCost: number;
  from: string;
  to: string;
  transactionId: string;
  date: Date;
}

export type BookingActionType = {
  type: string;
  payload: BookingType[];
}

export const bookingsReducer = (state=initialData, action:BookingActionType) => {
  switch(action.type){
    case "GET_ALL_BOOKINGS":
      return {
        ...state,
        bookings: action.payload
      }

    default: 
      return state
  }
}