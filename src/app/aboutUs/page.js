"use client";
import Image from "next/image";

export default function AboutUs() {
  return (
    <main>
      <section className="relative h-[60vh] w-full bg-cover bg-center bg-[url('/home2.jpeg')] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="text-center z-10">
          <h1 className="text-5xl font-bold mb-4">About ElderElevation</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Empowering, enriching, and elevating the lives of elders through
            community and caregiving.
          </p>
        </div>
      </section>

      <section className="p-20 text-center bg-gradient-to-r from-green-200 via-blue-200 to-blue-400">
        <h2 className="text-4xl font-semibold mb-8">Our Mission & Values</h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-x-8">
          <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
            <Image
              src="/home4.webp"
              alt="Mission"
              width={400}
              height={300}
              className="rounded-t-lg"
            />
            <h3 className="text-2xl font-bold mt-4 mb-2">Our Mission</h3>
            <p className="text-gray-700">
              To provide a supportive community where elders thrive through
              connection and care.
            </p>
          </div>
          <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
            <Image
              src="/feature3.webp"
              alt="Values"
              width={400}
              height={300}
              className="rounded-t-lg"
            />
            <h3 className="text-2xl font-bold mt-4 mb-2">Our Values</h3>
            <p className="text-gray-700">
              Compassion, Respect, Integrity, Empowerment, Inclusivity.
            </p>
          </div>
        </div>
      </section>

      <section className="p-20 text-center bg-gradient-to-r from-green-200 via-blue-200 to-blue-400">
        <h2 className="text-4xl font-semibold mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/person2.jpeg"
              alt="Team Member 1"
              width={400}
              height={300}
              className="rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">John Doe</h3>
              <p className="text-gray-700">Co-Founder & CEO</p>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                imperdiet blandit quam, ac placerat velit.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/person5.webp"
              alt="Team Member 2"
              width={400}
              height={300}
              className="rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Jane Smith</h3>
              <p className="text-gray-700">Co-Founder & COO</p>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                imperdiet blandit quam, ac placerat velit.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image
              src="/person3.webp"
              alt="Team Member 3"
              width={400}
              height={300}
              className="rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Sarah Brown</h3>
              <p className="text-gray-700">Head of Care Services</p>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                imperdiet blandit quam, ac placerat velit.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="p-20 text-center bg-gradient-to-r from-green-200 via-blue-200 to-blue-400">
        <h2 className="text-4xl font-semibold mb-8">Community Engagement</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 mb-8">
            At ElderElevation, we believe in active community engagement. Our
            members participate in various activities, events, and discussions
            that enrich their lives and foster meaningful connections.
          </p>
          <Image
            src="/help2.jpeg"
            alt="Community Engagement"
            width={1200}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <div className="border-b-2 border-gray-500"></div>

      <footer className="p-10 text-center bg-gradient-to-r from-green-200 via-blue-200 to-blue-400">
        <div className="space-y-4">
          <p>&copy; 2024 ElderElevation. All rights reserved.</p>
          <p>Contact us: info@elderelevation.com</p>
        </div>
      </footer>
    </main>
  );
}
