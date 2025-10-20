import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`✅ Server running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB connection failed !!!", err);
  });

// import express from "express";
// const app = express();

// // database se jab vii bat karo asyc , await and try catch lagao
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);

//     // "MongoDB ke cluster/server se connect ho jao aur is DB ko target karo."
//     // Agar DB exist karta hai → connect.
//     // Agar DB exist nahi karta hai → create hoga jab aap pehli entry karoge.

//     app.on("error", (error) => {
//       console.log("ERRR", error);
//       throw error;
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening on port ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.log("ERROR", error);
//   }
// })();
