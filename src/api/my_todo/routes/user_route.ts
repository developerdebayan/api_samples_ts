import express, { Request, Response, NextFunction } from 'express';
import { login, register, userDetails } from "../controllers/user_controller";
import checkAuth from "../middileware/check_auth";

const router = express.Router();

// Middleware type definition
type Middleware = (req: Request, res: Response, next: NextFunction) => void;

router.post("/register", register);

router.post("/login", login);

router.get("/userDetails", checkAuth as Middleware, userDetails);

export default router;
