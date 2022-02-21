import mongoose from "mongoose";

const resourceSchema = mongoose.Schema(
  {
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
