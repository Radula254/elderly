import { RejectedGroup } from "@/app/models/table_rejected";
import mongoose from "mongoose";

export async function GET() {
    mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);
    return Response.json(
        await RejectedGroup.find()
    )
}
