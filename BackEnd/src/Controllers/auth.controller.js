import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import { User } from "../Models/user.modal.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
console.log(req.body);

  try {
    const existemail = await User.findOne({ email });

    if (!email || !password || !fullName)
      return res.status(400).send("All fields are mandatory");

    if (existemail) {
      return res.status(400).send("email already exists");
    }
    if (password?.length < 6) {
      return res.status(400).send("mininmum password length should be 6");
    }
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    if (newUser) {
      generateToken(newUser._id, res);

      res.status(201).send({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    }
  } catch (err) {
    res.status(500).send("internal server error")
    console.log("signup error", err);
  }
};

export const login = async(req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("user not found");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) return res.status(400).send("invalid credentials");
  
     generateToken(user._id,res)

     res.status(200).send({
       id: user._id,
       fullName:user.fullName,
       email:user.email,
       profilePic:user.profilePic
     })

  } catch (error) {
    res.status(500).send("internal server error")
    console.log("login error", error);
  }
 
};

export const logout = (req, res) => {
    try {
        res.cookie("token","")
        res.status(200).send("logout syccess")
    } catch (error) {
        res.status(500).send("internal sever error")
    }
};

export const updateProfile=async(req, res)=>{
try {
    const {profilePic} = req.body;
    const userId = req.user._id;
    if(!profilePic){
        return res.status(401).send("profile pic is required");
    }
    const uploadRespons = await cloudinary.uploader.upload(profilePic);
    console.log(uploadRespons,"res");
    
    const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadRespons.secure_url},{new:true}).lean()

    res.status(200).json(updatedUser);

} catch (error) {
    res.status(500).send("internal sever error")
    console.log(error);
    
}
}

export const checkAuth=async(req, res)=>{
    try {
       res.status(200).json(req.user) 
    } catch (error) {
        res.status(500).send("internal sever error")
    }
}