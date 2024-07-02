import { Request, Response } from "express";

import User from "../models/usersModel";

// login existing user - api/v1/users/login
export const loginUser = async(req:Request, res:Response)=>{
  try {
    const {username, password} = req.body;
    const user = await User.findOne({username, password});

    if(!user) return res.status(404).json({message: "User not found"});

    return res.status(200).json(user);
  } catch (error) {
    console.log('login error >>> ', error);
    return res.status(500).json(error);
  }
}

// Register user - api/v1/users/register
export const registerUser = async (req:Request, res:Response) => {
  try {
    const {username, password, cPassword} = req.body;
    if(password !== cPassword) return res.status(400).json('Passwords don\'t match');

    const newUser = new User({username, password});
    await newUser.save();

    return res.status(200).json('New user registered successfully');
  } catch (error) {
    console.log('New registration error >>> ', error);
    return res.status(500).json(error);
  }
}