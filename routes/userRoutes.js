import express from'express';
import {getUser, UserRegister, UserLogin, getUserById } from "../controllers/userController.js";
export const userRouter = express.Router();

//creating user authentication routes
userRouter.get('/',getUser);
userRouter.post('/register',UserRegister);
userRouter.post('/login',UserLogin);
userRouter.get('/:id',getUserById);