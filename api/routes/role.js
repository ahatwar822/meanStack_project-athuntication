import express from "express";

import { createRole, deleteRole, rolls, updateRole } from "../controllers/role.controller.js";

const router = express.Router();

// create a new role in DB
router.post ('/create', createRole);

//update role in DB 
router.put ('/update/:id', updateRole);

// get all the role from DB
router.get ('/getAll', rolls);


// delete role from DB
router.delete ('/delete/:id', deleteRole);

export default router;