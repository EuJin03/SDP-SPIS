import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = mongoose.Schema(
  {
    studentID: {
      type: String,
      required: true,
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
      required: true,
      ref: "Course",
    },
    assignments: [
      {
        name: {
          type: String,
          required: true,
        },
        grade: {
          type: Number,
          required: true,
          default: 0,
          min: 0,
          max: 100,
        },
        submission: {
          type: Boolean,
          required: true,
          default: false,
        },
        due: {
          type: Date,
          required: true,
        },
        assignment: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Assignment",
        },
      },
    ],
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
