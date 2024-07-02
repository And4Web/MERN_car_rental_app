import mongoose from "mongoose";
import { UserType } from "../types";

const usersSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},

  
}, {timestamps: true});

const User = mongoose.model<UserType>("User", usersSchema);

export default User;