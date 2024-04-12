import Role from "../models/Role.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { CreateSuccess } from "../utils/success.js";
import UserToken from "../models/UserToken.js";
import nodemailer from "nodemailer";

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
        roles: role
    });
    await newUser.save();
    return next(CreateSuccess(200, "User created successfully", newUser));
}

export const registerAdmin = async (req, res, next) => {
    
    const role = await Role.find ({});
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = new User ({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        userName : req.body.userName,
        email : req.body.email,
        password : hash,
        isAdmin : true,
        roles: role
    });
    await newUser.save();
    return next(CreateSuccess(200, "Admin created successfully", newUser));
}
export const login = async (req, res, next) => {  
    try{
        const user = await User.findOne({email: req.body.email})
        .populate("roles","role");

        const { roles } = user;
        if (!user) {
            return res.status(404).send("User not found")
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).send('password is not correct');
        }
        const token = Jwt.sign(
            { id: user._id, isAdmin: user.isAdmin, roles:roles},
            process.env.JWT_SECRET
            )
            res.cookie("access_token", token, {httpOnly: true})
            .status(200)
            .json({
                status: 200,
                message: "User logged in successfully",
                data: user
            });
        
    }catch (error){
        return res.status(500).send("something went wrong");
    }
}

export const sendEmail = async (req, res, next) => {
    const email = req.body.email;
    const user = await User.findOne({email: {$regex: '^' + email, $options: 'i'}});
    if (!user) {
        return next (CreateError(404, "User not found"))
    }
    const payload = {
        email: user.email
    }
    const expiryTime = 300;
    const token = Jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: expiryTime});

    const newToken = new UserToken({
        _userId: user._id,
        token: token
    });
    
    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "himanshugaupale875@gmail.com",
            pass: "mhyj ostt xljc jhvm"
        }
    });

    let mailDetails = {
        from: "himanshugaupale875@gmail.com",
        to: email,
        subject: "Reset Password",
        html:`
        <html>
            <head>
                <title>Reset Password</title>
            </head>
            <body>
                <h1>Reset Password Request</h1>
                <p>Dear ${user.firstName},</p>
                <p>Please click the following link to reset your password:</p>
                <a href = ${process.env.LIVE_URL}/reset/${token} > <button style ="background-color: #4CAF50; color: white; padding: 14px 20px; margin: 8px 0; border: none; cursor: pointer; width: 100% border-radius = 4px" >Reset Password</button></a>
                <p> Please note that This link is only vlid for a 5 minutes. If ypou did not request a, plase disregard this massage.</p>
                <p>Thank you,</p>
                <p>Let's Program Team</p>
            </body>
        </html>`,
    };

    mailTransporter.sendMail(mailDetails, async (err, data) => {
        if (err) {
            console.log(err);
            return next (CreateError(500, "sonething went wrong while sending email"))
        }else{
            await newToken.save();
            return next (CreateSuccess(200, "Email sent successfully"))
        }
    })
    };

    export const resetPassword = async (req, res, next) => {
        const token = req.params.token;
        const newPassword = req.body.password;

        Jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
            if (err) {
                return next (CreateError(500, "Reset Link is Expired."))
            }else{
                const response = data;
                const user = await User.findOne({email: {$regex: '^' + response.email, $options: 'i'}});
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(newPassword, salt);
                user.password = hash;
                try {
                    const updatedUser = await user.findOneAndUpdate(
                        {_id: user._id},
                        {$set: user},
                        {new: true}
                    )
                    return next (CreateSuccess(200, "Password reset successfully"))
                } catch (error) {
                    return next (CreateError(500, "something went wrong"))
                }
            }
        })
    }
