import { Request, Response } from "express";
import Car from "../models/carsModel";

export const getAllCars = async(req:Request, res:Response) => {
  const cars = await Car.find({});

  if(cars.length === 0) return res.status(404).json("No Car found at this moment. Try again later.")

  return res.status(200).json(cars);
}

export const addNewCar = async (req:Request, res:Response)=>{
  const {name, image, rentPerHour, fuelType, bookedTimeSlots, capacity} = req.body;
  const newCar = await new Car({name, image, rentPerHour, fuelType, bookedTimeSlots, capacity});

  await newCar.save();

  return res.status(200).json("new Car added to the list");
}