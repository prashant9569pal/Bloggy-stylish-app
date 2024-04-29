import express from "express";
import { verifytoken } from "../utils/verifyUser.js";
import {
  createComment,
  deleteComment,
  editComment,
  getPostComments,
  getcomments,
  likeComment,
} from "../controllers/commentController.js";

const router = express.Router();
router.post("/create", verifytoken, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.put("/likeComment/:commentId", verifytoken, likeComment);
router.put("/editComment/:commentId", verifytoken, editComment);
router.delete("/deleteComment/:commentId", verifytoken, deleteComment);
router.get("/getcomments", verifytoken, getcomments);
export default router;
