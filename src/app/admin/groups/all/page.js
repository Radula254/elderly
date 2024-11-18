"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import NavBar from "@/components/layout/NavBar";
import Plus from "@/components/icons/Plus";

export default function AdminGroupsPage() {
  const { data: session, status } = useSession();
  const [groups, setGroups] = useState([]);
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setProfileFetched(true);
        });
      });

      fetch("/api/allGroups").then((res) => {
        res.json().then((groups) => {
          // Sort groups so rejected ones are at the bottom
          const sortedGroups = groups.sort((a, b) => {
            if (a.rejected && !b.rejected) return 1;
            if (!a.rejected && b.rejected) return -1;
            return 0;
          });
          setGroups(sortedGroups);
        });
      });
    }
  }, [status]);

  const handleAccept = async (id) => {
    const updatedGroup = { _id: id, accepted: true, rejected: false };
    const res = await fetch("/api/group", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedGroup),
    });

    if (res.ok) {
      const updatedGroups = groups.map((group) => (group._id === id ? { ...group, accepted: true, rejected: false } : group));
      const sortedGroups = updatedGroups.sort((a, b) => {
        if (a.rejected && !b.rejected) return 1;
        if (!a.rejected && b.rejected) return -1;
        return 0;
      });
      setGroups(sortedGroups);
    }
  };

  const handleReject = async (id) => {
    const res = await fetch(`/api/group?_id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const updatedGroups = groups.map((group) => (group._id === id ? { ...group, rejected: true, accepted: false } : group));
      const sortedGroups = updatedGroups.sort((a, b) => {
        if (a.rejected && !b.rejected) return 1;
        if (!a.rejected && b.rejected) return -1;
        return 0;
      });
      setGroups(sortedGroups);
    }
  };

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return "Redirecting to login...";
  }

  return (
    <section className="mt-8">
      <NavBar isAdmin={true}  />
      {/* <div className="mt-8">
        <Link className="button flex items-center" href={"/groups/new"}>
          <Plus className="w-5 h-5" />
          <span>Create new group</span>
        </Link>
      </div> */}
      <div className="mt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
          {groups?.length > 0 &&
            groups.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden mb-7 text-center hover:shadow-2xl transition-all flex flex-col justify-between"
              >
                <Link href={"/groups/edit/" + item._id} className="">
                  <Image
                    className="w-full h-60 object-cover"
                    src={item.image}
                    alt={item.name + " image"}
                    layout="responsive"
                    width={800}
                    height={600}
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                    <p className="text-gray-600">{item.description}</p>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-2">Activities</h3>
                      {item.activity && item.activity.length > 0 ? (
                        <ol className="list-decimal list-inside">
                          {item.activity.map((act, index) => (
                            <li key={index} className="text-gray-600">
                              {act.name}
                            </li>
                          ))}
                        </ol>
                      ) : (
                        <p className="text-gray-600">No activities available</p>
                      )}
                    </div>
                  </div>
                </Link>
                <div className="flex mb-3 gap-3 p-4">
                  {item.accepted ? (
                    <>
                      <button className="border rounded-full bg-green-500 px-2 ml-2">
                        Accepted
                      </button>
                      <button onClick={() => handleReject(item._id)} className="border rounded-full bg-red-400 px-2 mr-2">
                        Reject
                      </button>
                    </>
                  ) : item.rejected ? (
                    <>
                      <button className="border rounded-full bg-red-700 px-3 ml-2">
                        Rejected
                      </button>
                      <button onClick={() => handleAccept(item._id)} className="border rounded-full bg-primary px-1 ml-2">
                        Accept
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleAccept(item._id)} className="border rounded-full bg-primary px-2 ml-2">
                        Accept
                      </button>
                      <button onClick={() => handleReject(item._id)} className="border rounded-full bg-red-400 px-2 mr-2">
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
