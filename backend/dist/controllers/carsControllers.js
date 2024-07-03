"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewCar = exports.getAllCars = void 0;
const carsModel_1 = __importDefault(require("../models/carsModel"));
const getAllCars = async (req, res) => {
    const cars = await carsModel_1.default.find({});
    if (cars.length === 0)
        return res.status(404).json("No Car found at this moment. Try again later.");
    return res.status(200).json(cars);
};
exports.getAllCars = getAllCars;
const addNewCar = async (req, res) => {
    const { name, image, rentPerHour, fuelType, bookedTimeSlots, capacity } = req.body;
    const newCar = await new carsModel_1.default({ name, image, rentPerHour, fuelType, bookedTimeSlots, capacity });
    await newCar.save();
    return res.status(200).json("new Car added to the list");
};
exports.addNewCar = addNewCar;
