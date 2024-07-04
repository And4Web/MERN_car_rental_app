"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const carsSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    capacity: { type: Number, required: true },
    displacement: { type: Number, required: true },
    power: { type: Number, required: true },
    torque: { type: Number, required: true },
    fuelType: { type: String, required: true },
    bookedTimeSlots: [
        {
            from: { type: String, required: true },
            to: { type: String, required: true },
            user: { type: String, required: true }
        }
    ],
    rentPerHour: { type: Number, required: true }
}, { timestamps: true });
const Car = mongoose_1.default.model("Car", carsSchema);
exports.default = Car;
