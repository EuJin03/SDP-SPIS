import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { __salt } from "../constant.js";

const studentSchema = mongoose.Schema(
  {
    studentID: {
      type: String,
      required: true,
      unique: true,
    },
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
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    assignments: [
      {
        grade: {
          type: Number,
          required: true,
          default: 0,
          min: 0,
          max: 100,
        },
        submissionFile: {
          type: String,
          default: "",
        },
        submission: {
          type: Boolean,
          required: true,
          default: false,
        },
        comments: {
          type: String,
          default: "",
        },
        assignment: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Assignment",
        },
      },
    ],
    resetToken: {
      type: String,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
