import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cors from 'cors';
import testRoute from './route/testRoute.js'
import authRoute from './route/authroute.js'
import { tagRouter } from './route/tagroute.js';
import { contentRouter } from './route/contentRoute.js';
import { favRoute } from './route/favRoute.js';
const app=express();
dotenv.config();

connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/test',testRoute);
app.use('/api/auth',authRoute);
app.use('/api',tagRouter);
app.use('/api',contentRouter);
app.use('/api',favRoute);
app.use('/api',favRoute);

app.listen(process.env.PORT,()=>{
    console.log(`server is listening at ${process.env.PORT}`);
})