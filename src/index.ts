import express, { Request, Response, NextFunction } from 'express';


const app = express();
const port = process.env.PORT || 3000;



// Routes
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
