import axios from "axios";
import { RequestObject } from "../../types";
import {message} from 'antd';
import { Dispatch } from "redux";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const userLogin = (reqObj:RequestObject) => async (dispatch:Dispatch) => {
  dispatch({type: "LOADING", payload: true});
  try {
    
    const response = await axios.post(`${backendUrl}/users/login`, reqObj);
    const {username, _id} = response.data;
    localStorage.setItem("user", JSON.stringify({username, _id}));
    
     
    
    setTimeout(()=>{
      window.location.href = "/"; 
    }, 1000);
    
    message.success('Login success');

    dispatch({type: 'LOADING', payload: false});
  } catch (error) {
    console.log('Error submitting the form >>> ', error);
    dispatch({type: 'LOADING', payload: false});
    message.error('Login failed')
  }
}

export const userRegister = (reqObj:RequestObject) => async (dispatch:Dispatch) => {
  dispatch({type: "LOADING", payload: true});
  try {
    const response = await axios.post(`${backendUrl}/users/register`, reqObj);
    message.success('Registration success');  

    setTimeout(()=>{
      window.location.href = "/login";    
    }, 1000);
    
    dispatch({type: 'LOADING', payload: false});
  } catch (error) {
    console.log('Error submitting the form >>> ', error);
    dispatch({type: 'LOADING', payload: false});
    message.error('Registration failed')
  }
}
