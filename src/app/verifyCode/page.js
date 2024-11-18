"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function VerifyPage() {
  const [verifyCode, setVerifyCode] = useState("");
  const [verifying, setVerifying] = useState(false);

  async function handleVerify() {
    setVerifying(true);

    const response = await fetch("/api/verification", {
      method: "POST",
      body: JSON.stringify({ verifyCode }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      toast.success("Verification successful. Return to profile");
      window.location.href = "/login";
    } else {
      toast.error("Verification failed. Please try again.");
    }

    setVerifying(false);
  }

  return (
    <div className="max-w-xl mx-auto mt-16">
      <h1 className="text-2xl font-bold mb-4">Verify Account</h1>
      <input
        type="text"
        placeholder="Enter verification code"
        value={verifyCode}
        onChange={(e) => setVerifyCode(e.target.value)}
        className="border border-gray-300 rounded-md py-2 px-4 mb-4"
      />
      <button
        onClick={handleVerify}
        disabled={verifying}
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        {verifying ? "Verifying..." : "Verify"}
      </button>
    </div>
  );
}
