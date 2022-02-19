import mongoose from "mongoose";

const assignmentSchema = mongoose.Schema(
  {
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Staff",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Subject",
    },
    topicName: {
      type: String,
      required: true,
    },
    topicURL: {
      type: String,
      required: true,
    },
    due: {
      type: Date,
      required: true,
    },
    studentAssigned: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
