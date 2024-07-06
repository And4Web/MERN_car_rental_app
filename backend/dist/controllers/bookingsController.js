"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBookings = void 0;
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
const getAllBookings = async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await bookingModel_1.default.find({ user: userId });
        // console.log({bookings});
        if (!bookings)
            return res.status(404).json("No bookngs found for this user.");
        return res.status(200).json({ message: "bookings", bookings });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Something went wrong.');
    }
};
exports.getAllBookings = getAllBookings;
