import ApiError from "../utils/ApiError.js";
import AppResponse from "../utils/AppResponse.js";
import asyncHandler from "express-async-handler";

import Video from "../models/video.model.js";
import uploadToCloudinary from "../utils/cloudinary.js"; // default export

// ------------------------ Upload Video ------------------------
const uploadVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const uploadFilePath = req.files;
  if (!uploadFilePath || uploadFilePath.length === 0)
    throw new ApiError(400, "Video file is missing");

  // Upload videos to Cloudinary
  const uploadedVideo = await Promise.all(
    uploadFilePath.map(async (file) => {
      const video = await uploadToCloudinary(file.path);
      if (!video || !video.secure_url)
        throw new ApiError(500, "Failed to upload video to Cloudinary");
      return video;
    })
  );

  // ------------------- CHANGE HERE -------------------
  // Instead of storing all videos in a single document, create one document per video
  const savedVideos = await Promise.all(
    uploadedVideo.map((v) =>
      Video.create({
        videoFile: v.secure_url,
        duration: v.duration || 0,
        title,
        description,
        owner: req.user._id,
        thumbnail: "", // you can set per video later
      })
    )
  );
  // ---------------------------------------------------

  res.status(201).json({
    message: "Videos uploaded successfully",
    videos: savedVideos, // returns array of video documents, each with its own _id
  });
});

// ------------------------ Upload Thumbnail ------------------------
const uploadThumbnail = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findById(videoId);
  if (!video) throw new ApiError(404, "Video not found");

  if (video.owner.toString() !== req.user._id.toString())
    throw new ApiError(403, "Not allowed");

  const thumbnailPath = req.file?.path;
  if (!thumbnailPath) throw new ApiError(400, "Thumbnail file is missing");

  const uploadedThumbnail = await uploadToCloudinary(thumbnailPath);
  if (!uploadedThumbnail || !uploadedThumbnail.secure_url)
    throw new ApiError(500, "Failed to upload thumbnail");

  video.thumbnail = uploadedThumbnail.secure_url;
  await video.save();

  res
    .status(200)
    .json(new AppResponse(200, video, "Thumbnail uploaded successfully"));
});

// ------------------------ Update Video Details ------------------------
const updateVideoDetails = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;

  if (!title && !description)
    throw new ApiError(400, "At least one field is required");

  const video = await Video.findById(videoId);
  if (!video) throw new ApiError(404, "Video not found");

  if (video.owner.toString() !== req.user._id.toString())
    throw new ApiError(403, "Not allowed");

  if (title) video.title = title;
  if (description) video.description = description;
  await video.save();

  res
    .status(200)
    .json(new AppResponse(200, video, "Video details updated successfully"));
});

// ------------------------ Get Single Video ------------------------
const getSingleUserVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const video = await Video.findById(videoId);
  if (!video) throw new ApiError(404, "Video not found");

  if (video.owner.toString() !== req.user._id.toString())
    throw new ApiError(403, "Not allowed");

  res
    .status(200)
    .json(new AppResponse(200, video, "Video details fetched successfully"));
});

// ------------------------ Get All User Videos ------------------------
const getAllUserVideos = asyncHandler(async (req, res) => {
  const videos = await Video.find({ owner: req.user._id }).sort({
    createdAt: -1,
  });

  res
    .status(200)
    .json(
      new AppResponse(200, videos, "User uploaded videos fetched successfully")
    );
});

// ------------------------ Delete Video ------------------------
const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  if (!video) throw new ApiError(404, "Video not found");

  if (video.owner.toString() !== req.user._id.toString())
    throw new ApiError(403, "Not allowed");

  await video.deleteOne();
  res
    .status(200)
    .json(new AppResponse(200, null, "Video deleted successfully"));
});

// ------------------------ Like/Unlike Video ------------------------
const likeVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  if (!video) throw new ApiError(404, "Video not found");

  const userId = req.user._id;
  if (video.likes.includes(userId)) {
    video.likes.pull(userId);
  } else {
    video.likes.push(userId);
  }

  await video.save();
  res
    .status(200)
    .json(new AppResponse(200, video, "Video like toggled successfully"));
});

// ------------------------ Add View ------------------------
const addView = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  if (!video) throw new ApiError(404, "Video not found");

  video.views += 1;
  await video.save();

  res
    .status(200)
    .json(new AppResponse(200, video, "Video view count updated successfully"));
});

export {
  uploadVideo,
  uploadThumbnail,
  updateVideoDetails,
  getSingleUserVideo,
  getAllUserVideos,
  deleteVideo,
  likeVideo,
  addView,
};
