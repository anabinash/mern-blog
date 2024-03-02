import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import  jwt  from "jsonwebtoken";

export const signup=async(req,resp,next)=>{
     const{username,email,password}=req.body;
     if(!username||!password||!email || username===''||password===''||email===''){
        //  return resp.status(400).json({message:"All field are required!!"});
        next(errorHandler(400,"All fields are required!"))
     }
     const hashedPassword=bcryptjs.hashSync(password,10);
     const newUser=new User({username,password:hashedPassword,email});
     try{
     await newUser.save();
     resp.json({message:"signup successfull!!"});
     }
     catch(error){
        next(error);
     }
};

export const signin=async(req,resp,next)=>{
      const{email,password}=req.body;
      const validUser =await User.findOne({email});
      if( !password || !email || password===""||email===""){
         return next(errorHandler(400,"Fill the All field !"))
      }

      try{
          if(!validUser){
            return next(errorHandler(400,"Invalid User Email!"));
          }
          const validPassword=bcryptjs.compareSync(password,validUser.password);
          if(!validPassword){
            return next(errorHandler(400,"password is incorrect !"))
          }
            const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET_KEY);
            const{password:pass,...rest}=validUser._doc;
            resp.status(200).cookie('access_token',token,{httpOnly:true}).json(rest)
            
      }
      catch(err){
           next(err);
      }
}

export const google=async(req,resp,next)=>{
    const {email,name,googlePhotoUrl}=req.body;
    try{
      const user=await User.findOne({email})
      if(user){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);
            const {password,...rest}=user._doc;
            resp.status(200).cookie('access_token',token,{httpOnly:true}).json(rest)
      }
      else{
         const generatedPassword=Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
         const hashedPassword=bcryptjs.hashSync(generatedPassword,10);
          const newUser=new User({username:name.toLowerCase().split().join('')+Math.random().toString(9).slice(-3),
          email,
          password:hashedPassword,
          profilePicture:googlePhotoUrl,
         } ) 
         await newUser.save(); 
         const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET_KEY)
         const{password,...rest}=newUser.doc;
         resp.status(200).cookie('access_token',token
         ,{httpOnly:true}).json(rest)
      }

    }
    catch(error){
         
    }
}






