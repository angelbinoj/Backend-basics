import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDatabase.js';
import { userRouter } from './routes/userRoutes.js';
import { customerRouter } from './routes/customerRoutes.js';
import { caseRouter } from './routes/caseRoutes.js';
import { globalErrorHandler } from './middlewares/errorMiddlewares.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB()

const app=express();
app.use((express.json()));
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173", credentials:true}));

app.use('/',(req,res)=>{
    res.send("<h1>Welcome to User API</h1>");
})

app.use('/api/user',userRouter);
app.use('/api/customer',customerRouter);
app.use('/api/case',caseRouter);

app.use(globalErrorHandler)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`);
    
})

