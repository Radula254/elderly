import mongoose, { model, models, Schema } from "mongoose";

const ActivitySchema = new Schema({
  name: String,
});

const MembersSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  image: String,
  country: String,
});

const GroupSchema = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    category: { type: mongoose.Types.ObjectId },
    activity: { type: [ActivitySchema] },
    accepted: { type: Boolean, default: false },
    rejected: { type: Boolean, default: false },
    email: { type: String, required: true },
    members: { type: [MembersSchema] },
    venue: { type: String },
    announcements: { type: String },
    objectives: { type: String },
  },
  { timestamps: true }
);

export const Group = models?.Group || model("Group", GroupSchema);
