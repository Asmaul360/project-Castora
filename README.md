# 🎬 Castora Backend



A complete backend for a video & social platform built using Node.js, Express.js, MongoDB, and JWT Authentication. This application handles video uploads, playlists, subscriptions, likes, and social posts (tweets) efficiently.

---

## ✨ Features

✅ User Authentication (JWT Based)
✅ Role-Based Access Control (Admin, Creator, User)
✅ Video Upload & Management
✅ Playlists & Subscriptions
✅ Likes & Comments System
✅ Social Posts (Tweets)
✅ Secure File Uploads using Cloudinary
✅ Error Handling & Validation
✅ MongoDB + Mongoose ORM

---

## 🛠️ Tech Stack

| Technology    | Used For        |
| ------------- | --------------- |
| ⚙️ Node.js    | Backend Runtime |
| 🚀 Express.js | Web Framework   |
| 🗄️ MongoDB    | Database        |
| 🔐 JWT        | Authentication  |
| ☁️ Cloudinary | File Uploads    |
| 🔧 Mongoose   | ODM for MongoDB |

---

## 📦 Folder Structure

```
employee-management-system/
│-- src/
│   │-- controllers/
│   │-- models/
│   │-- routes/
│   │-- middlewares/
│   │-- utils/
│   │-- app.js
│   │-- index.js
│-- uploads/
│-- .env
│-- package.json
│-- README.md
```

---

## ⚡ Installation & Setup

### 1. Clone the repository

```bash
   git clone https://github.com/YourUsername/castora-backend.git
   cd castora-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file and add:

```
PORT=8000
MONGODB_URI=your_mongodb_uri_here
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### 4. Run the server

```bash
npm run dev
```

---

## 🛡️ API Authentication

Use JWT for all protected routes.
Add this header:

```
Authorization: Bearer <your_token>
```

---

## 📚 API Modules

- 👨‍💼 User Module (Register/Login)
- 🎥 Video Module
- 📂 Playlist Module
- 🔔 Subscription Module
- ❤️ Like & Comment Module
- 🐦 Social Post (Tweet) Module
- - 🤝 Contributing
---

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit PRs.

---

## 📞 Contact

**Author**: Asmaul Mallick
📧 Email: asmaulmallick360@gmail.com
🔗 GitHub: [https://github.com/Asmaul360](https://github.com/Asmaul360)

---

⭐ If you like this project, consider giving it a star on GitHub!
