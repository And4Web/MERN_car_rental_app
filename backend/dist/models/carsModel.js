"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const carsSchema = new mongoose_1.default.Schema({});
const Car = mongoose_1.default.model("Car", carsSchema);
exports.default = Car;
