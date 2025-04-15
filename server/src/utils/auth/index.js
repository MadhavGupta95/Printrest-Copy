import bcrypt from "bcryptjs";
import logger from "../logger";
import jwt from "jsonwebtoken";

const hashPassword = async (password) => {
  try {
    const salt = bcrypt.genSalt(10);
    const hashedPass = bcrypt.hash(password, salt);
    return hashedPass;
  } catch (error) {
    logger.error(error.message);
    return null;
  }
};

const verifyPassword = async (password, hashedPassword) => {
  try {
    const verifyPass = await bcrypt.compare(password, hashedPassword);
    return verifyPass;
  } catch (error) {
    logger.error(error.message);
    return null;
  }
};

const generateAuthToken = (payload) => {
  return jwt.sign(payload, process.env.AUTH_JWT_SECRET, {
    expiresIn: "1d",
  });
};

const verifyAuthToken = (token) => {
  return jwt.verify(token, process.env.AUTH_JWT_SECRET);
};

const generateResetToken = (payload) => {
  return jwt.sign(payload, process.env.RESET_PASSWORD_JWT_SECRET, {
    expiresIn: 300,
  });
};

const verifyResetToken = (token) => {
  return jwt.verify(token, process.env.RESET_PASSWORD_JWT_SECRET);
};

export {
  hashPassword,
  verifyPassword,
  generateAuthToken,
  verifyAuthToken,
  generateResetToken,
  verifyResetToken,
};
