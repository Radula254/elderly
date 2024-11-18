import { model, models, Schema } from "mongoose";

const CaregiverSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    DOB: { type: Date },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String,required: true },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    caregiver: {type: Boolean, default: false},
    accepted: { type: Boolean, default: false },
    rejected: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Caregiver = models?.Caregiver || model('Caregiver', CaregiverSchema);

