import express from "express";
const router = express.Router();

import { refreshToken } from "../controllers/token_controller";

router.get("/refreshToken", refreshToken);

export default router;
