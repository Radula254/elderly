"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import NavBar from "@/components/layout/NavBar";
import GroupForm from "@/components/layout/GroupForm";

export default function EditUserPage() {
  const [groups, setGroups] = useState(null);
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch("/api/group?_id=" + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savePromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savePromise, {
      loading: "Saving...",
      success: "Saved",
      error: "Error saving!!",
    });
  }

  if (profileLoading) {
    return "Loading ...";
  }

  return (
    <section className="my-8">
      <div className="max-w-3xl mx-auto mt-8">
        <Link href={"/groups"} className="button">
          <span>Show all menu items</span>
        </Link>
      </div>
      <GroupForm groups={groups} onSubmit={handleFormSubmit} />
    </section>
  );
}
