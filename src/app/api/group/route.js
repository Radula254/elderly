import { Group } from "@/app/models/table_groups";
import { RejectedGroup } from "@/app/models/table_rejected";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);
  const { email, ...data } = await req.json();
  const groupDoc = await Group.create({ ...data, email });
  return Response.json(groupDoc);
}

export async function PUT(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);
  const { _id, email, ...data } = await req.json();
  
  // Ensure accepted is true and rejected is false
  data.accepted = true;
  data.rejected = false;

  const group = await Group.findById(_id);

  if (!group) {
    // If group does not exist, create it
    await Group.create({ ...data, email, accepted: true, rejected: false });
  } else {
    // Update existing group
    await Group.findByIdAndUpdate(_id, data);
  }

  // Remove from RejectedGroup if it exists
  await RejectedGroup.findOneAndDelete({ name: group.name });

  return new Response(JSON.stringify(true), { status: 200 });
}

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);

  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return Response.json({});
  }

  const groups = await Group.find({ email }).lean();
  return Response.json(groups);
}

export async function DELETE(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  const group = await Group.findById(_id);

  if (group) {
    await RejectedGroup.create({
      name: group.name,
      description: group.description,
      image: group.image,
      activity: group.activity,
      email: group.email,
    });

    await Group.updateOne({ _id }, { $set: { rejected: true, accepted: false } });
    return new Response(JSON.stringify(true), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: "Group not found" }), { status: 404 });
  }
}
