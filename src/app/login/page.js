"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState("");

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      setError(result.error);
    } else {
      window.location.href = "/profile";
    }

    setLoginInProgress(false);
  }

  return (
    <section className="pt-12 flex items-start justify-center bg-gradient-to-r from-green-100 to-blue-200 min-h-[calc(100vh-56px)]">
      <div className="bg-white p-8 mt-14 rounded-lg shadow-md w-full max-w-md bg-gradient-to-r from-green-100 to-blue-200">
        <h1 className="text-center text-2xl font-bold mb-4">Log In</h1>
        {error && (
          <div className="my-4 text-center text-red-500">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              disabled={loginInProgress}
              onChange={(ev) => setEmail(ev.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              disabled={loginInProgress}
              onChange={(ev) => setPassword(ev.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={loginInProgress}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            LOGIN
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-500">
            Forgot Password?{" "}
            <Link className="underline text-blue-500" href={"/forgotPassword"}>
              Reset here &raquo;
            </Link>
          </p>
          <p className="text-gray-500 mt-2">
            Don&apos;t have an account?{" "}
            <Link className="underline text-blue-500" href={"/register"}>
              Register here &raquo;
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
