"use client"
import { useState, useEffect } from "react";
import { useProfile } from "@/components/UseProfile";

export default function ContactMessagesTable() {
  const [messages, setMessages] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetch("/api/contact")  
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, []);

  if (profileLoading) {
    return "Loading ...";
  }

  return (
    <section className="mx-auto mt-8 mb-20 pb-10 px-3">
      <h1 className="text-center font-bold text-xl underline mb-3">Contact Us Messages</h1>
      <div className="overflow-x-auto table-container">
        <table className="table">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {messages.map((msg) => (
              <tr key={msg._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{msg?.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{msg?.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{msg?.email}</td>
                <td className="px-6 py-4 whitespace-wrap">{msg?.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
