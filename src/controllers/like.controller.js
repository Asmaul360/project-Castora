import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import ApiError from "../utils/ApiError.js";

import AppResponse from "../utils/AppResponse.js";

import asyncHandler from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId, likeId } = req.params;
  let action;
  const like = await Like.findOne({ video: videoId, likedBy: likeId });
  if (!like) {
    await Like.create({
      video: videoId,
      likedBy: likeId,
    });
    action = "liked";
  } else {
    await Like.deleteOne({
      video: videoId,
      likedBy: likeId,
    });
    action = "UnLiked";
  }
  return res
    .status(200)
    .json(new AppResponse(200, { action }, `User ${action} successfully`));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  let action;
  const like = await Like.findOne({
    comment: commentId,
    likedBy: req.user._id,
  });
  //
  // findOne stops after finding the first match → faster, less data returned.
  // Returns one document → easy to check if (!like) for toggle.
  // Perfect for yes/no existence checks.
  //
  if (!like) {
    await Like.create({
      comment: commentId,
      likedBy: req.user._id,
    });
    action = "Liked";
  } else {
    await Like.deleteOne({
      comment: commentId,
      likedBy: req.user._id,
    });
    action = "unLiked";
  }
  return res
    .status(200)
    .json(new AppResponse(200, { action }, `User ${action} successfully`));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  let action;
  const tweetLike = await Like.findOne({
    tweet: tweetId,
    likedBy: req.user._id,
  });
  if (!tweetLike) {
    await Like.create({
      tweet: tweetId,
      likedBy: req.user._id,
    });
    action = "liked";
  } else {
    await Like.deleteOne({
      tweet: tweetId,
      likedBy: req.user._id,
    });
    action = "unLiked";
  }
  return res
    .status(200)
    .json(new AppResponse(200, { action }, `User ${action} successfully`));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const getAllLike = await Like.find({ video: videoId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));
  return res
    .status(200)
    .json(
      new AppResponse(
        200,
        getAllLike,
        "All Liked video's fetched successfully",
      ),
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
