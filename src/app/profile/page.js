"use client";
import NavBar from "@/components/layout/NavBar";
import UserForm from "@/components/layout/UserForm";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const {status} = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
          setIsVerified(data.isVerified);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Saved!",
      error: "Error saving!",
    });
  }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect('/login');
  }

  return (
    <>
      {isVerified ? (
        <section className="my-14">
          <NavBar isAdmin={isAdmin} />
          <div className="max-w-2xl mx-auto mt-5">
            <UserForm user={user} onSave={handleProfileInfoUpdate} />
          </div>
        </section>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-md text-center">
            <h2 className="text-xl font-bold mb-4">Account Not Verified</h2>
            <p className="mb-4">Please verify your account to access this page.</p>
            <Link href="/verifyCode" className="text-blue-500 underline">
              Go to Verification Page
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
