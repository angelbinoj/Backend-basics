import { Router } from "express";
import { Item } from "../models/itemModel.js";

export const itemRouter=Router();

itemRouter.post('/create',(req,res)=>{
    try {
        const {name,quantity,price}=req.body;
        const item= new Item({ name,quantity,price })
        item.save();
       return res.json({
            success:true, message:'Item added successfully'
        });
    } catch (error) {
        res.status(400).json(error)
    }
})


itemRouter.get('/itemList',async(req,res)=>{
    try {
        const itemList= await Item.find();
        return res.json({
            data:itemList,success:true
        })
    } catch (error) {
        res.status(400).json(error)
    }
})
