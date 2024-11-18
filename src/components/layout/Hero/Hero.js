"use client";
import Image from 'next/image';
import groupImg from '/public/group.jpeg';
import caregiverImg from '/public/caregiver.webp';

export default function Hero() {
  return (
    <main>
      <section className="relative h-[90vh] w-full bg-cover bg-center bg-[url('/home1.webp')] flex flex-col items-start justify-center p-20 text-white">
        <div className="absolute bottom-0 left-0 p-4">
          <h1 className="font-bold text-5xl mb-1">Empowering Elders,</h1>
          <h1 className="font-bold text-5xl mb-1">Enriching Elders,</h1>
          <h1 className="font-bold text-5xl mb-1">Elevating Elders.</h1>
        </div>
      </section>

      <section className="p-20 text-center bg-gradient-to-r from-green-200 via-blue-200 to-blue-400">
        <h2 className="text-3xl font-semibold mb-4">About ElderElevation</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          ElderElevation is dedicated to enhancing the lives of elderly individuals by providing a supportive community, reliable caregivers, and opportunities for others to offer their care and assistance.
        </p>
      </section>

      <section className="p-20 text-center bg-gradient-to-r from-green-200 via-blue-200 to-blue-400">
        <h2 className="text-3xl font-semibold mb-8">Our Services</h2>
        <div className="flex justify-around space-x-8">
          <div className="w-1/3 p-4 bg-white shadow-lg rounded-lg">
            <Image src={groupImg} alt="Join Groups" className="w-full h-54 object-cover rounded-t-lg" />
            <h3 className="text-xl font-bold mt-4 mb-2">Join Groups</h3>
            <p className="text-gray-700">Connect with like-minded peers through our diverse group offerings.</p>
          </div>
          <div className="w-1/3 p-4 bg-white shadow-lg rounded-lg">
            <Image src={caregiverImg} alt="Call Caregivers" className="w-full h-54 object-cover rounded-t-lg" />
            <h3 className="text-xl font-bold mt-4 mb-2">Call Caregivers</h3>
            <p className="text-gray-700">Access professional and compassionate care whenever you need it.</p>
          </div>
          <div className="w-1/3 p-4 bg-white shadow-lg rounded-lg">
            <Image src={caregiverImg} alt="Become a Caregiver" className="w-full h-54 object-cover rounded-t-lg" />
            <h3 className="text-xl font-bold mt-4 mb-2">Become a Caregiver</h3>
            <p className="text-gray-700">Sign up to provide care and support to those in need in your community.</p>
          </div>
        </div>
      </section>

      <section className="relative p-20 text-center bg-cover bg-center bg-[url('/motivational.png')] text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4 animate-pulse">Get Started Today</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Join our community and make a difference. Whether you need support or want to provide it, there&apos;s a place for you at ElderElevation.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-blue-600 text-white py-2 px-8 mx-2 cursor-default font-bold rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition duration-300">
              Join Now
            </button>
            <button className="bg-green-600 text-white py-2 px-8 mx-2 cursor-default font-bold rounded-lg shadow-lg hover:bg-green-700 transform hover:scale-105 transition duration-300">
              Become a Caregiver
            </button>
          </div>
        </div>
      </section>

      <section className="p-20 text-center bg-gradient-to-r from-green-200 via-blue-200 to-blue-400">
        <h2 className="text-3xl font-semibold mb-8">What Our Users Say</h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 italic">&quot;ElderElevation has changed my life. The community is amazing!&quot; - Mary J.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 italic">&quot;The caregivers are so compassionate and professional.&quot; - John D.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-700 italic">&quot;I love being a caregiver and giving back to my community.&quot; - Sarah W.</p>
          </div>
        </div>
      </section>

      <footer className="p-10 text-center bg-gradient-to-r from-green-200 via-blue-200 to-blue-400">
        <div className="space-y-4">
          <p>&copy; 2024 ElderElevation. All rights reserved.</p>
          <p>Contact us: info@elderelevation.com</p>
        </div>
      </footer>
    </main>
  );
}
