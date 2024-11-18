"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully");
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message");
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-green-100 to-blue-200 min-h-screen flex flex-col items-center justify-center p-14">
        <div className="w-full max-w-4xl mx-auto bg-gradient-to-r from-green-100 to-blue-200 rounded-lg shadow-lg overflow-hidden md:flex">
          <div className="hidden md:block md:w-1/2 relative">
            <Image
              src="/contact.jpg"
              alt="Contact Us"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
              Contact Us
            </h1>
            <p className="text-gray-700 mb-6 text-center">
              We value your feedback, questions, and suggestions. Please feel
              free to reach out to us using the form below or the contact
              information provided.
            </p>
            <p className="text-gray-700 mb-4 text-center">
              <strong>Phone:</strong> +XXX-XXX-XXX-XXX
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <footer className="p-10 text-center bg-gradient-to-r from-green-200 via-blue-200 to-blue-400">
        <div className="space-y-4">
          <p>&copy; 2024 ElderElevation. All rights reserved.</p>
          <p>Contact us: info@elderelevation.com</p>
        </div>
      </footer>
    </>
  );
}
