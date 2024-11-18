"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ResetPasswordPage({ params }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await fetch("/api/verifyToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: params.token,
          }),
        });
        if (res.status === 400) {
          setError("Invalid Token");
          setVerified(true);
        }
        if (res.status === 200) {
          setError("");
          setVerified(true);
          const userData = await res.json();
          setUser(userData);
        }
      } catch (error) {
        setError("Error, try again");
      }
    };
    verifyToken();
  }, [params.token]);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const resetPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, email: user?.email }),
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(resetPromise, {
      loading: "Resetting password...",
      success: "Password reset successfully. Please login",
      error: "Failed to reset password",
    });

    setLoading(false);
    
  }

  if (sessionStatus === "loading" || !verified) {
    return <h1>Loading...</h1>;
  }

  return (
    <section className="pt-10 flex items-start justify-center bg-gradient-to-r from-green-100 to-blue-200 min-h-[calc(100vh-56px)]">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md bg-gradient-to-r from-green-100 to-blue-200">
        <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto mt-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 "
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 "
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
          <p className="text-red-600 text-[16px] mb-4 mt-2 text-center">{error && error}</p>
        </form>
        <div className="max-w-2xl mx-auto mt-8 ">
          <Link href="/login" className="button">
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
