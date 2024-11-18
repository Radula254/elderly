import mongoose from 'mongoose';
import { Group } from '@/app/models/table_groups';

export async function GET(req, res) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);

  const groups = await Group.find({}, 'name members').lean();
  const groupData = groups.map(group => ({
    name: group.name,
    membersCount: group.members.length
  }));

  return Response.json(groupData);
}
