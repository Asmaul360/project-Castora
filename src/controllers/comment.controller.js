import { Comment } from "../models/comment.model.js";
import ApiError from "../utils/ApiError.js";
import AppResponse from "../utils/AppResponse.js";
import asyncHandler from "express-async-handler";

// Get comments for a video with pagination
const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const videoComments = await Comment.find({ video: videoId })
    .populate("owner", "name email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  return res
    .status(200)
    .json(new AppResponse(200, videoComments, "Comments fetched successfully"));
});

// Add a new comment
const addComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { content } = req.body;

  const comment = await Comment.create({
    content,
    video: videoId,
    owner: req.user._id,
  });

  return res
    .status(201)
    .json(new AppResponse(201, comment, "Comment added successfully"));
});

// Update a comment
const updateComment = asyncHandler(async (req, res) => {
  const { videoId, commentId } = req.params;
  const { content } = req.body;

  const updatedComment = await Comment.findOneAndUpdate(
    { _id: commentId, video: videoId, owner: req.user._id },
    { content },
    { new: true },
  );

  if (!updatedComment) {
    throw new ApiError(404, "Comment not found or not allowed");
  }

  return res
    .status(200)
    .json(new AppResponse(200, updatedComment, "Comment updated successfully"));
});

// Delete a comment (soft delete)
const deleteComment = asyncHandler(async (req, res) => {
  const { videoId, commentId } = req.params;
  // findOneAndDelete to delete everything like that user id ,time ,on which video
  //findOneAndUpdate only remove the content but all id , createdAt stays here
  const comment = await Comment.findOneAndUpdate(
    { _id: commentId, video: videoId, owner: req.user._id },
    { content: null },
    { new: true },
  );

  if (!comment) {
    throw new ApiError(404, "Comment not found or not allowed");
  }

  return res
    .status(200)
    .json(new AppResponse(200, comment, "Comment removed successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
