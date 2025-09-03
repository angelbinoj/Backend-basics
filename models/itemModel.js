import mongoose, { Schema } from "mongoose";


const ItemSchema= Schema({
    name:{
        type:String,required:true
    },
    quantity:{
        type:Number,required:true
    },
    price:{
        type:Number,required:true
    }
},{timestamp:true})


export const Item=mongoose.model('Item',ItemSchema)