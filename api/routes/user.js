import express from "express";
import { getAllusers, getById } from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// get all users
router.get('/', verifyAdmin, getAllusers);

//get user by id
router.get('/:id', verifyUser, getById);

export default router;