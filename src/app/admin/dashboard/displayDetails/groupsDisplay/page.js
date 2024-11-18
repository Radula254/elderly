"use client";
import { useEffect, useState } from "react";
import { useProfile } from "@/components/UseProfile";

export default function GroupsDisplayPage() {
  const [groups, setGroups] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetch("/api/allGroupsDisplay")
      .then((response) => response.json())
      .then((data) => {
        setGroups(data);
      });
  }, []);

  if (profileLoading) {
    return "Loading ...";
  }

  if (!profileData?.admin) {
    return (
      <div className="text-center my-28 font-extrabold text-5xl">
        <p style={{ color: "red" }}>Unauthorized!!!</p>
      </div>
    );
  }

  return (
    <section className="mx-auto mt-8 mb-20 px-3">
      <div className="mt-8">
        <h1 className="text-center font-bold text-xl underline mb-3">
          Group Details
        </h1>
        {groups?.length > 0 && (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Venue</th>
                  <th>Category</th>
                  <th>Members</th>
                  <th>Accepted</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group, index) => (
                  <tr key={group._id || index}>
                    <td>{index + 1}</td>
                    <td>{group.name || "N/A"}</td>
                    <td>{group.email}</td>
                    <td>{group.venue || "N/A"}</td>
                    <td>{group.categoryName || "N/A"}</td>
                    <td>
                      <details>
                        <summary>{group.members.length} Members</summary>
                        <ul>
                          {group.members.map((member, idx) => (
                            <li key={idx}>{`${idx + 1}. ${member.name}`}</li>
                          ))}
                        </ul>
                      </details>
                    </td>
                    <td>{group.accepted ? "Yes" : "No"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
