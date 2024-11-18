"use client";
import { useState } from "react";

export default function PasswordResetRequestPage() {
  const [email, setEmail] = useState("");
  const [requestingReset, setRequestingReset] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setRequestingReset(true);
    setError(false);
    setEmailSent(false);

    try {
      const response = await fetch("/api/forget", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to send password reset email");
      }

      setEmailSent(true);
    } catch (error) {
      setError(true);
    } finally {
      setRequestingReset(false);
    }
  }

  return (
    <section className="pt-12 flex items-start justify-center bg-gradient-to-r from-green-100 to-blue-200 min-h-[calc(100vh-56px)]">
      <div className="bg-white p-10 mt-14 rounded shadow-md w-full max-w-md bg-gradient-to-r from-green-100 to-blue-200">
        <h1 className="text-center text-2xl font-bold mb-4">Password Reset</h1>
        {emailSent && (
          <div className="my-4 text-center text-green-500">
            Password reset email sent.
            <br />
            Please check your inbox.
          </div>
        )}
        {error && (
          <div className="my-4 text-center text-red-500">
            An error has occurred.
            <br />
            Please try again later.
          </div>
        )}
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              disabled={requestingReset}
              onChange={(ev) => setEmail(ev.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-opacity-50 "
            />
          </div>
          <button
            type="submit"
            disabled={requestingReset}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {requestingReset ? "Sending..." : "Send Password Reset Email"}
          </button>
        </form>
      </div>
    </section>
  );
}
