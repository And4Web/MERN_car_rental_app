import {Router} from 'express';
import { addNewCar, bookCar, getAllCars } from '../controllers/carsControllers';

const router = Router();

router.get('/getallcars', getAllCars);
router.post('/addnewcar', addNewCar);
router.post('/bookcar', bookCar);

export default router;