import {Router} from 'express';
import { getAllCars } from '../controllers/carsControllers';

const router = Router();

router.get('/getallcars', getAllCars);

export default router;