import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ statusCode: 401, status: 0, message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, "secret") as jwt.JwtPayload;

        const newToken = jwt.sign(
            {
                id: decoded.id,
            },
            "secret",
            { expiresIn: 60 }
        );

        res.status(200).json({ statusCode: 200, status: 1, token: newToken });
    } catch (error) {
        res.status(401).json({ statusCode: 401, status: 0, message: "Invalid token" });
    }
};
