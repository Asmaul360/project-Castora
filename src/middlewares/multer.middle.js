import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage: storage });
// 🔹 cb(null, 'uploads/')

// null → matlab koi error nahi hai.

// 'uploads/' → yeh wo folder path hai jaha file save hogi.

// Multer bolega → “File save karni hai.”

// Tum callback se bologe → “Koi error nahi hai (null), aur destination hai uploads/ folder.

// -----------------------------//
// export const upload = multer({ storage: storage });

// Ye sirf Multer ke liye special hai → taaki wo tumhare storage rules follow kare

// Normal JS functions me aisa nahi karna padta, wo bas export ho jata hai aur kaam karte hai.
