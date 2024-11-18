"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import NavBar from "@/components/layout/NavBar";
import GroupForm from "@/components/layout/GroupForm";
import GroupContentForm from "@/components/layout/GroupContentForm";
import { useProfile } from "@/components/UseProfile";

export default function EditGroupsPage() {
  const { id } = useParams();
  const [groups, setGroups] = useState(null);
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetch("/api/allGroups").then((res) => {
      res.json().then((groups) => {
        const group = groups.find((i) => i._id === id);
        setGroups(group);
      });
    });
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/group", {
        method: "PUT",
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
      loading: "Saving...",
      success: "Saved",
      error: "Error",
    });
  }

  async function handleDeleteClick() {
    const deletePromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/drugs?_id=" + id, {
        method: "DELETE",
      });
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(deletePromise, {
      loading: "Deleting...",
      success: "Deleted",
      error: "Error",
    });
  }

  if (profileLoading) {
    return "Loading ...";
  }


  return (
    <section className="mt-10 mb-20">
      <div className="max-w-2xl mx-auto mt-8">
      </div>
          <GroupContentForm group={groups} onSubmit={handleFormSubmit}/>
    </section>
  );
}
