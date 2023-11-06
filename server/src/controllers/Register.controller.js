import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import bcrypt from 'bcrypt';
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import { statusCode, JWT_TOKEN_SECRET } from "../utils/constant.js";

const Register = async(req,res) => {

     const errors = validationResult(req);
     if(errors.isEmpty()){
         const {name,username,password,email} = req.body;

         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(password,salt); 
          
         const userExist = await User.findOne({
            $or: [{
                email: email
            },{
                username: username
            }]
         })

          if(userExist){
             return res.json(jsonGenerate(statusCode.UNPROCESSIBLE_ENTITY,"user or email already exists"))
          }

          try{
             const result = await User.create({
                name:name,
                email:email,
                password:hashPassword,
                username:username         
            })
            
            const token = jwt.sign({userId:result._id},JWT_TOKEN_SECRET)

            return res.json(jsonGenerate(statusCode.SUCCESS,"registration successfull",{userId:result._id,token:token}))
          }catch(error){
             console.log(error)
          }
     }

    return  res.json(jsonGenerate(statusCode.VALIDATION_ERROR,'validation error',errors.mapped()));
}

export default Register;