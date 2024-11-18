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
import ViewContentForm from "@/components/layout/ViewGroupContent";

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


  if (profileLoading) {
    return "Loading ...";
  }


  return (
    <section className="mt-10 mb-20">
      <div className="max-w-2xl mx-auto mt-8">
      </div>
          <ViewContentForm group={groups} />
    </section>
  );
}
