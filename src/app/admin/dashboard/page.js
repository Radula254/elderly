"use client";
import React from "react";
import pieImg from '/public/pie.png';
import lineImg from '/public/line1.png';
import line2Img from '/public/line2.png';
import caregiverImg from '/public/caregiver.webp';
import groupImg from '/public/group.jpeg';
import userImg from '/public/user.png';
import contactImg from '/public/contact2.jpg';
import Image from "next/image";
import Link from "next/link";

export default function DashBoard() {
  return (
    <div id="features" className="pb-16">
      <header className="text-center pt-3">
        <h1 className="text-4xl font-bold px-8 py-4 inline-block underline">
          DashBoard
        </h1>
      </header>
      <main className="px-4 pt-3 pb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <Link href={"/admin/dashboard/pieCharts"} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src={pieImg}
              alt="Feature Image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">Pie Charts</h2>
              <p>These are the pie charts of different comparisons.</p>
            </div>
          </Link>
          <Link href={"/admin/dashboard/usersLineChart"} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src={lineImg}
              alt="Selling Homes Image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">Line Graphs</h2>
              <p className="text-gray-700">
                This is the users&apos; line graph.
              </p>
            </div>
          </Link>
          <Link href={"/admin/dashboard/groupSparkChart"} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src={line2Img}
              alt="Relocation Services Image"
              className="w-full h-48 object-cover" 
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">Spark Chart</h2>
              <p className="text-gray-700">
                This is a spark chart for groups and their members.
              </p>
            </div>
          </Link>
          <Link href={"/admin/dashboard/displayDetails/caregiversDisplay"} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src={caregiverImg}
              alt="Feature Image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">Caregivers table</h2>
              <p>These are the pie charts of different comparisons.</p>
            </div>
          </Link>
          <Link href={"/admin/dashboard/displayDetails/groupsDisplay"} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src={groupImg}
              alt="Feature Image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">Groups table</h2>
              <p>This is a table of available groups and its details.</p>
            </div>
          </Link>
          <Link href={"/admin/dashboard/displayDetails/usersDisplay"} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src={userImg}
              alt="Feature Image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">Users table</h2>
              <p>This is a table of users with the users&apos; details.</p>
            </div>
          </Link>
          <Link href={"/admin/dashboard/displayDetails/contactDisplay"} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Image
              src={contactImg}
              alt="Feature Image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">Contact us table</h2>
              <p>This is a table of all messages from the contact us page.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
