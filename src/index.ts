import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { mintAndTransfer } from './Web3Provider.ts'; 
import morgan from 'morgan';
dotenv.config();

const PORT = parseInt(`${process.env.PORT || 3001}`);

const app = express();

app.use(morgan("tiny"));
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*"
}));

const nextMint = new Map<string, number>();

app.post("/mint/:wallet", async (req:Request, res: Response, next: NextFunction) => {
    const wallet = req.params.wallet;
    
    if(nextMint.has(wallet) && nextMint.get(wallet)! > Date.now())
        return res.status(400).json(`Try again tomorrow.`);

    try {
        const tx = await mintAndTransfer(wallet);
        res.json(tx);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

    nextMint.set(wallet, Date.now() + (1000 * 60 * 60 * 24));
});

app.listen(PORT, () => console.log("Server is listening at " + PORT));
