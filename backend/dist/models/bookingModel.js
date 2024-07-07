"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    car: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Car", required: true },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    bookedTimeSlots: { from: { type: String, required: true }, to: { type: String, required: true } },
    totalHours: { type: Number, required: true },
    totalCost: { type: Number, required: true },
    driverRequired: { type: Boolean, default: false },
    carRent: { type: Number, required: true },
    driverRent: { type: Number },
    transactionId: { type: String },
}, { timestamps: true });
const Booking = mongoose_1.default.model('Booking', bookingSchema);
exports.default = Booking;
