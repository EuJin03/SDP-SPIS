import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { __salt } from "../constant.js";

const staffSchema = mongoose.Schema({
  image: {
    type: String,
    default: "",
  },
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  course: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  resetToken: {
    type: String,
  },
});

staffSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware
staffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
