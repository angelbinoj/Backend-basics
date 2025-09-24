import express from'express';
import { authMiddleWare } from '../middlewares/auth.js';
import { getCustomer, addCustomer, getCustomerById, updateCustomerById,deleteCustomer } from "../controllers/customerController.js";
export const customerRouter = express.Router();

//creating customer management routes

customerRouter.use(authMiddleWare);
customerRouter.get('/',getCustomer);
customerRouter.post('/', addCustomer);
customerRouter.get('/:id',getCustomerById);
customerRouter.patch('/:id', updateCustomerById);
customerRouter.delete('/:id', deleteCustomer);