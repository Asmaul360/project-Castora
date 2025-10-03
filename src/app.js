import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js"; // only once
import playlistRouter from "./routes/playlist.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import commentRouter from "./routes/comment.routes.js";
import likeRoutes from "./routes/like.routes.js";
import tweetRoutes from "./routes/tweets.routes.js";
import AppResponse from "./utils/AppResponse.js"; // fixed path

const app = express();
app.use(express.json()); // for JSON bodies
app.use(express.urlencoded({ extended: true })); // for form data

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1", videoRouter); // mount video routes here
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/subscription", subscriptionRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/like", likeRoutes);
app.use("/api/v1", tweetRoutes);

export default app;
