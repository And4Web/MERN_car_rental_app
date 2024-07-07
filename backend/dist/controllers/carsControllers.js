"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleCar = exports.bookCar = exports.addNewCar = exports.getAllCars = void 0;
const carsModel_1 = __importDefault(require("../models/carsModel"));
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
const stripe_1 = __importDefault(require("stripe"));
const uuid_1 = require("uuid");
const stripe = new stripe_1.default(process.env.STRIPE_API_KEY);
const getAllCars = async (req, res) => {
    const cars = await carsModel_1.default.find({});
    if (cars.length === 0)
        return res
            .status(404)
            .json("No Car found at this moment. Try again later.");
    return res.status(200).json(cars);
};
exports.getAllCars = getAllCars;
const addNewCar = async (req, res) => {
    try {
        const { name, image, rentPerHour, fuelType, bookedTimeSlots, capacity, power, torque, displacement, } = req.body;
        const newCar = await new carsModel_1.default({
            name,
            image,
            rentPerHour,
            fuelType,
            bookedTimeSlots,
            capacity,
            power,
            torque,
            displacement,
        });
        await newCar.save();
        return res.status(200).json("new Car added to the list");
    }
    catch (error) {
        console.log("Failed adding new car.");
        return res.status(500).json("Something went wrong");
    }
};
exports.addNewCar = addNewCar;
const bookCar = async (req, res) => {
    try {
        const { token, car, user, totalHours, totalCost, driverRent, driverRequired, bookedTimeSlots, carRent, } = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });
        const payment = await stripe.charges.create({
            amount: totalCost * 100,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
            metadata: {
                userId: user,
                carId: car,
            },
        }, {
            idempotencyKey: (0, uuid_1.v4)(),
        });
        if (payment) {
            const newBookingObj = {
                car,
                user,
                totalCost,
                totalHours,
                driverRent,
                driverRequired,
                bookedTimeSlots,
                carRent,
                transactionId: payment.source.id,
            };
            const newBooking = await new bookingModel_1.default(newBookingObj);
            await newBooking.save();
            const currentCar = await carsModel_1.default.findOne({ _id: newBookingObj.car });
            const newSlot = {
                ...newBookingObj.bookedTimeSlots,
                user: newBookingObj.user,
                transationId: newBookingObj.transactionId,
            };
            currentCar?.bookedTimeSlots.push(newSlot);
            await currentCar?.save();
            return res
                .status(200)
                .json({ message: "Booking Successfull.", booking: newBookingObj });
        }
        else {
            return res.status(500).json("Booking failed.");
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json("Booking failed.");
    }
};
exports.bookCar = bookCar;
// export const createPaymentIntent = async(req:Request, res: Response) => {
//   const {car, user, totalCost} = req.body;
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: totalCost*100,
//     currency: 'inr',
//     metadata: {
//       userId: user,
//       carId: car
//     }
//   })
//   if(!paymentIntent.client_secret) return res.status(500).json("Something went wrong with payment intent.")
//   const response:PaymentIntentResponse = {
//     paymentIntentId: paymentIntent.id,
//     clientSecret: paymentIntent.client_secret,
//     totalCost
//   }
//   return res.status(200).json({response});
// }
// export const createCarBooking = async (req:Request, res:Response) => {
//   try {
//     const {clientSecret, paymentIntentId} = req.body;
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string);
//     if(!paymentIntent) return res.status(400).json({message: "Payment intent not found."})
//     if(paymentIntent.metadata.carId !== req.params.carId ) return res.status(400).json({mesasge: "Payment intent mismatch."})
//     if(paymentIntent.status !== "succeeded") return res.status(500).json({message: `Payment failed, Status: ${paymentIntent.status}`})
//     const newBooking = await new Booking({})
//   } catch (error) {
//     console.log("Error >>> ", error);
//     return res.status(500).json(`Something went wrong while booking`);
//   }
// }
const getSingleCar = async (req, res) => {
    try {
        const { carId } = req.params;
        const car = await carsModel_1.default.findOne({ _id: carId });
        if (!car)
            return res.status(404).json("No car found.");
        return res.status(200).json({ car });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error?.message);
    }
};
exports.getSingleCar = getSingleCar;
