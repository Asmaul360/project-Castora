import { Router } from "express";
import {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
} from "../controllers/playlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Keep these as you requested
// Route inside playlist router
router.post("/createPlaylist", verifyJWT, createPlaylist);

router.get("/getUserPlaylist/:userId", verifyJWT, getUserPlaylists);

// Rest of the routes in a cleaner RESTful style
router.get("/playlists/:playlistId", verifyJWT, getPlaylistById);
router.put("/playlists/:playlistId", verifyJWT, updatePlaylist);
router.delete("/playlists/:playlistId", verifyJWT, deletePlaylist);
router.put(
  "/playlists/:playlistId/videos/:videoId",
  verifyJWT,
  addVideoToPlaylist,
);
router.delete(
  "/playlists/:playlistId/videos/:videoId",
  verifyJWT,
  removeVideoFromPlaylist,
);

export default router;
