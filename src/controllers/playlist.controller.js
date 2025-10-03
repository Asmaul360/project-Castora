import mongoose from "mongoose";
import { Playlist } from "../models/playlist.model.js";
// In playlist.controller.js (and other controllers)
import ApiError from "../utils/ApiError.js";

import asyncHandler from "../utils/asyncHandler.js";
import AppResponse from "../utils/AppResponse.js";

// Create a new playlist
const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body; // <-- will work if JSON sent correctly
  if (!req.user) throw new ApiError(401, "You must be logged in");

  const playlistDetails = await Playlist.create({
    name,
    description: description || "Please write something in description",
    owner: req.user._id,
  });

  return res
    .status(200)
    .json(
      new AppResponse(200, playlistDetails, "Playlist created successfully"),
    );
});

// Get all playlists of the logged-in user
const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (userId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed");
  }

  const playlistVideo = await Playlist.find({ owner: req.user._id }).sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .json(
      new AppResponse(
        200,
        playlistVideo,
        "All playlists retrieved successfully",
      ),
    );
});

// Get a playlist by ID
const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  const playlistDetails = await Playlist.findById(playlistId).populate({
    path: "videos",
    options: { sort: { createdAt: -1 } },
  });

  if (!playlistDetails) {
    throw new ApiError(404, "Playlist not found");
  }

  if (playlistDetails.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed to access this playlist");
  }

  return res
    .status(200)
    .json(
      new AppResponse(200, playlistDetails, "Playlist retrieved successfully"),
    );
});

// Add a video to a playlist
const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) throw new ApiError(404, "Playlist not found");

  if (playlist.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed to access this playlist");
  }

  if (!playlist.videos.includes(videoId)) {
    playlist.videos.push(videoId);
    await playlist.save();
  }

  return res
    .status(200)
    .json(
      new AppResponse(200, playlist, "Video added to playlist successfully"),
    );
});

// Remove a video from a playlist
const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) throw new ApiError(404, "Playlist not found");

  if (playlist.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed to access this playlist");
  }

  if (playlist.videos.includes(videoId)) {
    playlist.videos.pull(videoId);
    await playlist.save();
  }

  return res
    .status(200)
    .json(
      new AppResponse(
        200,
        playlist,
        "Video removed from playlist successfully",
      ),
    );
});

// Delete a playlist
const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) throw new ApiError(404, "Playlist not found");

  await Playlist.findByIdAndDelete(playlistId);

  return res
    .status(200)
    .json(new AppResponse(200, null, "Playlist deleted successfully"));
});

// Update a playlist
const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;

  const playlist = await Playlist.findById(playlistId);
  if (!playlist) throw new ApiError(404, "Playlist not found");

  if (playlist.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed to update this playlist");
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    { name, description },
    { new: true },
  );

  return res
    .status(200)
    .json(
      new AppResponse(200, updatedPlaylist, "Playlist updated successfully"),
    );
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
