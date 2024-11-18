"use client";

export default function LockedPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black bg-opacity-50">
      {/* <div className="absolute top-0 left-0 right-0 p-4 bg-white shadow-md z-10">
        <h1 className="text-4xl font-bold mb-4">Session Locked</h1>
      </div> */}
      <div className="bg-gradient-to-r from-green-100 to-blue-200 p-8 rounded-lg shadow-lg text-center">
        <p className="text-lg mb-4">Your session is currently locked. Please unlock to continue.</p>
        <button
          onClick={() => {
            // Redirect to the last accessed URL
            if (document.referrer) {
              window.location.href = document.referrer;
            } else {
              // If no referrer, fallback to a default page, e.g., home
              window.location.href = "/";
            }
          }}
          className="bg-primary rounded-full text-white px-6 py-2"
        >
          Unlock Session
        </button>
      </div>
    </div>
  );
}
