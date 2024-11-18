"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useProfile } from "@/components/UseProfile";

export default function UserGroupsPage() {
  const { data: session, status } = useSession();
  const [groups, setGroups] = useState([]);
  const [profileFetched, setProfileFetched] = useState(false);
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setProfileFetched(true);
        });
      });

      fetch("/api/allGroups").then((res) => {
        res.json().then((groups) => {
          const acceptedGroups = groups.filter((group) => group.accepted);
          setGroups(acceptedGroups);
        });
      });
    }
  }, [status]);


  const joinGroup = async (id) => {
    // Check if user info is available
    if (!profileData.email || !profileData.name || !profileData.phone || !profileData.country || !profileData.image) {
      // Display a message to the user to complete their profile
      toast.error("Please complete all profile details to joining a group.");
      return;
    }
  
    const updatedGroup = { _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/joinGroup", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGroup),
      });
  
      if (response.ok) {
        fetchGroups();
        resolve();
      } else {
        reject();
      }
    });
  
    await toast.promise(savingPromise, {
      loading: "Joining group...",
      success: "Joined group successfully!",
      error: "Failed to join group!",
    });
  };
  

  const exitGroup = async (id) => {
    const updatedGroup = { _id: id };
    const exitPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/joinGroup", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGroup),
      });

      if (response.ok) {
        fetchGroups();
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(exitPromise, {
      loading: "Exiting group...",
      success: "Exited group successfully!",
      error: "Failed to exit group!",
    });
  };


  const fetchGroups = () => {
    fetch("/api/allGroups").then((res) => {
      res.json().then((groups) => {
        const acceptedGroups = groups.filter((group) => group.accepted);
        setGroups(acceptedGroups);
        console.log(acceptedGroups);
      });
    });
  };

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return "Unauthorized";
  }

  return (
    <section className="mt-8 mb-7">
      <div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 p-4">
          {groups?.length > 0 &&
            groups.map((item) => {
              const isMember = item.members.some(
                (member) => member.email === session.user.email
              );

              return (
                <div
                  key={item._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden mb-7 text-center hover:shadow-2xl transition-all flex flex-col justify-between"
                >
                  <div className="">
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
                        <h3 className="text-lg font-semibold mb-2">
                          Activities
                        </h3>
                        {item.activity && item.activity.length > 0 ? (
                          <ol className="list-decimal list-inside">
                            {item.activity.map((act, index) => (
                              <li key={index} className="text-gray-600">
                                {act.name}
                              </li>
                            ))}
                          </ol>
                        ) : (
                          <p className="text-gray-600">
                            No activities available
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {status === "authenticated" && (
                    <div className="p-4 flex items-end justify-center space-x-2">
                      {isMember ? (
                        <>
                          <button
                            className="bg-green-500 text-white py-2 px-4 rounded"
                            onClick={() => {
                              window.location.href = `/groups/content/${item._id}`}}
                          >
                            View
                          </button>
                          <button
                            onClick={() => exitGroup(item._id)}
                            className="bg-red-500 text-white py-2 px-4 rounded"
                          >
                            Exit
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => joinGroup(item._id)}
                          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                        >
                          Join Group
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
