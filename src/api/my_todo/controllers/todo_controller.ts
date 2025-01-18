import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import User from "../../../models/User";
import Todo from "../../../models/Todo";

// Get the list of todos for a user
export const todoList = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.userId as string; // Type assertion for userId

  try {
    const user = await User.findOne({ _id: new ObjectId(id) });
    if (user) {
      const list = await Todo.find({ userId: user.id }).select({
        title: 1,
        description: 1,
        dateTime: 1,
        priority: 1,
      });
      return res.status(200).json({
        statusCode: 200,
        status: 1,
        message: "",
        data: list,
      });
    } else {
      return res.status(200).json({
        statusCode: 200,
        status: 0,
        message: "Operation failed",
      });
    }
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      status: 0,
      message: "Internal Server Error",
    });
  }
};

export const todoDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.userId as string; // Type assertion for userId
  const todoId: string = req.params.id; // Extract todoId from request parameters

  try {
    const user = await User.findOne({ _id: new ObjectId(id) });
    if (user) {
      const data = await Todo.findOne({
        _id: new ObjectId(todoId),
        userId: user.id,
      });
      return res.status(200).json({
        statusCode: 200,
        status: 1,
        message: "",
        data: {
          _id: data?._id,
          title: data?.title,
          description: data?.description,
          dateTime: data?.dateTime,
          priority: data?.priority,
        },
      });
    } else {
      return res.status(200).json({
        statusCode: 200,
        status: 0,
        message: "Operation failed",
      });
    }
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      status: 0,
      message: "Internal Server Error",
    });
  }
};

// Add a new todo for a user
export const addTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.userId as string; // Type assertion for userId
  const { title, description, dateTime, priority } = req.body;

  try {
    const user = await User.findOne({ _id: new ObjectId(id) });
    if (user) {
      const todo = new Todo({
        userId: user.id,
        title,
        description,
        dateTime,
        priority,
      });
      const savedTodo = await todo.save();
      return res.status(200).json({
        statusCode: 200,
        status: 1,
        message: "Added successfully",
        data: {
          _id: savedTodo.id,
          title: savedTodo.title,
          description: savedTodo.description,
          dateTime: savedTodo.dateTime,
          priority: savedTodo.priority,
        },
      });
    } else {
      return res.status(200).json({
        statusCode: 200,
        status: 0,
        message: "Operation failed",
      });
    }
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      status: 0,
      message: "Internal Server Error",
    });
  }
};

// Delete a todo for a user
export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.userId as string; // Type assertion for userId
  const { todoId } = req.body;

  try {
    const user = await User.findOne({ _id: new ObjectId(id) });
    if (user) {
      const result = await Todo.deleteOne({
        _id: new ObjectId(todoId),
        userId: user.id,
      });
      if (result.deletedCount === 1) {
        return res.status(200).json({
          statusCode: 200,
          status: 1,
          message: "Deleted successfully",
        });
      } else {
        return res.status(200).json({
          statusCode: 200,
          status: 0,
          message: "Operation failed",
        });
      }
    } else {
      return res.status(200).json({
        statusCode: 200,
        status: 0,
        message: "Operation failed",
      });
    }
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      status: 0,
      message: "Internal Server Error",
    });
  }
};

// Update a todo for a user
export const updateTodo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.userId as string; // Type assertion for userId
  const { todoId, title, description, dateTime, priority } = req.body;

  try {
    const user = await User.findOne({ _id: new ObjectId(id) });
    if (user) {
      const todo = await Todo.findOne({
        _id: new ObjectId(todoId),
        userId: user.id,
      });

      if (todo) {
        todo.title = title;
        todo.description = description;
        todo.dateTime = dateTime;
        todo.priority = priority;

        const updatedTodo = await todo.save();

        return res.status(200).json({
          statusCode: 200,
          status: 1,
          message: "Updated successfully",
          data: {
            _id: updatedTodo.id,
            title: updatedTodo.title,
            description: updatedTodo.description,
            dateTime: updatedTodo.dateTime,
            priority: updatedTodo.priority,
          },
        });
      } else {
        return res.status(200).json({
          statusCode: 200,
          status: 0,
          message: "Operation failed",
        });
      }
    } else {
      return res.status(200).json({
        statusCode: 200,
        status: 0,
        message: "Operation failed",
      });
    }
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      status: 0,
      message: "Internal Server Error",
    });
  }
};
