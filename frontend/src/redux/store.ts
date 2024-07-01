import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension';

import {thunk} from 'redux-thunk';

import { carsReducer } from './reducers/carsReducer';
import { alertReducer } from './reducers/alertReducer';


const composeEnhancers = composeWithDevTools({});

const middleware = [thunk];

const rootReducer = combineReducers({
  cars: carsReducer,
  alert: alertReducer,
  
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(...middleware)
))


export default store;