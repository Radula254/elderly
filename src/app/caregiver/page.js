"use client";
import CaregiverForm from "@/components/layout/CaregiverForm";
import NavBar from "@/components/layout/NavBar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import countriesList from "react-select-country-list";
import Link from "next/link";

export default function ProfilePage() {
  const session = useSession();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCaregiver, setIsCaregiver] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/caregiver").then((response) => {
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
          setIsCaregiver(data.caregiver);
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
        window.location.href = "/profile";
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

  function getFullCountryName(code) {
    const countries = countriesList().getData();
    const country = countries.find((country) => country.value === code);
    return country ? country.label : code;
  }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const renderCaregiverStatus = () => {
    if (user?.caregiver) {
      if (user.accepted) {
        return (
          <div className="mt-14">
            <NavBar isAdmin={isAdmin} />
            <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-green-200 via-blue-200 to-blue-400 shadow-xl rounded-lg text-center mt-5 mb-14 transform transition duration-500 hover:scale-105">
              <h1 className="font-bold italic text-2xl my-3">Caregiver</h1>
              <div className="flex justify-center mb-4">
                <Image
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
                  src={user?.image}
                  alt={user?.name}
                  width={128}
                  height={128}
                />
              </div>
              <div className="p-4">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{user?.name}</h2>
                <p className="text-gray-500 mb-1">{user?.email}</p>
                <p className="text-gray-500 mb-1">{user?.phone}</p>
                <p className="text-gray-500 mb-1">{user?.city}</p>
                <p className="text-gray-500 mb-1">{getFullCountryName(user?.country)}</p>
                <p className="text-gray-500">{user?.gender === "male" ? "Male" : "Female"}</p>
              </div>
              <div>
                <Link href="/editCaregiver">
                  <button className="border rounded-full bg-primary px-2 ml-2">Edit Details</button>
                </Link>
              </div>
            </div>
          </div>
        );
      } else if (user.rejected) {
        return (
          <div className="mt-14">
            <NavBar isAdmin={isAdmin} />
            <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-green-100 to-blue-200 shadow-xl rounded-lg text-center mt-5 mb-14">
              <h1 className="font-bold italic text-2xl my-3">Caregiver Status</h1>
              <p className="text-red-600 font-semibold">Caregiver status: Rejected</p>
            </div>
          </div>
        );
      } else {
        return (
          <div className="mt-14">
            <NavBar isAdmin={isAdmin} />
            <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-green-100 to-blue-200 shadow-xl rounded-lg text-center mt-5 mb-14">
              <h1 className="font-bold italic text-2xl my-3">Caregiver Status</h1>
              <p className="text-yellow-600 font-semibold">Caregiver status: Pending</p>
            </div>
          </div>
        );
      }
    } else {
      return (
        <section className="my-14">
          <NavBar isAdmin={isAdmin} />
          <div className="max-w-2xl mx-auto mt-5">
            <CaregiverForm user={user} onSave={handleProfileInfoUpdate} />
          </div>
        </section>
      );
    }
  };

  return <>{renderCaregiverStatus()}</>;
}
