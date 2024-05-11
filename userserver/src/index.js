import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from 'cors'
import userRouter from "./routes/user.router.js";
dotenv.config();


mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();



app.use(
  cors({
    origin: ["http://localhost:5173", "https://sieghart-blog.vercel.app"],
    credentials: true,
  })
);

app.use(express.json())
app.use('/user',userRouter);
app.get('/',(req,res)=>{
  res.status(200).json({ message: 'Welcome to my API' })
})

app.listen(5000,(req,res)=>{
    console.log("app run")
})

export default app;