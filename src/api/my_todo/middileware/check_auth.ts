import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import UserModel from '../../../models/User';

// Extend Express Request interface
declare global {
    namespace Express {
        interface Request {
            userId?: string; // Extend the Request interface with userId
        }
    }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                statusCode: 401,
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(token, "secret") as { id: string };
        const id = decoded.id;
        const existingUser = await UserModel.findOne({ _id: new ObjectId(id) });

        if (existingUser) {
            req.userId = existingUser.id;
            next();
        } else {
            return res.status(403).json({
                statusCode: 403,
                message: "User not found"
            });
        }
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                statusCode: 401,
                message: err.message
            });
        } else {
            return res.status(403).json({
                statusCode: 403,
                message: err.message
            });
        }
    }
};

export default authMiddleware;
