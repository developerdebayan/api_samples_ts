import express, {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import UserRouter from "./api/routes/user_route"
import TodoRouter from "./api/routes/todo_route"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use("/check", (req: Request, res: Response) => {
    res.status(200).json({
        status: 1,
    });
});

app.use("/users", UserRouter);
app.use("/todo", TodoRouter);
// app.use("/auth", TokenRoute);
//
// app.use("/stripe", StripeRouter);
//
// app.use("/plaid", PlaidRouter);
//
// app.use("/tmdb", TmdbRouter);
//
// app.use("/apiMethods", ApiMethodsRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    const error: any = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error: any, req: Request, res: Response) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

mongoose
    .connect(process.env.MONGODB_URL as string)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Listening to port " + PORT);
        });
    })
    .catch((err: Error) => {
        console.log(err);
    });
