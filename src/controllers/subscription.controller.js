import User from "../models/user.model.js"; // correct import
import { Subscription } from "../models/subscription.model.js";
import ApiError from "../utils/ApiError.js";
import AppResponse from "../utils/AppResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  const existingSubscription = await Subscription.findOne({
    subscriber: req.user._id,
    channel: channelId,
  });

  let status;

  if (!existingSubscription) {
    await Subscription.create({
      subscriber: req.user._id,
      channel: channelId,
    });
    status = "subscribed";
  } else {
    await Subscription.deleteOne({
      subscriber: req.user._id,
      channel: channelId,
    });
    status = "unsubscribed";
  }

  return res
    .status(200)
    .json(new AppResponse(200, { status }, `User ${status} successfully`));
});

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  const subscribers = await Subscription.find({ channel: channelId }).populate(
    "subscriber",
    "name email",
  );

  return res
    .status(200)
    .json(
      new AppResponse(
        200,
        subscribers,
        "Subscriber list generated successfully",
      ),
    );
});

const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
  if (!subscriberId) throw new ApiError(400, "SubscriberId is required");

  const subscribedTo = await Subscription.find({
    subscriber: subscriberId,
  }).populate("channel", "name email");

  const channels = subscribedTo.map((sub) => sub.channel);

  return res
    .status(200)
    .json(
      new AppResponse(
        200,
        channels,
        "Subscribed channels list generated successfully",
      ),
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
