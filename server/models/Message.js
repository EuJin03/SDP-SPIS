import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
  msg: {
    type: String,
    required: true,
  },
});

const Msg = mongoose.model("msg", msgSchema);

export default Msg;
