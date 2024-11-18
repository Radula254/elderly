import mongoose from 'mongoose';
import { Caregiver } from '@/app/models/table_caregiver';

export async function GET(req, res) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);

  const acceptedCount = await Caregiver.countDocuments({ accepted: true });
  const rejectedCount = await Caregiver.countDocuments({ rejected: true });

  return Response.json({
    accepted: acceptedCount,
    rejected: rejectedCount
  });
}
