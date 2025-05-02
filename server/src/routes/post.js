import express from "express";
import { withAuth } from "../middleware/withAuth";
import Post from "../models/schemas/Post.js";
import { body } from "express-validator";
import axios from "axios";
import upload from "../utils/upload/index.js";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import FormData from "form-data";

const router = express.Router();

//route to add a new post with cdn (online clound)
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

router.post(
  //^ route to add a new post in our server (locally, not using bytescale[upload.io])
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
      const fileName = `${uuidv4()}-${imageFile.originalname}`;
      await fs.writeFile(
        path.join(path.resolve(), `/src/public/uploads/${fileName}`),
        fileData
      );
      console.log(imageFile.originalname);
      console.log(fileName);
      const imageURL = `http://localhost:9472/image/` + fileName;
      console.log(imageURL);
      const { title, description } = req.body;
      const post = await Post.create({
        title,
        description,
        image: imageURL,
        user: req.user._id,
      });
      return res.json({
        success: true,
        message: "Post created successfully",
        data: post,
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

//* Router to fetch the posts
router.get("/", async (req, res) => {
  try {
    const pageNumber = req.query._pageNumber || 1;
    const pageSize = req.query._pageNumber || 20;
    const posts = await Post.find({
      deleted: false,
    })
      .skip((pageNumber - 1) * pageSize) //^ if on page1 we want first 20 images,on page 2 skip first 20 images and give next 20 images.
      .limit(pageSize);
    return res.json({
      success: true,
      message: "Here are the posts.",
      data: posts,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Could not get the posts.",
      data: null,
    });
  }
});

//* Route to get 100 images from API
router.get("/seed", async (req, res) => {
  try {
    const response = await axios.get(
      "https://picsum.photos/v2/list?page=10&limit=100"
    );
    const downloadURL = response.data.map((image) => image.download_url); //< this will have the images
    //< now we need to download these images as buffer, for that we need a library form-data because from the ui, we are sending these images as in form data(web api).
    const downloadedBinaryData = await Promise.all(
      downloadURL.map((url) => axios.get(url, { responseType: "arraybuffer" }))
    );

    const downloadedImageUrls = await Promise.all(
      downloadedBinaryData.map((item) => {
        const fileName = `${uuidv4()}.jpg`;
        const fileData = item.data;
        fs.writeFile(
          path.join(path.resolve(), `/src/public/uploads/${fileName}`),
          fileData,
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
        return "http://localhost:9472/image/" + fileName;
      })
    );
    const data = downloadedImageUrls.map((url) => {
      const title = `${uuidv4()} - title`;
      const description = "Picsum Images";
      return Post.create({
        title,
        description,
        image: url,
      });
    });
    await Promise.all(data);
    return res.json("Done");
  } catch (error) {
    console.log(error.message);
    return res.json(error.message);
  }
});

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
