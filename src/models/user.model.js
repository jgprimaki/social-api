import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name_complete: String,
    email: String,
    birthday: String,
    theme_dark: Boolean,
    phone: String,
    studying: Boolean,
    pis: {
      type: String,
      index: true
    },
    keycloak_uuid: {
      type: String,
      index: true,
      unique: true
    },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "teams"
      }
    ],
    cake_teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cake_teams"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("user", UserSchema);
