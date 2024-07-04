"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carsControllers_1 = require("../controllers/carsControllers");
const router = (0, express_1.Router)();
router.get('/getallcars', carsControllers_1.getAllCars);
router.post('/addnewcar', carsControllers_1.addNewCar);
router.post('/bookcar', carsControllers_1.bookCar);
exports.default = router;
