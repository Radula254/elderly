"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { redirect } from "next/navigation";
import NavBar from "@/components/layout/NavBar";
import GroupForm from "@/components/layout/GroupForm";

export default function NewgroupsPage() {
  const session = useSession();
  const [userId, setUserId] = useState("");
  const [groups, setGroups] = useState(null);
  const [redirectToItems, setRedirectToItems] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setUserId(data._id);
          setIsVerified(data.isVerified);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/group", {
        method: "POST",
        body: JSON.stringify(data), 
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Submitting group...",
      success: "Group Submitted",
      error: "Error submitting...",
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/groups");
  }

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return redirect("/login");
  }

  return (
    <section className="my-8">
      <NavBar isAdmin={true} />
      <div className="max-w-3xl mx-auto mt-8">
        <Link href={"/groups"} className="button">
          <span>Show all groups</span>
        </Link>
      </div>
      <GroupForm groups={groups} onSubmit={handleFormSubmit} />
    </section>
  );
}
