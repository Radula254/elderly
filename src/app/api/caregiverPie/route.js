// api/users/caregivers.js
import mongoose from 'mongoose';
import { User } from '@/app/models/table_users';
import { Caregiver } from '@/app/models/table_caregiver';

export async function GET(req, res) {
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);

  const users = await User.find({}, 'email').lean();
  const caregivers = await Caregiver.find({}, 'email').lean();

  const caregiversSet = new Set(caregivers.map(caregiver => caregiver.email));
  let caregiversCount = 0;
  let nonCaregiversCount = 0;

  users.forEach(user => {
    if (caregiversSet.has(user.email)) {
      caregiversCount += 1;
    } else {
      nonCaregiversCount += 1;
    }
  });

  return Response.json({
    caregivers: caregiversCount,
    nonCaregivers: nonCaregiversCount
  });
}
