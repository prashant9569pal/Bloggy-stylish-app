import express from "express";
import { verifytoken } from "../utils/verifyUser.js";
import {
  createPost,
  deletepost,
  getposts,
  updatepost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/create", verifytoken, createPost);
router.get("/getposts", getposts);
router.delete("/deletepost/:postId/:userId", verifytoken, deletepost);
router.put("/updatepost/:postId/:userId", verifytoken, updatepost);
export default router;
