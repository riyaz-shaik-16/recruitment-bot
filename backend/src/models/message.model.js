import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      enum: ["user", "bot"],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);

