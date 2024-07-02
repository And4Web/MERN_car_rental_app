"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const usersModel_1 = __importDefault(require("../models/usersModel"));
// login existing user - api/v1/users/login
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await usersModel_1.default.findOne({ username, password });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        return res.status(200).json(user);
    }
    catch (error) {
        console.log('login error >>> ', error);
        return res.status(500).json(error);
    }
};
exports.loginUser = loginUser;
// Register user - api/v1/users/register
const registerUser = async (req, res) => {
    try {
        const { username, password, cPassword } = req.body;
        if (password !== cPassword)
            return res.status(400).json('Passwords don\'t match');
        const newUser = new usersModel_1.default({ username, password });
        await newUser.save();
        return res.status(200).json('New user registered successfully');
    }
    catch (error) {
        console.log('New registration error >>> ', error);
        return res.status(500).json(error);
    }
};
exports.registerUser = registerUser;
