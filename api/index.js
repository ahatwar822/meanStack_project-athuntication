import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import roleRoute from "./routes/role.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();

app.use (express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}))
app.use('/api/role', roleRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

// Response handler middleware
app.use ((obj, req, res, next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went wrong!";
    return res.status(statusCode).json({
        success: [200,201,204].some(a => a === obj.status)? true : false,
        status: statusCode,
        message: message,
        stack: obj.data
    });
});

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