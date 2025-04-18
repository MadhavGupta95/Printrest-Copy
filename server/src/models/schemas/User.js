// model (schema) for user credentials in mongoose

import mongoose from "mongoose";
import { hashPassword } from "../../utils/auth";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is requred"],
      trim: true,
      maxlength: 20,
      minlength: 1,
    },
    lastName: {
      type: String,
      required: [true, "Last name is requred"],
      trim: true,
      maxlength: 20,
      minlength: 1,
    },
    email: {
      type: String,
      required: [true, "Email is requred"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is requred"],
      trim: true,
      minlength: 3,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    lastLogin: [{ type: Date }],
    deleted: {
      type: Boolean,
      default: false,
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true, //attach a timestamp to every document that we add inside the document
  }
);

// virtual field
UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual("initials").get(function () {
  return `${this.firstName[0]}${this.lastName[0]}`;
});

// this hook will run everytime the document is saved, but we also want that when the document is updated, save it as well
UserSchema.pre("save", async function (next) {
  if (this.isModified('password')) {
    //'this' references to the document that have been created
    const hashedPassword = await hashPassword(this.password);
    if (hashedPassword) {
      this.password = hashedPassword;
      next();
    }
  } else {
    next(new Error("Could not hash password"));
  }
});

export default mongoose.model("User", UserSchema);
