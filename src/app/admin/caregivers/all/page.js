"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import NavBar from "@/components/layout/NavBar";
import countriesList from "react-select-country-list";

export default function AdminCaregiversPage() {
  const { data: session, status } = useSession();
  const [caregivers, setCaregivers] = useState([]);
  const [profileFetched, setProfileFetched] = useState(false);
  const countryOptions = countriesList().getData();

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setProfileFetched(true);
        });
      });

      fetch("/api/caregivers").then((res) => {
        res.json().then((caregivers) => {
          // Sort caregivers so rejected ones are at the bottom
          const sortedCaregivers = caregivers.sort((a, b) => {
            if (a.rejected && !b.rejected) return 1;
            if (!a.rejected && b.rejected) return -1;
            return 0;
          });
          setCaregivers(sortedCaregivers);
        });
      });
    }
  }, [status]);

  const handleAccept = async (id) => {
    const updatedCaregiver = { _id: id, accepted: true, rejected: false };
    const res = await fetch("/api/adminCaregivers", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCaregiver),
    });

    if (res.ok) {
      const updatedCaregivers = caregivers.map((caregiver) => (caregiver._id === id ? { ...caregiver, accepted: true, rejected: false } : caregiver));
      const sortedCaregivers = updatedCaregivers.sort((a, b) => {
        if (a.rejected && !b.rejected) return 1;
        if (!a.rejected && b.rejected) return -1;
        return 0;
      });
      setCaregivers(sortedCaregivers);
    }
  };

  const handleReject = async (id) => {
    const res = await fetch(`/api/adminCaregivers?_id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const updatedCaregivers = caregivers.map((caregiver) => (caregiver._id === id ? { ...caregiver, rejected: true, accepted: false } : caregiver));
      const sortedCaregivers = updatedCaregivers.sort((a, b) => {
        if (a.rejected && !b.rejected) return 1;
        if (!a.rejected && b.rejected) return -1;
        return 0;
      });
      setCaregivers(sortedCaregivers);
    }
  };

  const getCountryName = (countryCode) => {
    const country = countryOptions.find((c) => c.value === countryCode);
    return country ? country.label : "N/A";
  };

  if (status === "loading" || !profileFetched) {
    return "Loading...";
  }

  if (status === "unauthenticated") {
    return "Redirecting to login...";
  }

  return (
    <section className="mt-8">
      <NavBar isAdmin={true} />
      <div className="mt-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
          {caregivers?.length > 0 &&
            caregivers.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden mb-7 text-center hover:shadow-2xl transition-all flex flex-col justify-between"
              >
                <Link href={"/caregivers/edit/" + item._id} className="">
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
                      <h3 className="text-lg font-semibold mb-2">Details</h3>
                      <p className="text-gray-600">Phone: {item.phone}</p>
                      <p className="text-gray-600">City: {item.city}</p>
                      <p className="text-gray-600">Country: {getCountryName(item.country)}</p>
                      <p className="text-gray-600">Gender: {item.gender}</p>
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
