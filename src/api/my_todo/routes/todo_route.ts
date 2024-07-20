import express, { Request, Response, NextFunction } from 'express';
import checkAuth from '../middileware/check_auth';
import { addTodo, deleteTodo, todoList, updateTodo } from "../controllers/todo_controller";

const router = express.Router();

// Middleware type definition
type Middleware = (req: Request, res: Response, next: NextFunction) => void;

// Define route handlers
router.get('/todoList', checkAuth as Middleware, todoList);
router.post('/addTodo', checkAuth as Middleware, addTodo);
router.post('/deleteTodo', checkAuth as Middleware, deleteTodo);
router.post('/updateTodo', checkAuth as Middleware, updateTodo);

export default router;
