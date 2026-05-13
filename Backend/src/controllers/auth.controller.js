import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateToken from "../utils/tokenGenerator.util.js";

const login = async (req, res, next) => {
    try {
        const { email, password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message : "The user does'nt exsist"
            });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
            return res.status(400).json({
                message : "Invalid credentials"
            })
        }

        const token = generateToken(user);

        res.json({
            message : "Login sucessFull",
            token
        });
    } catch (error) {
        next(error);
    }
}

export { login };