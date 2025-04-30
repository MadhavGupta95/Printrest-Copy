import express from "express";
import { withAuth } from "../middleware/withAuth";
import Post from "../models/schemas/Post.js";
import { body } from "express-validator";
import axios from "axios";
import upload from "../utils/upload/index.js";
import fs from 'fs'
import path from 'path'
import nanoid from 'nanoid'

const router = express.Router();

// //route to add a new post
// router.post(
//   "/",
//   withAuth,
//   body("title")
//     .isLength({ min: 2 })
//     .withMessage("Title must be atleast 2 characters long"),
//   body("description")
//     .isLength({ min: 2 })
//     .withMessage("Description must be atleast 2 characters long"),
//   body("image").isLength({ min: 2 }).withMessage("Incorrect Image"),
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       // const validatedBody = req.body;
//       // const { _id: userId } = req.user;

//       // const post = await Post({
//       //   ...validatedBody,
//       //   user: userId,
//       // });
//       // await post.save();
//       // return res.json({
//       //   success: true,
//       //   message: "Post created successfully",
//       //   data: post,
//       // });

//       const imageFile = req.file;
//       const fileData = imageFile.buffer; //^ this buffer contains all of the information of the image

//       //_ axios:
//       const uploadIoResponse = await axios.post(
//         `https://api.upload.io/v2/accounts/${process.env.UPLOAD_IO_ACCOUNT_ID}/uploads/binary`,
//         fileData,
//         {
//           headers: {
//             Authorization: `Bearer ${process.env.UPLOAD_IO_API_KEY}`,
//           },
//         }
//       );
//       const { imageURL } = uploadIoResponse.data;
//       console.log(uploadIoResponse.data); //^ this will provide image url
//       console.log(req.body, "body");
//       console.log(req.file, "file");
//       res.send("hello from post");
//     } catch (error) {
//       console.log(error.message);
//       return res.json({
//         success: false,
//         message: "Error inside adding a POST",
//         data: null,
//       });
//     }
//   }
// );

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
  upload.single("image"),
  async (req, res) => {
    try {
      const imageFile = req.file;
      const fileData = imageFile.buffer; //^ this buffer contains all of the information of the image
      //_ axios:
      const uploadIoResponse = await axios.post(
        `https://api.upload.io/v2/accounts/${process.env.UPLOAD_IO_ACCOUNT_ID}/uploads/binary`,
        fileData,
        {
          headers: {
            Authorization: `Bearer ${process.env.UPLOAD_IO_API_KEY}`,
          },
        }
      );
      const { imageURL } = uploadIoResponse.data;
      console.log(uploadIoResponse.data); //^ this will provide image url
      console.log(req.body, "body");
      console.log(req.file, "file");
      res.send("hello from post");
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
router.post("/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const likeAPost = await Post.findById(id);
    const { _id: userId } = req.user;

    if (!likeAPost) {
      return res.json({
        success: false,
        message: "Post not found (like).",
        data: null,
      });
    }

    await Post.findByIdAndUpdate(id, {
      $addToSet: {
        likes: userId,
      },
    });

    return res.json({
      success: true,
      message: "Post liked!",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Error in liking a post",
      data: null,
    });
  }
});

// Todo : Delete a post
router.post("/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletePost = await Post.findById(id);
    if (!deletePost) {
      return res.json({
        success: false,
        message: "Post not found (delete)",
        data: null,
      });
    }
    await Post.findByIdAndUpdate(id, {
      deleted: true,
    });
    return res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Error with deleting a post",
    });
  }
});

// Todo : Update a post
router.patch("/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = await Post.findById(id);
    const updatedPost = req.body;
    if (!updatePost) {
      return res.json({
        success: false,
        message: "Post not found (update)",
      });
    }

    const UpdateThePost = await Post.findByIdAndUpdate(id, updatedPost, {
      new: true,
    });

    return res.json({
      success: true,
      message: "Post updated successfully",
      data: UpdateThePost,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Error in updating a post.",
    });
  }
});
export default router;
