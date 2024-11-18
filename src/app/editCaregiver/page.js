"use client";
import CaregiverForm from "@/components/layout/CaregiverForm";
import NavBar from "@/components/layout/NavBar";
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
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/caregiver").then((response) => {
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
      const response = await fetch("/api/caregiver", {
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
    return redirect("/login");
  }

  return (
    <section className="my-14">
      <NavBar isAdmin={isAdmin} />
      <div className="mx-auto max-w-lg my-5">
        <Link href="/caregiver">
          <button className="rounded-full bg-white px-2 ml-2">
            Caregiver Profile
          </button>
        </Link>
      </div>
      <div className="max-w-2xl mx-auto mt-5">
        <CaregiverForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}
