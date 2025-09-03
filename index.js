import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDatabase.js';
import { itemRouter } from './routes/itemRouter.js';

dotenv.config();
connectDB()

const app=express();
app.use((express.json()));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.get("/",(req,res)=>{
  res.end("Inventory API is Running");
});

app.get("/health",(req,res)=>{
  res.end(JSON.stringify({success : true, message: "Server is healthy and running"}));
});

app.use('/api/item',itemRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`);
    
})

