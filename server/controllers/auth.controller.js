import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {User} from "../models/user.models.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    console.log(req.body.password)
    const hashedpassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({username,email,password:hashedpassword})
    if(!username || !password || !email){
        throw new ApiError(400,"All fields are required")
    }
    const existedUser = await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiResponse(409,"User already exists")
    }
    await newUser.save()
    res.status(201).json(new ApiResponse(200,"User Registered Successfully"))
})

export const signin = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const validUser = await User.findOne({email})
    if(!validUser){
        throw new ApiError(404,"User not found")
    }
    const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
    const {password:pass,...rest} = validUser._doc
    res
    .cookie('access_token',token,{httpOnly:true})
    .status(200)
    .json(new ApiResponse(200,rest,"User logged in successfully"))
})

export const signout = asyncHandler(async(req,res)=>{
    try {
        res.clearCookie('access_token')
        res.status(200).json(new ApiResponse(200,"User logged out successfully"))
    } catch (error) {
        throw new ApiError(500,error.message)
    }
})