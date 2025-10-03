import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweets.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

import asyncHandler from "../utils/asyncHandler.js";
import AppResponse from "../utils/AppResponse.js";

const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet

  const { content } = req.body;
  if (!req.user) {
    throw new ApiError(401, "You must be logged in to create a tweet");
  }
  const tweets = await Tweet.create({ owner: req.user._id, content: content });

  return res
    .status(201)
    .json(new AppResponse(201, tweets, "tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!req.user) {
    throw new ApiError(401, "You must be logged in to view tweets");
  }

  const tweets = await Tweet.find({ owner: userId }).sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .json(new AppResponse(200, tweets, "User tweets fetched successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params; // tweet to update
  const { content } = req.body;
  if (!req.user) {
    throw new ApiError(401, "You must be logged in to view tweets");
  }
  const tweets = await Tweet.findOneAndUpdate(
    { _id: tweetId, owner: req.user._id },
    { content },
    { new: true },
  );
  if (!tweets) {
    throw new ApiError(404, "Tweet not found or not owned by user");
  }
  return res
    .status(200)
    .json(
      new AppResponse(200, tweets, " Tweets has been updated successfully"),
    );
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet
  const { tweetId } = req.params;
  if (!req.user) {
    throw new ApiError(401, "You must logged in to delete tweets");
  }
  const tweets = await Tweet.findOneAndDelete({
    _id: tweetId,
    owner: req.user._id,
  });
  if (!tweets) {
    throw new ApiError(404, "Tweet not found or not owned by user");
  }
  return res
    .status(200)
    .json(
      new AppResponse(200, tweets, " Tweets has been deleted successfully"),
    );
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
