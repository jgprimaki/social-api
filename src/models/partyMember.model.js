import mongoose from "mongoose";

const PartyMemberSchema = new mongoose.Schema(
  {
    confirmed: Boolean,
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("party_member", PartyMemberSchema);
