import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();



// DB connection 
const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");
    }catch(error){
        console.log(error);
    }
}


// app.use('/api/login', (req,res) => {
//     return res.send ("<h1> Login successfuly </h1>")
// });

// app.use('/api/register', (req,res) => {
//     return res.send ("<h1> Register successfuly </h1>")
// })

app.use('/', (req,res) => {
    return res.send ("<h1> Welcome to the meanStak </h1>")
})

app.listen (3000, () => {
    console.log("server is running on port 3000");
})