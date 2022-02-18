import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
  },
});

const courseSchema = mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    subjects: [subjectSchema],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
