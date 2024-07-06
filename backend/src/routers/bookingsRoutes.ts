import {Router} from 'express';
import { getAllBookings } from '../controllers/bookingsController';

const router = Router();

router.get('/:userId/getallbookings', getAllBookings);

export default router;