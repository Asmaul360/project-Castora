import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"; // 🔹 Add this
import jwt from "jsonwebtoken"; // 🔹 Add this
const userSchema = new Schema(
  {
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    username: {
      type: String,
      required: true,
      trim: true,
      index: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String, //here'll be cloudinary image url
      required: true,
    },
    coverImage: {
      type: String, //here'll be cloudinary image url
    },
    password: {
      unique: true,
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    },
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    },
  );
};
const User = mongoose.model("User", userSchema);
export default User;

// Why process.env.ACCESS_TOKEN_SECRET is not in the third bracket?
// Because in jwt.sign(payload, secretOrPrivateKey, [options]),

// 1st argument → payload (what data you want to store inside the token, here: _id, username, email, fullName).

// 2nd argument → secret key (used to sign and later verify the token).

// 3rd argument → options object (like expiresIn, algorithm, etc).
