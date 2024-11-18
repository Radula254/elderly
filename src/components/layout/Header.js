"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useProfile } from "../UseProfile";
import SessionLock from "../SessionLock";


export default function Header() {
  const { session, status } = useSession();
  const { loading: profileLoading, data: profileData } = useProfile();
  const userData = session?.user;
  let isAdmin = profileData?.admin;
  let userName = profileData?.name || profileData?.email;
  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  return (
    <header className="flex items-center justify-between bg-gradient-to-r from-green-200 via-blue-200 to-blue-400 w-full h-20">
      <Link className="text-gray-700 font-semibold text-2xl mx-5" href="/">
        ElderElevation
      </Link>
      <nav className="flex items-center gap-7 text-gray-700 font-semibold">
        <Link href={"/"}>Home</Link>
        <Link href="/aboutUs">About Us</Link>
        <Link href={"/contact"}>Contact</Link>
        {status === "authenticated" && (
          <>
            <Link href={"/groups/all"}>Groups</Link>
            <Link href={"/caregiver/all"}>Caregivers</Link>
          </>
        )}
        {isAdmin && (
          <>
            <Link href={"/admin/dashboard"}>DashBoard</Link>
          </>
        )}
      </nav>
      {status === "authenticated" && (
        <nav className="flex items-center gap-7 text-gray-700 font-semibold">
          <Link className="whitespace-nowrap" href={"/profile"}>
            <div className="flex gap-1 items-center rounded-full border border-gray-500 py-1 px-2">
              <svg
                className="h-7 w-7 text-gray-500 relative"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {userName}
            </div>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="bg-primary rounded-full text-white px-8 py-2 mr-2"
          >
            Logout
          </button>
          <SessionLock />
        </nav>
      )}
      {status === "unauthenticated" && (
        <nav className="flex items-center gap-7 text-gray-700 font-semibold">
          <Link href={"/login"}>Log in</Link>
          <Link
            href={"/register"}
            className="bg-primary rounded-full text-white px-8 py-2 mr-2"
          >
            Sign Up
          </Link>
        </nav>
      )}
    </header>
  );
}
