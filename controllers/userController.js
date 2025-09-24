import bcrypt from "bcryptjs";
import { getuserDetailsWithIdService, loginUserService, UserRegisterService } from "../services/userService.js";
import jwt from "jsonwebtoken";
import { NotFoundError, sendSuccess } from "../middlewares/errorMiddlewares.js";
import { User } from "../models/crmModel.js";


//controller to get user list
export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    if(users.length===0){
        throw new NotFoundError("No user found!")
    }
    sendSuccess(res, users);

  } catch (err) {
     res.status(400).json({
            success:false,
            message:"Failed to fetch user list",
            error:err.message
        });
}
};

//userController for creating new user

export const UserRegister =async(req,res)=>{
    try {
        const {username,email, password, role}=req.body;

    console.log(username,email,password,role);

    const newPassword=await bcrypt.hash(password, 12)
    req.body.password=newPassword;

    const response= await UserRegisterService(req.body);

    if(!response.success){
        return res.status(500).json({ success: false, message: "user creation failed!", error: response.error });
    }
     res.status(200).json({ success: true, user: response.user, message: "user created successfully!" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

//usercontroller for getting user profile by id

export const getUserById=async(req,res)=>{
 const user=await getuserDetailsWithIdService(req.params.id)
 sendSuccess(res,{user})
}

//userController for user login

export const UserLogin =async(req,res)=>{
    const {username,password}=req.body;

    const user = await loginUserService(req.body);
    const data = {
        username: user.username,
        email: user.email,
        id: user._id
    }

    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' })

    const response = {
        message: "login successful!",
        user,
        token
    }
    sendSuccess(res, response)
}