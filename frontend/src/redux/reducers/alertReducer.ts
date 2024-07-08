const initialState = {
  loading: false,
}

export type AlertStateType = {
  loading: boolean;
}

export type AlertActionType = {
  type: string;
  payload: boolean;
}

export const alertReducer = (state:AlertStateType=initialState, action:AlertActionType) => {
  switch(action.type){
    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      }
    default:
      return state
  }
}