import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middle.js";
import {
  uploadVideo,
  updateVideoDetails,
  getSingleUserVideo,
  getAllUserVideos,
  uploadThumbnail,
  deleteVideo,
  likeVideo,
  addView,
} from "../controllers/video.controller.js";

const router = Router();

// Upload a new video
router.post(
  "/videos/upload",
  verifyJWT,
  upload.array("videoFile"), // <--- Make sure this matches Postman key
  uploadVideo,
);

// Update video details
router.put("/videos/:videoId", verifyJWT, updateVideoDetails);

// Get a single video
router.get("/videos/:videoId", verifyJWT, getSingleUserVideo);

// Get all videos uploaded by the current user
router.get("/videos", verifyJWT, getAllUserVideos);

// Upload or update video thumbnail
router.post(
  "/videos/:videoId/thumbnail",
  verifyJWT,
  upload.single("thumbnail"),
  uploadThumbnail,
);

// Delete a video
router.delete("/videos/:videoId", verifyJWT, deleteVideo);

// Like/unlike a video
router.post("/videos/:videoId/like", verifyJWT, likeVideo);

// Add a view to a video
router.post("/videos/:videoId/view", verifyJWT, addView);

export default router;
