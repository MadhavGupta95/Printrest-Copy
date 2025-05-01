import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import logger, { morganMiddleware } from "./utils/logger";
import { connectDB } from "./utils/db";
import cors from "cors";
import fs from "fs/promises";

dotenv.config(path.join(path.resolve(), ".env"));

const app = express();
app.use(express.json());
app.use(cors());
app.use(morganMiddleware);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

connectDB();


//_ route to see any image on the router send by our server
app.get("/image/:filename", async (req, res) => {
  try {
    const {filename} = req.params
    const file = path.join(
      path.resolve(),
      `/src/public/uploads/${filename}`
    );
    res.sendFile(file)
  } catch (error) {
    console.log(error.message);
    logger.log(error.message);
  }
});

app.get("/", (req, res) => {
  try {
    res.send("message");
    throw new Error("BROKEN");
  } catch (error) {
    logger.error(error);
  }
});

app.listen(process.env.PORT || 9472, () => {
  console.log(`server is running on port : ${process.env.PORT || 9472} `);

  logger.info(`server is running on port : ${process.env.PORT || 9472} `);
});
