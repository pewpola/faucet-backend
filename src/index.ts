import express, { Request, Response, NextFunction } from 'express';

import morgan from 'morgan';

const app = express();

app.use(morgan("tiny"));

app.post("/mint/:wallet", async (req:Request, res: Response, next: NextFunction) => {
    res.json(true);
});

