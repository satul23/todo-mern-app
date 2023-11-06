import express from 'express';
import apiRoute, { apiProtected } from './routes/api.js';
import mongoose from 'mongoose'
import { DB_CONNECT } from './utils/constant.js';
import Authmiddleware from './middlewares/Authmiddleware.js';
import cors from 'cors';
const app = express();
const PORT = 8000;


mongoose.connect("mongodb://127.0.0.1:27017/todo")
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// VrYbbM35ekN9nklK

app.use(cors())
app.use(express.json())
app.use("/api/",apiRoute);
app.use("/api/",Authmiddleware,apiProtected)

app.listen(PORT,() => {
    console.log("server is running")
});
