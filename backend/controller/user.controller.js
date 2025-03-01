import { User } from "../models/user.model.js";
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from "bcryptjs";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";

//Register
export const register = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "User photo is required" });
  }

  // Check if the photo is valid
  const { photo } = req.files;
  const allowedFormats = ["image/jpeg", "image/png","image/webp"];
  if (!allowedFormats.includes(photo.mimetype)) {
    return res
      .status(400)
      .json({ message: "Invalid photo format. Only jpg and png are allowed" });
  }

  const { email, name, password, phone, education, role } = req.body;
  if (!email || !name || !password || !phone || !education || !role || !photo) {
    return res.status(400).json({ message: "Please fill required fields" });
  }

  // if user already exists
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json({ message: "User already exists with this email" });
  }
  
  // Upload photo to cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(
    photo.tempFilePath
  )
  if(!cloudinaryResponse || cloudinaryResponse.error){
    console.log(cloudinaryResponse.error)
  }

  const hashedPassword = await bcrypt.hash(password,10)
  const newUser = new User({
    email,
    name,
    password: hashedPassword,
    phone,
    education,
    role,
    photo:{
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.url,
    },
  });
  await newUser.save();
  if (newUser) {
    const token = createTokenAndSaveCookies(newUser._id, res)
    res.status(201).json({ message: "User registered successfully",newUser, token: token });
  }
};

