import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helpers.js"
import { statusCode } from "../utils/constant.js"
import Todo from "../models/Todo.js"
import User from "../models/User.js"

export const RemoveTodo = async(req,res) =>{
   const errors = validationResult(req)
   
   if(!errors.isEmpty()){
    return res.json(jsonGenerate(statusCode.VALIDATION_ERROR,"todo id is required",errors.mapped()))
   }

   try{
     const result = await Todo.findByIdAndDelete({
        userId:req.userId,
        _id:req.body.todo_id,
     });

      if(result){
        const user = await User.findByIdAndUpdate({
            _id:req.userId
        },{
            $pull: {todos: req.body.todoId}
        }) 

        res.json(jsonGenerate(statusCode.SUCCESS,"todo deleted",null))
      }
   }catch(error){
     return res.json(jsonGenerate(statusCode.UNPROCESSIBLE_ENTITY,"could not delete",null))
   }
}