import express from "express";
import {login, register} from "../controllers/user_controller";


const router = express.Router();

/**
 * @swagger
 * users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: DC
 *               email:
 *                 type: string
 *                 example: debayan1@gmail.com
 *               password:
 *                 type: string
 *                 example: 123245
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Registration Successful
 *                 status:
 *                   type: integer
 *                   example: 1
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 669ba06710c368c2dfce8199
 *                     name:
 *                       type: string
 *                       example: DC
 *                     email:
 *                       type: string
 *                       example: debayan1@gmail.com
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWJhMDY3MTBjMzY4YzJkZmNlODE5OSIsImlhdCI6MTcyMTQ3NTE3NSwiZXhwIjoxNzIxNDc4Nzc1fQ.8seoznSKfu_lVGBaakrAIWN-NGshw1OEtPdlRjzkutM
 *
 *
 */
router.post("/register", register);

/**
 * @swagger
 * users/login:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User login details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: debayan@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Login Successful
 *                 status:
 *                   type: integer
 *                   example: 1
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 669b77c0e48323c3fd6d3dfe
 *                     name:
 *                       type: string
 *                       example: Debayan Chowdhury
 *                     email:
 *                       type: string
 *                       example: debayan@gmail.com
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWI3N2MwZTQ4MzIzYzNmZDZkM2RmZSIsImlhdCI6MTcyMTQ3NDAxMiwiZXhwIjoxNzIxNDc3NjEyfQ.p_-ws7DklVGSVMMRuzjg-__7uio0FS0Rsz_os6ZpaFA
 *
 */
router.post("/login", login);

export default router;
