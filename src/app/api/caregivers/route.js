import mongoose from "mongoose";
import { User } from "@/app/models/table_users";
import { Caregiver } from "@/app/models/table_caregiver";

export async function GET(req) {
  mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);

  const users = await User.find().lean();
  const caregivers = [];

  for (const user of users) {
    const caregiverInfo = await Caregiver.findOne({ email: user.email }).lean();
    if (caregiverInfo) {
      caregivers.push({ ...user, ...caregiverInfo });
    }
  }

  return new Response(JSON.stringify(caregivers), {
    headers: { "Content-Type": "application/json" }
  });
}
