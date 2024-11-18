import mongoose from "mongoose";
import { User } from "@/app/models/table_users";
import crypto from "crypto";

export async function POST(req) {
    const { token } = await req.json(); 

    mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);
    const token1 = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({passwordResetToken: token1, passwordResetExpires: {$gt: Date.now()}});

    if (!user) {
        return Response.json("Token is invalid", { status: 400 });
    }
    
    return Response.json((user), { status: 200 });
}
