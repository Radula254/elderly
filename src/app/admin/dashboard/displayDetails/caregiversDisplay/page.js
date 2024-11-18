"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useProfile } from "@/components/UseProfile";
import countriesList from "react-select-country-list";

export default function CaregiversDisplayPage() {
  const [caregivers, setCaregivers] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const countryOptions = countriesList().getData();

  useEffect(() => {
    fetch("/api/caregivers").then((response) => {
      response.json().then((data) => {
        setCaregivers(data);
      });
    });
  }, []);

  const getCountryName = (countryCode) => {
    const country = countryOptions.find((c) => c.value === countryCode);
    return country ? country.label : "N/A";
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

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
    <section className="mx-auto mt-8 mb-20 pb-10 px-3">
      <div className="mt-8">
        <h1 className="text-center font-bold text-xl underline mb-3">
          Caregivers Details
        </h1>
        {caregivers?.length > 0 && (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>Phone</th>
                  <th>DOB</th>
                  <th>Gender</th>
                  <th>Accepted</th>
                </tr>
              </thead>
              <tbody>
                {caregivers.map((caregiver, index) => (
                  <tr key={caregiver._id || index}>
                    <td>{index + 1}</td>
                    <td>{caregiver.name || "N/A"}</td>
                    <td>{caregiver.email}</td>
                    <td>{caregiver.city || "N/A"}</td>
                    <td>{getCountryName(caregiver.country)}</td>
                    <td>{caregiver.phone || "N/A"}</td>
                    <td>{caregiver.DOB ? new Date(caregiver.DOB).toLocaleDateString() : "N/A"}</td>
                    <td>{caregiver.gender ? capitalizeFirstLetter(caregiver.gender) : "N/A"}</td>
                    <td>{caregiver?.accepted ? "Yes" : "No"}</td>
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
