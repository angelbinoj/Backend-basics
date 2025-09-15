import mongoose, { Schema } from "mongoose";


//creating shema and model

const PostSchema=new mongoose.Schema({
    title:{
        type:String,required:true
    },
    content:{
        type:String,required:true
    }
},{timestamp:true})


export const Post=mongoose.model('Post',PostSchema)