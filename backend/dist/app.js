"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
(0, dotenv_1.config)();
const carsRoutes_1 = __importDefault(require("./routers/carsRoutes"));
const usersRoutes_1 = __importDefault(require("./routers/usersRoutes"));
const bookingsRoutes_1 = __importDefault(require("./routers/bookingsRoutes"));
// Mongo DB cloud
// mongoose.connect(process.env.mongoDB_uri as string).then(()=>console.log("MongoDB connection successfull to the Cloud.")).catch(error=>console.log(`MongoDB connection failed: ${error}`));
// Mongo DB local
mongoose_1.default.connect(process.env.mongoDB_local).then(() => console.groupCollapsed("MongoDB connection successfull to Local.")).catch((error) => console.log(`MongoDB connection failed: ${error}`));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5500;
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send(`Server running at PORT: ${PORT}. This server contains sensitive information. BE RESPONSIBLE.`);
});
// routes
app.use("/api/v1/cars", carsRoutes_1.default);
app.use("/api/v1/users", usersRoutes_1.default);
app.use('/api/v1/bookings', bookingsRoutes_1.default);
// app.use("api/v1/auth", authRouter);
app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`));
