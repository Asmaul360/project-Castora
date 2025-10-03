import { Router } from "express";
import {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/videos/:videoId/comments", verifyJWT, getVideoComments);
router.post("/videos/:videoId/comments", verifyJWT, addComment);
router.put("/videos/:videoId/comments/:commentId", verifyJWT, updateComment);
router.delete("/videos/:videoId/comments/:commentId", verifyJWT, deleteComment);
export default router;
