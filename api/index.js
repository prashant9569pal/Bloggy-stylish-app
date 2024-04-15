import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import "dotenv/config";
const app = express();

app.use(express.json());
app.use(cors());
//MongoDb Connectio
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connection established"))
  .catch(() => console.log(err));
//all Routes are defined to connect
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

//handling error messages to save time
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({
    message: message,
    success: false,
    statusCode: statusCode,
  });
});
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
