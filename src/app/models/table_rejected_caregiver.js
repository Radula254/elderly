import { model, models, Schema } from "mongoose";

const RejectedCaregiverSchema = new Schema(
  {
    name: { type: String},
    email: { type: String, required: true, unique: true },
    image: { type: String },
    DOB: { type: Date },
    phone: { type: String },
    city: { type: String },
    country: { type: String },
    gender: { type: String, enum: ['male', 'female'] },
    rejected: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const RejectedCaregiver = models?.RejectedCaregiver || model('RejectedCaregiver', RejectedCaregiverSchema);

