import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  //400:>Bad Request
  const { username, email, password } = req.body;

  if (!email || !password || !username || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });
  try {
    const user = await newUser.save();
    res.status(201).json({ message: "User created successfully", user: user });
  } catch (error) {
    next(error);
  }
};
