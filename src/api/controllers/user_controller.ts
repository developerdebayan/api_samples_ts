import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/User";


interface JwtPayload {
    id: string;
}

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    try {
        let existingUser = await User.findOne({ email: email, password: password });
        if (existingUser != null) {
            const token = jwt.sign({ id: existingUser.id }, "secret", { expiresIn: 60 });
            return res.status(200).json({
                statusCode: 200,
                message: "Login Successful",
                status: 1,
                user: {
                    _id: existingUser.id,
                    name: existingUser.name,
                    email: existingUser.email,
                    token: token
                }
            });
        } else {
            return res.status(200).json({
                statusCode: 200,
                status: 0,
                message: "Invalid email or password"
            });
        }
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            status: 0,
            message: "Internal Server Error"
        });
    }
};

export const register = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password } = req.body;
    try {
        let existingUser = await User.findOne({ email: email });
        if (existingUser != null) {
            return res.status(200).json({
                statusCode: 200,
                status: 0,
                message: "User already exists"
            });
        } else {
            let user = new User({
                name: name,
                email: email,
                password: password
            });
            user = await user.save();
            const token = jwt.sign({ id: user.id }, "secret", { expiresIn: 60 });
            return res.status(201).json({
                statusCode: 201,
                status: 1,
                message: "Registration Successful",
                user: {
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    token: token
                }
            });
        }
    } catch (err) {
        return res.status(500).json({
            statusCode: 500,
            status: 0,
            message: "Internal Server Error"
        });
    }
};
