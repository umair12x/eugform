"use client";
import Logo from "@/components/Logo";
import { useState } from "react";
import { FaDownload, FaUpload, FaUserGraduate, FaFileInvoice } from "react-icons/fa";

export default function Home() {
  const [gender, setGender] = useState("male");

  return (
    <main
      className={`min-h-screen w-full p-10 flex flex-col items-center transition
      bg-linear-to-b from-yellow-50 to-yellow-50"`}
    >
      {/* Gender Toggle */}
   

      {/* Logo and Title */}
      <Logo />
      <h1 className="text-4xl font-bold mt-2 text-gray-800 tracking-wide">
        Uni Enrollment Portal
      </h1>
      <p className="text-gray-600 text-lg mt-2 text-center max-w-xl">
        A smart online platform to make your enrollment process smooth, organized, and paperless
      </p>

      {/* Steps Guide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-5xl">
        <StepCard
          icon={<FaUserGraduate size={35} />}
          title="Login to your student profile"
          text="Your academic data will be automatically fetched"
        />
        <StepCard
          icon={<FaFileInvoice size={35} />}
          title="Download Fee Voucher"
          text="Download directly from university finance section"
        />
        <StepCard
          icon={<FaUpload size={35} />}
          title="Upload Paid Voucher"
          text="Upload voucher with bank branch and date"
        />
      </div>

      {/* Start Enrollment Panel */}
      <div
        className={`mt-14 w-full max-w-3xl p-8 rounded-2xl shadow-lg transition
        ${gender === "male" ? "bg-white border-blue-200" : "bg-white border-pink-200"}
        border`}
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Start Your Enrollment
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Select your session, degree, semester, and upload your paid voucher
        </p>

        <div className="mt-6 flex justify-center">
          <button
            className={`px-6 py-3 rounded-xl font-medium text-lg shadow-md transition
            ${gender === "male" ? "bg-blue-600 text-white" : "bg-pink-600 text-white"}
            hover:opacity-90`}
          >
            Proceed to Enrollment
          </button>
        </div>
      </div>
    </main>
  );
}

function StepCard({ icon, title, text }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg flex flex-col items-center text-center border border-gray-100 transition">
      <div className="mb-4 text-blue-600">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">{text}</p>
    </div>
  );
}
