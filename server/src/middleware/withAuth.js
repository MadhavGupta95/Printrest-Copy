import { verifyAuthToken } from "../utils/auth";
import logger from "../utils/logger";

export const withAuth = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) {
      return res.json({
        success: false,
        message: "Token is required.",
        data: null,
      });
    }
    const decodedToken = verifyAuthToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    logger.error(error.message);
    return res.json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};
