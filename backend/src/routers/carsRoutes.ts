import {Router} from 'express';
import { addNewCar, bookCar, createCarBooking, createPaymentIntent, getAllCars } from '../controllers/carsControllers';

const router = Router();

router.get('/getallcars', getAllCars);
router.post('/addnewcar', addNewCar);

// router.post('/:carId/payment-intent', createPaymentIntent);
// router.post('/:carId/booking', createCarBooking);

router.post('/bookcar', bookCar);


// router.post('/:carId/booking', createBooking);

export default router;