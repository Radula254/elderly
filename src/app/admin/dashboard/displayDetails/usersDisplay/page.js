"use client"
import { useEffect, useState } from "react";
import { useProfile } from "@/components/UseProfile";
import moment from "moment"; // For date formatting, if needed
import countriesList from "react-select-country-list";

// Component function
export default function UserDisplayPage() {
  const [users, setUsers] = useState([]); 
  const { loading: profileLoading, data: profileData } = useProfile(); 
  const countryOptions = countriesList().getData();

  useEffect(() => {
    fetch("/api/allUsersDisplay").then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  });

  // Loading state while fetching data
  if (profileLoading || users.length === 0) {
    return "Loading..."; // You can show a loading spinner or message
  }

  // Check if user is authorized (example)
  if (!profileData?.admin) {
    return (
      <div className="text-center my-28 font-extrabold text-5xl">
        <p style={{ color: "red" }}>Unauthorized!!!</p>
      </div>
    );
  }

  const getCountryName = (countryCode) => {
    const country = countryOptions.find((c) => c.value === countryCode);
    return country ? country.label : "N/A";
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  // Rendering the table once data is fetched and authorized
  return (
    <section className="mx-auto mt-8 mb-20 px-3">
      <div className="mt-8">
        <h1 className="text-center font-bold text-xl underline mb-3">
          Users Details
        </h1>
        {users.length > 0 && (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>DOB</th>
                  <th>Phone</th>
                  <th>Country</th>
                  <th>Gender</th>
                  <th>Admin</th>
                  <th>Verified</th>
                  <th>Caregiver</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id || index}>
                    <td>{index + 1}</td>
                    <td>{user.name || "N/A"}</td>
                    <td>{user.email}</td>
                    <td>{user.userInfo?.DOB ? moment(user.DOB).format("YYYY-MM-DD") : "N/A"}</td>
                    <td>{user.userInfo?.phone || "N/A"}</td>
                    <td>{getCountryName(user.userInfo?.country)}</td>
                    <td>{user.userInfo?.gender ? capitalizeFirstLetter(user.userInfo?.gender) : "N/A"}</td>
                    <td>{user.admin ? "Yes" : "No"}</td>
                    <td>{user.isVerified ? "Yes" : "No"}</td>
                    <td>{user.caregiver ? "Yes" : "No"}</td>
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
