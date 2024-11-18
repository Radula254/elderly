import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: {type: String},
    confirmPassword: {type: String},
    image: { type: String },
    admin: {type: Boolean, default: false},
    isVerified: {type: Boolean, default: false},
    passwordResetToken: {type: String},
    passwordResetExpires: {type: Date},
    verifyToken: {type: String},
    verifyTokenExpires:  {type: Date},
    caregiver: {type: Boolean, default: false},
  },
  { timestamps: true }
);

export const User = models?.User || model('User', UserSchema);

