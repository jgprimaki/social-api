import mongoose from "mongoose";

const PartySchema = new mongoose.Schema(
  {
    name: String,
    date: String,
    locale: String,
    note: String,
    time_start: String,
    time_end: String,
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "party_member"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("party", PartySchema);
