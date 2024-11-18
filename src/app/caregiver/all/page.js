"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import countriesList from "react-select-country-list";

export default function AllCaregivers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/caregivers").then((response) => {
      response.json().then((data) => {
        const acceptedCaregivers = data.filter(user => user.accepted);
        setUsers(acceptedCaregivers);
      });
    });
  }, []);

  function getFullCountryName(code) {
    const countries = countriesList().getData();
    const country = countries.find((country) => country.value === code);
    return country ? country.label : code;
  }

  return (
    <section className="mt-5 mb-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 p-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-gradient-to-r from-green-200 via-blue-200 to-blue-400 shadow-xl rounded-lg text-center transform transition duration-500 hover:scale-105"
          >
            <div className="flex justify-center mt-3 mb-4">
              <Image
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-md"
                src={user.image}
                alt={user.name}
                width={128}
                height={128}
              />
            </div>
            <div className="p-4">
              <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
                {user.name}
              </h2>
              <p className="text-gray-500 mb-1">{user.email}</p>
              <p className="text-gray-500 mb-1">{user.phone}</p>
              <p className="text-gray-500 mb-1">{user.city}</p>
              <p className="text-gray-500 mb-1">
                {getFullCountryName(user.country)}
              </p>
              <p className="text-gray-500">
                {user.gender === "male" ? "Male" : "Female"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
