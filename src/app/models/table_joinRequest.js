import mongoose from "mongoose";

const JoinRequestSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["pending", "accepted", "denied"], default: "pending" },
  requestedAt: { type: Date, default: Date.now },
});

export const JoinRequest = mongoose.model("JoinRequest", JoinRequestSchema);
