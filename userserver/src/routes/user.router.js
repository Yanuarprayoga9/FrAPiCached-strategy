import express from "express";
import User from "../model/user.model.js";
import { userData } from "../utils/userData.js";
import errorHandler from "../utils/errorHandler.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res, next) => {
  try {
    // await User.create(userData)
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 0;
    const search = req.query.search || "";
    const users = await User.find({
      first_name: { $regex: search, $options: "i" },
      last_name: { $regex: search, $options: "i" },
    })
      .skip(page * limit)
      .limit(limit);

    const total = await User.countDocuments({
      first_name: { $regex: search, $options: "i" },
    });

    const response = {
      error: false,
      message: "success",
      total,
      page: page + 1,
      limit,
      users,
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!id || !user) return  next(errorHandler("User not found", 404));

    const response = {
      error: false,
      message: "sucess get user",
      user,
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});


userRouter.post("/create", async (req, res, next) => {
  try {
    console.log(req.body)
    const { first_name, last_name, email, gender } = req.body;
    if (!first_name || !last_name || !email || !gender)
      return next(errorHandler("Lengkapi field", 400));
    const user = User.create(req.body);
    const response = {
      error: false,
      message: "sucess create user",
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

userRouter.patch("/update/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const user = await User.findById(id);
    if (!user) return next(errorHandler("User not found", 404));

    const { first_name, last_name, email, gender } = req.body;
    if (!first_name || !last_name || !email || !gender)
      return next(errorHandler("Lengkapi field", 400));

    // Perbarui pengguna dan tangkap hasilnya
    const userUpdate = await User.findByIdAndUpdate(id, req.body, { new: true });

    const response = {
      error: false,
      message: userUpdate ? "User updated successfully" : "Failed to update user",
      user: userUpdate, // Menggunakan data user yang telah diperbarui
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});


userRouter.delete('/delete/:id',async (req,res,next)=>{
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    console.log(user)
    if (!id || !user) return  next(errorHandler("User not found", 404));

    const userDelete = await User.findByIdAndDelete(id);

    res.status(200).json(userDelete)
  } catch (error) {
    next(error);
  }
})

export default userRouter;
