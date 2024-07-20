import mongoose, { Schema, Document } from "mongoose";
import {myTodoApi} from "../server";


interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

const User = myTodoApi.model<IUser>("User", userSchema);

export default User;
