import express from 'express';
const app=express();

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

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(3000,()=>{
    console.log(`Server is running on http://localhost:3000`);
    
})

// const http = require('http')

// const server =http.createServer((req,res)=>{
//     res.end('hello world')
//     console.log('helo world');
    
// })

// server.listen(3000,()=>{
//     console.log("app is running....");
    
// })
