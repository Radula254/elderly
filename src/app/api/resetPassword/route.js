import mongoose from "mongoose";
import { User } from "@/app/models/table_users";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { password, email } = await req.json();

  await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return new Response("User not found", { status: 404 });
  }

  const hashedPassword = await bcrypt.hash(password, 8);
  existingUser.password = hashedPassword;
  existingUser.passwordResetToken = undefined;
  existingUser.passwordResetExpires = undefined;

  try {
    await existingUser.save();
    return new Response("User's Password is updated", { status: 200 });
  } catch (err) {
    return new Response("Error updating user's password", { status: 500 });
  }
}
