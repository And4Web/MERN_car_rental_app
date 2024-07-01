import {Router} from 'express';
import { getAllCars } from '../controllers/carsControllers';

const router = Router();

router.get('/getAllCars', getAllCars);

export default router;