import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    description: String,
    type: String,
    active: Boolean,
    icon: String,
    color: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  },
  { timestamps: true }
);

export default mongoose.model("notification", NotificationSchema);
