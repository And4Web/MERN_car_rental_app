import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension';

import {thunk} from 'redux-thunk';

import { carsReducer } from './reducers/carsReducer';
import { alertReducer } from './reducers/alertReducer';
import { bookingsReducer } from './reducers/bookingsReducer';
import { singleCarReducer } from './reducers/singleCarReducer';


const composeEnhancers = composeWithDevTools({});

const middleware = [thunk];

const rootReducer = combineReducers({
  cars: carsReducer,
  alert: alertReducer,
  bookings: bookingsReducer,
  car: singleCarReducer
  
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(...middleware)
))

export type RootState = ReturnType<typeof store.getState>

export default store;