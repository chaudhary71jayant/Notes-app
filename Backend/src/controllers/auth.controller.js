import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/tokenGenerator.util.js";

const isProduction = process.env.NODE_ENV === "production";
const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    // "none" is required when the frontend and API are hosted on different sites.
    // Locally, secure cookies cannot be set over normal http://localhost.
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

const clearCookieOptions = {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
};

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

        res.cookie("token", token, cookieOptions);

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
        res.clearCookie("token", clearCookieOptions);

        res.status(200).json({ success : true, message : "Logout Successfully"});
    } catch (error) {
        next(error);
    }
}

export { login, logout };
