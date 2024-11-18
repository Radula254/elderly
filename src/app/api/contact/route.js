import mongoose from "mongoose";
import { Contact } from "@/app/models/table_contact";

export async function POST(req) {
  try {
    const { firstName, lastName, email, message } = await req.json();

    await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      message,
    });

    await newContact.save();

    return new Response("Contact form submitted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error submitting contact form", { status: 500 });
  }
}

export async function GET() {
  mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);
  const messages = await Contact.find();

  return new Response(JSON.stringify(messages), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
