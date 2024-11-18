import mongoose from "mongoose";
import { User } from "@/app/models/table_users";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

export async function POST(req) {
  const body = await req.json();
  await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);

  const user = await User.findOne({ email: body.email });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  const passwordResetExpires = Date.now() + 10 * 60 * 1000;

  await User.updateOne(
    { email: body.email },
    {
      passwordResetToken,
      passwordResetExpires,
    }
  );

  const resetUrl = `http://localhost:3000/resetPassword/${resetToken}`;
  const message = `We have received a password reset request. Please use the link below to reset your password:\n\n${resetUrl}\n\nThis reset password link will be valid for only 10 minutes.`;

  const email = user.email

  sgMail.setApiKey(process.env.NEXT_PUBLIC_SG_KEY);

  const msg = {
    to: email,
    from: "elderelevation@gmail.com",
    subject: "Password Reset Request",
    text: message,
    html: message,
  };

  sgMail
    .send(msg)
    .then(() => {
      return new Response("Password reset email sent", { status: 200 });
    })
    .catch(async (error) => {
      await User.updateOne(
        { email: user.email },
        {
          passwordResetToken: undefined,
          passwordResetExpires: undefined,
        }
      );

      return new Response("There was an error. Try again later.", {
        status: 400,
      });
    });

  try {
    await user.save();
    return new Response("Password reset email sent", { status: 200 });
  } catch (error) {
    return new Response("There was an error. Try again later.", {
      status: 500,
    });
  }
}
