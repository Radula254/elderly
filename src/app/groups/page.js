"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import NavBar from "@/components/layout/NavBar";
import { useSession } from "next-auth/react";
import Plus from "@/components/icons/Plus";

export default function UserGroupsPage() {
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

      fetch("/api/group").then((res) => {
        res.json().then((groups) => {
          setGroups(groups);
        });
      });
    }
  }, [status]);

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return "Unauthorized";
  }

  return (
    <section className="mt-8">
      <NavBar isAdmin={false} />
      <div className="mt-8">
        <Link className="button flex items-center" href={"/groups/new"}>
          <Plus className="w-5 h-5" />
          <span>Create new group</span>
        </Link>
      </div>
      <div>
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
                    <button className="border rounded-full bg-green-500 px-2 ml-2">
                      Accepted
                    </button>
                  ) : item.rejected ? (
                    <button className="border rounded-full bg-red-500 px-2 ml-2">
                      Rejected
                    </button>
                  ) : (
                    <button className="border rounded-full bg-primary px-2 ml-2">
                      Pending...
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
