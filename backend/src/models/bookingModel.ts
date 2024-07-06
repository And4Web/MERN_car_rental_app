import mongoose from 'mongoose';
import { CarType, UserType } from '../types';

export type BookingType = {
  car: CarType;
  user: UserType;
  bookedTimeSlots: {
    from: string;
    to: string;
  },
  totalHours: number;
  totalCost: number;
  carRent: number;
  driverRequired: boolean;
  driverRent: number;
  transactionId: string;
}

const bookingSchema = new mongoose.Schema<BookingType>({
  car: {type: mongoose.Schema.Types.ObjectId, ref: "cars", required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
  bookedTimeSlots: {from: {type: String, required: true}, to: {type: String, required: true}},
  totalHours: {type: Number, required: true},
  totalCost: {type: Number, required: true},
  driverRequired: {type: Boolean, default: false},
  carRent: {type: Number, required: true},
  driverRent: {type: Number},
  transactionId: {type: String},
}, {timestamps: true});


const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;