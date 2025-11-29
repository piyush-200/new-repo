import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB CONNECTION
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connection Success"))
  .catch((error) => console.log(error));

// __dirname fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes example
app.get("/api", (req, res) => {
  res.json({ success: true, message: "Welcome To StudyNotion" });
});

// Serve frontend build
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

// PORT
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});

