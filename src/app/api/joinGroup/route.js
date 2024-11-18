import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { Group } from "@/app/models/table_groups";
import { UserInfo } from "@/app/models/table_usersInfo";
import { User } from "@/app/models/table_users";

export async function PUT(req) {
  mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const userEmail = session.user.email;
  const { _id } = await req.json();
  if (!_id) {
    return new Response('Group ID is required', { status: 400 });
  }

  const user = await User.findOne({ email: userEmail });
  const userInfo = await UserInfo.findOne({ email: userEmail });

  const memberDetails = {
    name: user.name,
    email: user.email,
    phone: userInfo.phone,
    image: user.image,
    country: userInfo.country,
  };

  const updatedGroup = await Group.findByIdAndUpdate(
    _id,
    { $addToSet: { members: memberDetails } },
    { new: true }
  );

  await UserInfo.findOneAndUpdate(
    { email: userEmail },
    { $addToSet: { groups: _id } },
    { new: true }
  );

  return new Response(JSON.stringify(updatedGroup), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(req) {
  mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);

  const session = await getServerSession(authOptions);
  const userEmail = session.user.email;
  const { _id } = await req.json();
  if (!_id) {
    return new Response('Group ID is required', { status: 400 });
  }

  const user = await User.findOne({ email: userEmail });

  const updatedGroup = await Group.findByIdAndUpdate(
    _id,
    { $pull: { members: { email: userEmail } } },
    { new: true }
  );

  await UserInfo.findOneAndUpdate(
    { email: userEmail },
    { $pull: { groups: _id } },
    { new: true }
  );

  return new Response(JSON.stringify(updatedGroup), {
    headers: { 'Content-Type': 'application/json' },
  });
}