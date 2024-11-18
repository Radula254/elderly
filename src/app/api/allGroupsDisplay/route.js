import { Group } from "@/app/models/table_groups";
import { Category } from "@/app/models/table_groupCat";
import mongoose from "mongoose";

export async function GET() {
  mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);

  const groups = await Group.find().lean();
  const categories = await Category.find().lean();

  const categoryMap = categories.reduce((acc, category) => {
    acc[category._id] = category.name;
    return acc;
  }, {});

  const groupsWithCategoryNames = groups.map(group => ({
    ...group,
    categoryName: categoryMap[group.category] || "N/A",
  }));

  return Response.json(groupsWithCategoryNames);
}
