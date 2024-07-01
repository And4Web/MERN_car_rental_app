import { Request, Response } from "express";

export const getAllCars = async(req:Request, res:Response) => {
  res.send("getting all cars")
}