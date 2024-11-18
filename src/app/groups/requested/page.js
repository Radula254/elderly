"use client";

import NavBar from "@/components/layout/NavBar";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function RequestedMembers() {
  const { data: session, status } = useSession();
  const [joinRequests, setJoinRequests] = useState([]);
  const [groups, setGroups] = useState([]);

  const fetchJoinRequests = () => {
    fetch("/api/joinGroup")
      .then((res) => res.json())
      .then((requests) => setJoinRequests(requests))
      .catch(() => toast.error("Failed to fetch join requests"));
  };

  const fetchGroups = () => {
    fetch("/api/allGroups")
      .then((res) => res.json())
      .then((groups) => setGroups(groups))
      .catch(() => toast.error("Failed to fetch groups"));
  };

  const handleJoinRequest = async (requestId, status) => {
    const response = await fetch("/api/joinGroup", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requestId, status }),
    });

    if (response.ok) {
      fetchJoinRequests();
      toast.success(`Request ${status}`);
    } else {
      toast.error("Failed to update join request status");
    }
  };

  const removeMember = async (groupId, memberId) => {
    const response = await fetch("/api/joinGroup", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groupId, memberId }),
    });

    if (response.ok) {
      fetchGroups();
      toast.success("Member removed successfully");
    } else {
      toast.error("Failed to remove member");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchJoinRequests();
      fetchGroups();
    }
  }, [status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>Unauthorized</p>;
  }

  return (
    <div className="mt-8 mb-7 max-w-7xl mx-auto p-4">
        <NavBar isAdmin={false} />
      <h2 className="text-2xl font-bold mb-6">Join Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {joinRequests.length > 0 ? (
          joinRequests.map((request) => (
            <div
              key={request._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden p-4"
            >
              <p className="text-lg font-semibold mb-2">
                {request.userId.name} wants to join your group
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleJoinRequest(request._id, "accepted")}
                  className="bg-green-500 text-white py-2 px-4 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleJoinRequest(request._id, "denied")}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Deny
                </button>
                <button
                  onClick={() => removeMember(request.groupId, request.userId._id)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded"
                >
                  Remove Member
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No join requests available</p>
        )}
      </div>
    </div>
  );
}
