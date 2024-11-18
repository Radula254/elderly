// api/groups/stats.js
import { Group } from '@/app/models/table_groups';
import mongoose from 'mongoose';

export async function GET(req, res) {
  mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);

  const acceptedCount = await Group.countDocuments({ accepted: true, rejected: false });
  const rejectedCount = await Group.countDocuments({ rejected: true });
  const neitherCount = await Group.countDocuments({ accepted: false, rejected: false });

  return Response.json({
    accepted: acceptedCount,
    rejected: rejectedCount,
    neither: neitherCount
  });
}
