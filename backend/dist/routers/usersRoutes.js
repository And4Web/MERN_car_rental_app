"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const router = (0, express_1.Router)();
router.post('/login', usersController_1.loginUser);
router.post('/register', usersController_1.registerUser);
exports.default = router;
