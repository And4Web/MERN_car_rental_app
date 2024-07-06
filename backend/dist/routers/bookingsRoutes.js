"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingsController_1 = require("../controllers/bookingsController");
const router = (0, express_1.Router)();
router.get('/:userId/getallbookings', bookingsController_1.getAllBookings);
exports.default = router;
