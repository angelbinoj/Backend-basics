import express from'express';
import { getCase, addCase, getCaseById, updateCaseById } from "../controllers/caseController.js";
import { authMiddleWare } from '../middlewares/auth.js';
export const caseRouter = express.Router();

//creating case management routes
caseRouter.use(authMiddleWare);
caseRouter.get('/',getCase);
caseRouter.post('/',addCase);
caseRouter.get('/:id',getCaseById);
caseRouter.patch('/:id',updateCaseById);