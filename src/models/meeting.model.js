import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    start_date: {
      type: String,
      required: true
    },
    end_date: {
      type: String,
      required: true
    },
    start_time: {
      type: String,
      required: true
    },
    end_time: {
      type: String,
      required: true
    },
    description: String,
    color: String,
    room: {
      type: Number,
      enum: [1, 2],
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
      }
    ],
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("meeting", MeetingSchema);
