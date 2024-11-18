// components/SessionLock.js

"use client";
import { useState, useEffect } from "react";
import { signOut, signIn } from "next-auth/react";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/solid";

export default function SessionLock() {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    // Retrieve the locked state from local storage
    const lockedState = localStorage.getItem("sessionLocked");
    if (lockedState === "true") {
      setIsLocked(true);
    }
  }, []);

  const handleLockClick = () => {
    setIsLocked(true);
    localStorage.setItem("sessionLocked", "true");
    if (document.referrer) {
      window.location.href = document.referrer;
    } else {
      window.location.href = "/";
    }
  };

  const handleUnlockClick = () => {
    setIsLocked(false);
    localStorage.setItem("sessionLocked", "false");
    window.location.href = "/locked";
  };

  return (
    <div className="flex items-center gap-4">
      {isLocked ? (
        <button onClick={handleUnlockClick} className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-lg mr-2">
          <LockOpenIcon className="h-5 w-5" />
        </button>
      ) : (
        <button onClick={handleLockClick} className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-lg mr-2">
          <LockClosedIcon className="h-5 w-5 " />
        </button>
      )}
    </div>
  );
}
