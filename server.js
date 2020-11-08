import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authroute from './auth.js';
import Cors from 'cors';

import PostRoute from './Model/Posts.js';


//IMport Routes
const router=authroute

//App Config
dotenv.config();
const app=express();
const port=process.env.PORT || 8001;


//middle wares
app.use(express.json())
app.use(Cors())

//connect to DB

mongoose.connect(process.env.DB_CONNECT,{
useNewUrlParser:true

})


//Route middlewares
app.use('/api/user',router);

app.use('/api/posts',PostRoute)
 


//requests

app.get("/",(req,res)=>{
    res.send("hello from rest")
})





//listing server

app.listen(port,()=>{

    console.log(`server running on ${port}`)
})