// Import necessary modules and models
import mongoose from 'mongoose';
import { User } from '@/app/models/table_users';
import { UserInfo } from '@/app/models/table_usersInfo';

// export async function GET(req) {
//   // Connect to MongoDB (adjust with your connection URL)
//   await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);

//   // Fetch users with associated user info
//   const users = await User.find().lean(); // Using .lean() for plain JavaScript objects

//   // Populate user info for each user
//   for (let user of users) {
//     const userInfo = await UserInfo.findOne({ email: user.email }).lean();
//     if (userInfo) {
//       user.userInfo = userInfo; // Attach userInfo to each user object
//     }
//   }
//   // Return users data
//   return Response.json(users);
// }

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

