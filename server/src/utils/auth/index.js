import bcrypt from "bcryptjs";

const hashPassword = async (password) => {
  try {
    const salt = bcrypt.genSalt(10);
    const hashedPass = bcrypt.hash(password, salt);
    return hashedPass
  } catch (error) {
    logger.error(error.message);
    return null;
  }
};

export {
    hashPassword,
}