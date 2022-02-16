import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    subjects: [String],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
