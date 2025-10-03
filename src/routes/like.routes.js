import { Router } from "express";

import {
  toggleCommentLike,
  toggleTweetLike,
  toggleVideoLike,
  getLikedVideos,
} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.post("/toggleCommentLike/:commentId", verifyJWT, toggleCommentLike);
router.post("/toggleTweetLike/:tweetId", verifyJWT, toggleTweetLike);
router.post("/toggleVideoLike/:videoId", verifyJWT, toggleVideoLike);
router.get("/likedVideos/:videoId", verifyJWT, getLikedVideos);
export default router;
