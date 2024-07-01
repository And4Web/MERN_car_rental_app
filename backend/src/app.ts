import express, { Request, Response } from 'express';
import {config} from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

config();

import carsRouter from './routers/carsRoutes';

// Mongo DB cloud
// mongoose.connect(process.env.mongoDB_uri as string).then(()=>console.log("MongoDB connection successfull to the Cloud.")).catch(error=>console.log(`MongoDB connection failed: ${error}`));

// Mongo DB local
mongoose.connect(process.env.mongoDB_local as string).then(()=>console.groupCollapsed("MongoDB connection successfull to Local.")).catch((error)=>console.log(`MongoDB connection failed: ${error}`))

const app = express();
const PORT = process.env.PORT || 5500;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.get('/', (req:Request, res:Response)=>{
  res.send(`Server running at PORT: ${PORT}. This server contains sensitive information. BE RESPONSIBLE.`)
})


// routes
app.use("api/v1/cars", carsRouter);
// app.use("api/v1/user", usersRouter);
// app.use("api/v1/auth", authRouter);

app.listen(PORT, ()=>console.log(`server running on PORT: ${PORT}`))