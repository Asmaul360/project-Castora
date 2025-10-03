import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createTweet,
  getUserTweets,
  updateTweet,
  deleteTweet,
} from "../controllers/tweets.controller.js";

const router = Router();

router.post("/tweets", verifyJWT, createTweet);
router.get("/user/:userId/tweets", verifyJWT, getUserTweets);
router.put("/tweet/:tweetId/updateTweets", verifyJWT, updateTweet);
router.delete("/tweet/:tweetId/deleteTweets", verifyJWT, deleteTweet);
export default router;
