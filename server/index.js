import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "../server/routes/users.js";
import videoRoutes from "../server/routes/videos.js";
import commentsRoutes from "../server/routes/comments.js";
import authRoutes from "../server/routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser()); // to send cookies to the user
app.use(express.json()); // helps to get data from outside in json format
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentsRoutes);

//middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected");
});
