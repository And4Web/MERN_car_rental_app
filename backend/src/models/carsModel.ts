import mongoose from "mongoose";

const carsSchema = new mongoose.Schema({
  
});

const Car = mongoose.model("Car", carsSchema);

export default Car;