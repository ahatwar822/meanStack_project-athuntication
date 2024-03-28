import express from "express";
import mongoose from "mongoose";
import roleRoute from "./routes/role.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use (express.json());

app.use('/api/role', roleRoute);

// app.use('/', (req,res) => {
//     return res.send ("<h1> Welcome to the meanStak </h1>")
// });


// DB connection 
const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");
    }catch(error){
        console.log(error);
    }
}
connectMongoDB();

app.listen (3000, () => {
    console.log("server is running on port 3000");
})