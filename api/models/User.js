import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: false, default: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png" },
    isAdmin: { type: Boolean, required: true, default: false },
    
    //will add role
    roles:{
        type: [Schema.Types.ObjectId],
        ref: "Role",
        required: true
    }
    },
    { 
        timestamps: true 
    }
);

export default mongoose.model("User", userSchema);