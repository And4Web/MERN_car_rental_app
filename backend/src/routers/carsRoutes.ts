import {Router} from 'express';
import { addNewCar, getAllCars } from '../controllers/carsControllers';

const router = Router();

router.get('/getallcars', getAllCars);
router.post('/addnewcar', addNewCar);

export default router;