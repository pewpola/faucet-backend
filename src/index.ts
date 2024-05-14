import express, { Request, Response, NextFunction } from 'express';

import morgan from 'morgan';

const app = express();

app.use(morgan("tiny"));
