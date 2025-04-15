import express from "express";
import dotenv from "dotenv";
import path from "path";
import logger, { morganMiddleware } from "./utils/logger";
import { connectDB } from "./utils/db";

dotenv.config(path.join(path.resolve(), ".env"));

const app = express();
app.use(express.json());
app.use(morganMiddleware);

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
