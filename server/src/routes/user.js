import express from "express";
import logger from "../utils/logger";
import User from "../models/schemas/User.js";
import { withAuth } from "../middleware/withAuth.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .select("_id firstName lastName email followers following posts")
      .populate({
        path: "following",
        select: "_id firstName lastName email",
      });
    console.log(user.fullName);
    console.log(user.following[0].fullName);

    // ! check if virtuals on json when send to ui

    if (!user) {
      return res.json({
        success: false,
        message: "User not found.",
        data: null,
      });
    }
    return res.json({
      success: true,
      message: "Here are the user details...",
      data: user,
    });
  } catch (error) {
    logger.error(error.message);
    return res.json({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

router.post("/follow/:id", withAuth, async (req, res) => {
  try {
    // 2 users required
    // a user who is following
    // a user who is being followed
    // here, this " :id  " will give u the id of the user who we are trying to follow.
    //? if a user is already followed, show a message
    const { id } = req.params;
    const userToFollow = await User.findById(id).select("_id");
    const { _id: userId } = req.user;
    if (!userToFollow) {
      return res.json({
        success: false,
        message: "User not found.",
        data: null,
      });
    }

    // follow the user
    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        following: userToFollow._id, // for example : if we are trying to follow a user again and again, we cannot follow a user twice or thrice. therefore it is used
      },
    });

    //add the user to followers list
    await User.findByIdAndUpdate(userToFollow._id, {
      $addToSet: {
        followers: userId,
      },
    });

    return res.json({
      success: true,
      message: "User followed successfully.",
      data: null,
    });
  } catch (error) {
    logger.error(error.message);
    return res.json({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

router.post("/unfollow/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userToFollow = await User.findById(id).select("_id");
    const { _id: userId } = req.user;
    if (!userToFollow) {
      return res.json({
        success: false,
        message: "User not found.",
        data: null,
      });
    }

    // follow the user
    await User.findByIdAndUpdate(userId, {
      $pull: {
        following: userToFollow._id,
      },
    });

    //add the user to followers list
    await User.findByIdAndUpdate(userToFollow._id, {
      $pull: {
        followers: userId,
      },
    });

    return res.json({
      success: true,
      message: "User unfollowed successfully.",
      data: null,
    });
  } catch (error) {
    logger.error(error.message);
    return res.json({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

export default router;
