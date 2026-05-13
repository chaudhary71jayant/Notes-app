import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const signUp = async(req,res) =>{
    try {
        const { name,email,age,password } = req.body;

        const exsistingUser = await User.findOne({email});

        if(exsistingUser){
            return res.status(400).json({
                message : "The email is already registered"
            });
        }

        const hashedpass = await bcrypt.hash(password,10);

        const user = await User.create({
            name,age,email,password:hashedpass
        });

        res.status(201).json({
            message : "User has been created sucessfully"
        })
    } catch (error) {
        res.status(500).json({
            message : error.message
        });
    }
}

const getCurrentUser = async(req,res) => {
    try {
        const user = await User.findById(req.user.id)
        .select("-password");

        res.json(user);
    } catch (error) {
        res.status(501).json({
            message : error.message
        });
    }
}



export { signUp, getCurrentUser };