import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middle.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

// router.post("/login", loginUser);
// router.post("/logout", verifyJWT, logoutUser);
// router.post("/refresh-token", refreshAccessToken);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
//verifyJWT middleware korechi tar karon logged in log e kar sake password change
router.route("/current-user").get(verifyJWT, getCurrentUser);
// user jeno loggedin thake sei jonno verifyJWT use korchi
router.route("/update-details").patch(verifyJWT, updateAccountDetails);
// patch() -> Partially update an existing resource.
//Only sends the fields that need to change.
// Doesn’t touch other fields.
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
// You must write upload.single("avatar") whenever you expect a file upload.

// Without it, your patch request will still work for JSON fields, but the avatar file won’t reach your controller.
router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage", updateUserCoverImage));

router.route("/c/:username").get(verifyJWT, getUserChannelProfile);
// : = “Hey Express, whatever is here, save it in req.params.”
router.route("/history").get(verifyJWT, getWatchHistory);
export default router;
