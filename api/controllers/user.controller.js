import {CreateError} from "../utils/error.js";
import User from "../models/User.js";
import { CreateSuccess } from "../utils/success.js";

export const getAllusers = async (req, res, next) => {
    try {
        const users = await User.find();
        return next (CreateSuccess(200, "Users found", users));
    } catch (error) {
        return next (CreateError(500, "Internal Server Error"));
    }
}

export const getById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user)
        return next (CreateError(404, "User not found"));
        return next (CreateSuccess(200, "User found", user));
        
    } catch (error) {
        return next (CreateError(500, "Internal Server Error"));
    }
}