import express from "express";
import {
  updateUser,
  deleteUser,
  signout,
  getUsers,
  getUser,
} from "../controllers/userController.js";
const router = express.Router();
import { verifytoken } from "../utils/verifyUser.js";
router.put("/update/:userId", verifytoken, updateUser);
router.delete("/delete/:userId", verifytoken, deleteUser);
router.post("/signout", signout);
router.get("/getusers", verifytoken, getUsers);
router.get("/:userId", getUser);
export default router;
