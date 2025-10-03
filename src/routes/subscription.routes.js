import { Router } from "express";
import {
  toggleSubscription,
  getUserChannelSubscribers,
  getSubscribedChannels,
} from "../controllers/subscription.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/channel/:channelId/subscribe", verifyJWT, toggleSubscription);
router.get(
  "/channel/:channelId/subscriber",
  verifyJWT,
  getUserChannelSubscribers,
);
router.get(
  "/subscriber/:subscriberId/subscriptions",
  verifyJWT,
  getSubscribedChannels,
);
export default router;
