import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import logger, { morganMiddleware } from "./utils/logger";
import { connectDB } from "./utils/db";

dotenv.config(path.join(path.resolve(), ".env"));

const app = express();
app.use(express.json());
app.use(morganMiddleware);
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)

connectDB()

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
