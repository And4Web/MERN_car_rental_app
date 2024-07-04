import mongoose from "mongoose";
import { CarType } from "../types";

const carsSchema = new mongoose.Schema({
  name: {type: String, required: true},
  image: {type: String, required: true},
  capacity: {type: Number, required: true},
  displacement: {type: Number, required: true},
  power: {type: Number, required: true},
  torque: {type: Number, required: true},
  fuelType: {type: String, required: true},
  bookedTimeSlots:[
    {
      from:{type: String, required: true},
      to: {type: String, required: true},
      user: {type: String, required: true}
    }
  ],
  rentPerHour: {type: Number, required: true}
}, {timestamps: true});

const Car = mongoose.model<CarType>("Car", carsSchema);

export default Car;