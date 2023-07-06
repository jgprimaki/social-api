import mongoose from "mongoose";

const CakeSchedule = new mongoose.Schema(
  {
    name: String,
    date_start: String,
    date_end: String,
    active: Boolean,
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cake_member"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("cake_schedule", CakeSchedule);
