import express from 'express';
import Register from '../controllers/Register.controller.js';
import { RegisterSchema } from '../ValidationSchema/RegisterSchema.js';
import Login from '../controllers/Logincontrollers.js';
import { LoginSchema } from '../ValidationSchema/LoginSchema.js';
import { createTodo } from '../controllers/TodoControllers.js';
import { check } from 'express-validator';
import { getTodo } from '../controllers/TodoListcontrollers.js';
import { Marktodo } from '../controllers/Marktodo.controller.js';
import { RemoveTodo } from '../controllers/RemoveTodocontroller.js';

const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post("/register",RegisterSchema,Register);
apiRoute.post("/Login",LoginSchema,Login);

// protected routes

apiProtected.post("/createTodo",
[check("desc","Todo desc is required").exists()],
createTodo);

apiProtected.post("/marktodo",
[check("todo_id","Todo id is required").exists()],
Marktodo);

apiProtected.post("/deletetodo",
[check("todo_id","Todo id is required").exists()],
RemoveTodo);

 apiProtected.get("/todolist",
 getTodo);

export default apiRoute;