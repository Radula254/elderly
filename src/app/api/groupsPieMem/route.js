// api/groups/members.js
import { Group } from '@/app/models/table_groups';
import mongoose from 'mongoose';

export async function GET(req, res) {
  mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);

  const groups = await Group.find().lean();

  const groupMemberData = groups.map(group => ({
    name: group.name,
    memberCount: group.members.length
  }));

  return Response.json(groupMemberData);
}
