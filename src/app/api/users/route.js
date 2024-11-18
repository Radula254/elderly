import mongoose from 'mongoose';
import { User } from "@/app/models/table_users";
import { UserInfo } from "@/app/models/table_usersInfo";

export async function GET() {
    mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);
    const users = await User.find();

    const usersWithDetails = [];

    for (const user of users) {
        const userInfo = await UserInfo.findOne({ email: user.email }).lean();
        usersWithDetails.push({
            ...user.toObject(),
            userInfo
        });
    }

    return Response.json(usersWithDetails);
}

// export async function GET(req, res) {
//     mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);
//     const { gender, age } = req.query;
  
//     const filters = {};
//     if (gender) filters.gender = gender;
//     if (age) {
//       const birthYear = new Date().getFullYear() - age;
//       filters.DOB = { $gte: new Date(`${birthYear}-01-01`), $lte: new Date(`${birthYear}-12-31`) };
//     }
  
//     const users = await UserInfo.find(filters).lean();
//     res.json(users);
//   }