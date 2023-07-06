import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("teams", TeamSchema);
