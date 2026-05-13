import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const signUp = async(req,res,next) =>{
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
        next(error);
    }
}

const getCurrentUser = async(req,res,next) => {
    try {
        const user = await User.findById(req.user.id)
        .select("-password");

        res.json(user);
    } catch (error) {
        next(error);
    }
}

const updateUser = async(req,res,next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new : true,
                runValidators : true
            }
        )

        if(!updatedUser){
            return res.status(404).json({
                message :"User not found"
            });
        }

        res.status(200).json({
            message : "User updated successfully"
        });

        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
}

const delteUser = async(req,res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(
           req.params.id
        );

        if(!deletedUser){
            return res.status(404).json({
                message : "User not found"
            });
        }

        res.status(200).json({
            message : "User deleted sucessfully"
        });
    } catch (error) {
       next(error); 
    }
}



export { signUp, getCurrentUser, updateUser, delteUser };