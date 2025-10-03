import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
  {
    videoFile: [
      {
        type: String, // array of cloudinary video urls
        required: true,
      },
    ],

    thumbnail: {
      type: String, //cloudinary image url
      required: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    duration: [
      {
        type: Number,
        required: true,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // each like belongs to a user
      },
    ],
    view: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);
const Video = mongoose.model("Video", videoSchema);
videoSchema.plugin(mongooseAggregatePaginate);
export default Video;
