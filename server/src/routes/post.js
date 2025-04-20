import express from "express";
import { withAuth } from "../middleware/withAuth";
import Post from "../models/schemas/Post.js";
import { body } from "express-validator";

const router = express.Router();

//* route to add a new post
router.post(
  "/",
  withAuth,
  body("title")
    .isLength({ min: 2 })
    .withMessage("Title must be atleast 2 characters long"),
  body("description")
    .isLength({ min: 2 })
    .withMessage("Description must be atleast 2 characters long"),
  body("image").isLength({ min: 2 }).withMessage("Incorrect Image"),
  async (req, res) => {
    try {
      const validatedBody = req.body;
      const { _id: userId } = req.user;

      const post = await Post({
        ...validatedBody,
        user: userId,
      });
    } catch (error) {
      console.log(error.message);
      return res.json({
        success: false,
        message: "Error inside adding a POST",
        data: null,
      });
    }
  }
);

// Todo : Like a post
// Todo : Dislike a post
// Todo : Delete a post
// Todo : Update a post

export default router;
