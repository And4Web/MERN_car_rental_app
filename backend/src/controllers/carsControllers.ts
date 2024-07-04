import { Request, Response } from "express";
import Car from "../models/carsModel";
import Booking from "../models/bookingModel";

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

export const bookCar = async(req:Request, res:Response)=>{
  try {
    req.body.transactionId = "1234";
    const obj = req.body;

    const newBooking = await new Booking(obj);

    await newBooking.save();

    const car = await Car.findOne({_id: obj.car});

    const newSlot = {...obj.bookedTimeSlots, user: obj.user};
    car?.bookedTimeSlots.push(newSlot);

    await car?.save()

    return res.status(200).json('Booking Successfull.')
  } catch (error) {
    console.log(error);
    return res.status(500).json('Bookng failed.')
  }

}