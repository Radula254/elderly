"use client";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    const minLength = 8;
    const specialCharRegex = /[@$&*#!]/;
    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!specialCharRegex.test(password)) {
      return "Password must include one or more special characters (@$&*#!).";
    }
    return "";
  };

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError("");
    setUserCreated(false);
    setPasswordError("");

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      setCreatingUser(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "An error has occurred.");
      } else {
        setUserCreated(true);
        setEmailSent(true);
        window.location.href = "/verifyCode";
      }
    } catch (err) {
      setError("There was an error. Try again later.");
    } finally {
      setCreatingUser(false);
    }
  }

  return (
    <section className="pt-10 flex items-start justify-center bg-gradient-to-r from-green-100 to-blue-200 min-h-[calc(100vh-56px)]">
      <div className="bg-white p-8 mt-11 rounded shadow-md w-full max-w-md bg-gradient-to-r from-green-100 to-blue-200">
        <h1 className="text-center text-2xl font-bold mb-4">Register</h1>
        {userCreated && (
          <div className="my-4 text-center">
            User created.
            <br />
            Now you can{" "}
            <Link className="underline text-blue-500" href={"/verifyCode"}>
              Verify &raquo;
            </Link>
          </div>
        )}
        {emailSent && (
          <div className="my-4 text-center">
            A verification code has been sent.
          </div>
        )}
        {error && (
          <div className="my-4 text-center text-red-500">
            {error}
          </div>
        )}
        {passwordError && (
          <div className="my-4 text-center text-red-500">
            {passwordError}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label className="block text-gray-700">First and Last Name</label>
            <input
              type="text"
              placeholder="First and last name"
              value={name}
              disabled={creatingUser}
              onChange={(ev) => setName(ev.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-opacity-50 "
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              disabled={creatingUser}
              onChange={(ev) => setEmail(ev.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-opacity-50 "
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              disabled={creatingUser}
              onChange={(ev) => setPassword(ev.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-opacity-50 "
            />
          </div>
          <button
            type="submit"
            disabled={creatingUser}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Already have an account?{" "}
          <Link className="underline text-blue-500" href={"/login"}>
            Login here &raquo;
          </Link>
        </div>
      </div>
    </section>
  );
}
