import mongoose from "mongoose";

const CakeMember = new mongoose.Schema(
  {
    date: String,
    active: Boolean,
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("cake_member", CakeMember);
