import mongoose from "mongoose"


export const connectDB= ()=>{
    try {
         mongoose.connect(process.env.MONGODB_URL).then((res)=>{
        console.log("database connected",res);
        }).catch((err)=>{
console.log("database connection failed",err);
        })
    } catch (error) {
        console.log(error);
        
    }
}