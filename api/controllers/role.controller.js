import Role from '../models/Role.js';

export const createRole = async (req, res, next) => {
    try {
        if (req.body.role && req.body.role !== '') {
            const newRole = new Role (req.body);
            await newRole.save();
            return res.send ("Role created successfully");
        }else {
            return res.status(400).send ("Bad Request");
        }
    } catch (error) {
        return res.status(500).send ("Internal Server Error");
    }
}

export const updateRole = async (req, res, next) => {
    try {
        const role = await Role.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (role) {
            return res.send (role);
        }else {
            return res.status(404).send ("Role not found");
        }
    } catch (error) {
        return res.status(500).send ("Internal Server Error");
    }
}

export const rolls = async (req, res, next) => {
    try {
        const roles = await Role.find();
        if (roles) {
            return res.send (roles);
        }else {
            return res.status(404).send ("Roles not found");
        }
    } catch (error) {
        return res.status(500).send ("Internal Server Error");
    }
}


export const deleteRole = async (req, res, next) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (role) {
            return res.send ("Role deleted successfully");
        }else {
            return res.status(404).send ("Role not found");
        }
    } catch (error) {
        return res.status(500).send ("Internal Server Error");
    }
}