import mongoose from "mongoose";

const ReadmeSchema = new mongoose.Schema(
  {
    readme_id: {
      type: String,
      unique: true
    },
    create_time: String,
    name: String,
    send_time: String,
    total_items: Number,
    document: String,
  },
  { timestamps: true }
);

export default mongoose.model("readme", ReadmeSchema);
