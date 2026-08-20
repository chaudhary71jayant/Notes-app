import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateToken from "../utils/tokenGenerator.util.js";

const login = async (req, res, next) => {
    try {
        const { email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                success : false,
                message : "email and password are required"
            });
        }

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

        res.cookie("token", token,{
            httpOnly : true,
            secure : true,
            sameSite : "lax",
            maxAge : 7*24*60*60*1000,
        });

        res.status(200).json({
            success : true,
            user : {
                id : user._id,
                name : user.name,
                email : user.email,
            }
        });
    } catch (error) {
        next(error);
    }
}

const logout = async ( req, res, next) => {
    try {
        res.clearCookies("token", {
            httpOnly : true,
            secure : true,
            sameSite : "lax",
        });

        res.status(200).json({ success : true, message : "Logout Successfully"});
    } catch (error) {
        next(error);
    }
}

export { login, logout };