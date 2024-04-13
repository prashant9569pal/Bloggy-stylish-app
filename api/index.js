import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
const app = express();

app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connection established"))
  .catch(() => console.log(err));
app.get("/", (req, res) => {
  res.send("Welcome to the server ");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
