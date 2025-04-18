import express from "express";
import logger from "../utils/logger";
import { body, validationResult, param } from "express-validator";
import User from "../models/schemas/User.js";
import {
  generateAuthToken,
  generateResetToken,
  hashPassword,
  verifyPassword,
  verifyResetToken,
} from "../utils/auth/index.js";
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
      const validation = validationResult(req);
      if (!validation.isEmpty()) {
        return res.json({
          success: false,
          message: "Validation in signup failed",
          errors: validation.array(),
        });
      }
      const { firstName, lastName, email, password } = req.body;

      const user = new User({
        firstName,
        lastName,
        email,
        password,
      });

      await user.save();
      return res.send({
        message: "Validation successfull in signup.",
        success: true,
        data: user,
      });
    } catch (error) {
      logger.error(error.message);
      return res.json({
        message: error.message,
        success: false,
        data: null,
      });
    }
  }
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be aleast 2 characters long"),
  async (req, res) => {
    try {
      const validation = validationResult(req);
      if (!validation.isEmpty()) {
        return res.json({
          success: false,
          message: "Validation in login failed",
          errors: validation.array(),
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select(
        "firstName lastName email _id password"
      );

      if (!user) {
        return res.json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const validatePassword = await verifyPassword(password, user.password);
      if (!validatePassword) {
        return res.json({
          success: false,
          message: "Invalid Password",
          data: null,
        });
      }
      console.log(user);
      const token = generateAuthToken({
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        initials: user.initials,
      });
      return res.send({
        message: "Validation successfull in login.",
        success: true,
        data: {
          token,
        },
      });
    } catch (error) {
      logger.error(error.message);
      return res.json({
        message: error.message,
        success: false,
        data: null,
      });
    }
  }
);

// route for forgot password

router.post(
  "/forgot-password",
  body("email").isEmail().withMessage("Please provide a valid email address"),
  async (req, res) => {
    try {
      const validation = validationResult(req);
      if (!validation.isEmpty()) {
        return res.json({
          success: false,
          message: "Validation in login failed",
          errors: validation.array(),
        });
      }
      const { email } = req.body;
      const user = await User.findOne({ email }).select("_id password");

      if (!user) {
        return res.json({
          success: false,
          message: "User not found",
        });
      }

      const token = generateResetToken({
        _id: user._id,
        email: user.email,
      });

      return res.send({
        message: "Validation successfull in forgot password.",
        success: true,
        data: {
          token,
          resetPassLink: "link",
        },
      });
    } catch (error) {
      logger.error(error.message);
      return res.json({
        message: error.message,
        success: false,
        data: null,
      });
    }
  }
);

// route for reset password
router.post(
  "/reset-password/:token",
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long"),
  param("token").isJWT().withMessage("Invalid Token"),
  async (req, res) => {
    try {
      const validation = validationResult(req);
      if (!validation.isEmpty()) {
        return res.json({
          success: false,
          message: "Validation in reset password failed",
          errors: validation.array(),
        });
      }
      const { password } = req.body;
      const { token } = req.params;

      const validToken = verifyResetToken(token);

      const { email } = validToken;

      await User.findOneAndUpdate(
        {
          email,
        },
        {
          password,
        }
      );

      return res.send({
        message: "Validation successfull in reset password.",
        success: true,
        data: {
          success : true,
          message : "Password changed!"
        },
      });
    } catch (error) {
      logger.error(error.message);
      return res.json({
        message: error.message,
        success: false,
        data: null,
      });
    }
  }
);

export default router;
