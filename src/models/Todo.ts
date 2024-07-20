import mongoose, { Schema, Document } from "mongoose";
import {myTodoApi} from "../server";

// Define the interface for the Todo document
interface ITodo extends Document {
    userId: string;
    title: string;
    description: string;
    dateTime: string;
    priority: string;
}

// Define the schema for the Todo model
const todoSchema: Schema<ITodo> = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateTime: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    }
});

// Create and export the Todo model using the connection
const Todo = myTodoApi.model<ITodo>("Todo", todoSchema);

export default Todo;
