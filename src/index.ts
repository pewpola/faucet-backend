import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { mintAndTransfer } from './Web3Provider.ts'; 
import morgan from 'morgan';

const PORT = parseInt(`${process.env.PORT || 3001}`);

const app = express();

app.use(morgan("tiny"));

app.post("/mint/:wallet", async (req:Request, res: Response, next: NextFunction) => {
    try {
        const tx = await mintAndTransfer(req.params.wallet);
        res.json(tx);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.listen(PORT, () => console.log("Server is listening at " + PORT));
