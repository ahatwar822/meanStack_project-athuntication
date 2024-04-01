import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";


export const register = async (req, res, next) => {
    const role = await Role.find ({ role : "User" });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new User ({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        userName : req.body.userName,
        email : req.body.email,
        password : hash,
        role: role
    });
    await newUser.save();
    res.send ("user created");
}

export const login = async (req, res, next) => {  
    try{
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(404).send("User not found")
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).send('password is not correct');
        }
        return res.status(200).send("LAgin successful");
    }catch (error){
        return res.status(500).send("something went wrong");
    }
}