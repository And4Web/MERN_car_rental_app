import { Request, Response } from "express";
import Booking from "../models/bookingModel";

export const getAllBookings = async (req:Request, res: Response) => {
  try {
    const {userId} = req.params;
    const bookings = await Booking.find({user: userId});

    // console.log({bookings});

    if(!bookings) return res.status(404).json("No bookngs found for this user.")

    return res.status(200).json({message: "bookings", bookings});

  } catch (error) {
    console.log(error)
    return res.status(500).json('Something went wrong.')
  }
}