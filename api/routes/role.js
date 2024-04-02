import express from "express";

import { createRole, deleteRole, rolls, updateRole } from "../controllers/role.controller.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// create a new role in DB
router.post ('/create', verifyAdmin, createRole);

//update role in DB 
router.put ('/update/:id', verifyAdmin, updateRole);

// get all the role from DB
router.get ('/getAll', rolls);


// delete role from DB
router.delete ('/delete/:id', deleteRole);

export default router;