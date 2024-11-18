import { Caregiver } from "@/app/models/table_caregiver";
import { RejectedCaregiver } from "@/app/models/table_rejected_caregiver";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);
  const { email, ...data } = await req.json();
  const caregiverDoc = await Caregiver.create({ ...data, email });
  return new Response(JSON.stringify(caregiverDoc), { status: 200 });
}

export async function PUT(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);
  const { _id, email, ...data } = await req.json();
  
  // Ensure accepted is true and rejected is false
  data.accepted = true;
  data.rejected = false;

  const caregiver = await Caregiver.findById(_id);

  if (!caregiver) {
    // If caregiver does not exist, create it
    await Caregiver.create({ ...data, email, accepted: true, rejected: false });
  } else {
    // Update existing caregiver
    await Caregiver.findByIdAndUpdate(_id, data);
  }

  // Remove from RejectedCaregiver if it exists
  await RejectedCaregiver.findOneAndDelete({ name: caregiver.name });

  return new Response(JSON.stringify(true), { status: 200 });
}

export async function GET() {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);

  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return new Response(JSON.stringify({}), { status: 200 });
  }

  const caregivers = await Caregiver.find({ email }).lean();
  return new Response(JSON.stringify(caregivers), { status: 200 });
}

export async function DELETE(req) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  const caregiver = await Caregiver.findById(_id);

  if (caregiver) {
    await RejectedCaregiver.create({
      name: caregiver.name,
      description: caregiver.description,
      image: caregiver.image,
      activity: caregiver.activity,
      email: caregiver.email,
    });

    await Caregiver.updateOne({ _id }, { $set: { rejected: true, accepted: false } });
    return new Response(JSON.stringify(true), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: "Caregiver not found" }), { status: 404 });
  }
}
