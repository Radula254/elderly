"use client";
import Image from 'next/image';
import groupImg from '/public/home4.webp';

export default function AboutUs() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full bg-cover bg-center bg-[url('/about-hero.jpg')] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="text-center z-10">
          <h1 className="text-5xl font-bold mb-4">About ElderElevation</h1>
          <p className="text-lg max-w-2xl mx-auto">Empowering, enriching, and elevating the lives of elders through community and caregiving.</p>
        </div>
      </section>

      {/* Mission and Values Section */}
      <section className="p-20 text-center bg-gray-100">
        <h2 className="text-4xl font-semibold mb-8">Our Mission & Values</h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-x-8">
          <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
          <Image src={groupImg} alt="Join Groups" className="w-full h-54 object-cover rounded-t-lg" />
            <h3 className="text-2xl font-bold mt-4 mb-2">Our Mission</h3>
            <p className="text-gray-700">To provide a supportive community where elders thrive through connection and care.</p>
          </div>
          <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
            <Image src="/line1.png" alt="Values" width={400} height={300} className="rounded-t-lg" />
            <h3 className="text-2xl font-bold mt-4 mb-2">Our Values</h3>
            <p className="text-gray-700">Compassion, Respect, Integrity, Empowerment, Inclusivity.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="p-20 text-center">
        <h2 className="text-4xl font-semibold mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image src="/line1.png" alt="Team Member 1" width={400} height={300} className="rounded-t-lg" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">John Doe</h3>
              <p className="text-gray-700">Co-Founder & CEO</p>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet blandit quam, ac placerat velit.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image src="/line1.png" alt="Team Member 2" width={400} height={300} className="rounded-t-lg" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Jane Smith</h3>
              <p className="text-gray-700">Co-Founder & COO</p>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet blandit quam, ac placerat velit.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Image src="/line1.png" alt="Team Member 3" width={400} height={300} className="rounded-t-lg" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Sarah Brown</h3>
              <p className="text-gray-700">Head of Care Services</p>
              <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet blandit quam, ac placerat velit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Engagement Section */}
      <section className="p-20 text-center bg-gray-100">
        <h2 className="text-4xl font-semibold mb-8">Community Engagement</h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 mb-8">At ElderElevation, we believe in active community engagement. Our members participate in various activities, events, and discussions that enrich their lives and foster meaningful connections.</p>
          <Image src="/line1.png" alt="Community Engagement" width={1200} height={600} className="rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Contact Section
      <section className="p-20 text-center">
        <h2 className="text-4xl font-semibold mb-8">Contact Us</h2>
        <div className="max-w-md mx-auto">
          <p className="text-lg text-gray-700 mb-8">Have questions or want to learn more? Reach out to us!</p>
          <form className="flex flex-col space-y-4">
            <input type="text" placeholder="Your Name" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            <input type="email" placeholder="Your Email" className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            <textarea placeholder="Your Message" rows={5} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"></textarea>
            <button type="submit" className="bg-blue-600 text-white py-2 px-8 font-bold rounded-lg shadow-lg hover:bg-blue-700">
              Send Message
            </button>
          </form>
        </div>
      </section> */}

      {/* Footer Section */}
      <footer className="p-10 text-center bg-gray-200">
        <div className="space-y-4">
          <p>&copy; 2024 ElderElevation. All rights reserved.</p>
          <p>Contact us: info@elderelevation.com</p>
          <div className="flex justify-center space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
              Facebook
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
              Twitter
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
