import { timeStamp } from "console";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timeStamp: true }
);
//timeStamp is true beacause we want to save two things time of creation and time of update

const User = mongoose.model("User", userSchema);

export default User;
