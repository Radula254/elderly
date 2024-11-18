import { model, models, Schema } from "mongoose";

const ContactSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
    },
    message: {
      type: String,
      required: [true, "Please provide a message"],
    },
  },
  {
    timestamps: true,
  }
);

export const Contact = models?.Contact || model("Contact", ContactSchema);
