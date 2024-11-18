import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "@/app/models/table_users";
import crypto from "crypto";
import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

function generateNumericToken(length) {
  let token = "";
  for (let i = 0; i < length; i++) {
    token += Math.floor(Math.random() * 10).toString();
  }
  return token;
}

export async function POST(req) {
  const body = await req.json();

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json({ message: "Email is already in use" }, { status: 400 });
    }

    const notHashedPassword = body.password;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(notHashedPassword, salt);

    const verifyCode = generateNumericToken(6);
    const verifyToken = crypto
      .createHash("sha256")
      .update(verifyCode)
      .digest("hex");

    const verifyTokenExpires = Date.now() + 365 * 24 * 60 * 60 * 1000;

    const newUser = {
      name: body.name,
      email: body.email,
      password: body.password,
      verifyToken,
      verifyTokenExpires,
    };

    const createdUser = await User.create(newUser);

    const message = `Please use this code for verification: ${verifyCode}`;
    const email = body.email;

    sgMail.setApiKey(process.env.NEXT_PUBLIC_SG_KEY);

    const msg = {
      to: email,
      from: "elderelevation@gmail.com",
      subject: "Email verification code",
      text: message,
      html: `<p>${message}</p>`,
    };

    await sgMail.send(msg);

    return NextResponse.json({ message: "User created successfully. Verification code sent to the email" }, { status: 200 });
  } catch (error) {
    console.error("Error during user registration:", error);
    if (error.code === 11000) {
      return NextResponse.json({ message: "Email is already in use" }, { status: 400 });
    }
    return NextResponse.json({ message: "There was an error. Try again later" }, { status: 500 });
  }
}
