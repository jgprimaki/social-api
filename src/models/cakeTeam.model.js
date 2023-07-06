import mongoose from "mongoose";

const CakeTeam = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true
    },
    week_day: String,
    schedule: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cake_schedule"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("cake_teams", CakeTeam);
