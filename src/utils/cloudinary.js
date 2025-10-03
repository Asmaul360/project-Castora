import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      // upload_preset: "chaiaurcode",
    });

    console.log("Cloudinary upload result:", result);

    fs.unlinkSync(localFilePath);

    return result;
  } catch (err) {
    console.error("Error uploading to Cloudinary:", err);
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    return null;
  }
};

// ✅ Default export
export default uploadToCloudinary;
