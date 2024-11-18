import { Group } from "@/app/models/table_groups";
import mongoose from "mongoose";

export async function GET() {
  mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);
  return Response.json(await Group.find());
}
