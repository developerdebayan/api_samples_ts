import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const myTodoApi = mongoose.createConnection(process.env.MY_TODO_URL as string);

