import express from "express";
import logger from "../utils/logger";
import { body, validationResult } from "express-validator";
const router = express.Router();

router.post(
  "/signup",
  body("firstName")
    .isLength({ min: 2 })
    .withMessage("First Name must be aleast 2 characters long"),
  body("lastName")
    .isLength({ min: 2 })
    .withMessage("Last Name must be aleast 2 characters long"),
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be aleast 2 characters long"),
  async (req, res) => {
    try {
      const validation = validationResult(req)
      if(!validation.isEmpty()){
        return res.json({
          success : false,
          message : 'Validation in signup failed',
          errors : validation.array()
        })
      }
      return res.send('Validation successfull')
    } catch (error) {
      logger.error(error.message);
      return res.json({
        message: "Something Went Wrong in signup",
        success: false,
        data: null,
      });
    }
  }
);

export default router