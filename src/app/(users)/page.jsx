"use client";
import Logo from "@/components/Logo";
import { useState } from "react";
import { FaUpload, FaUserGraduate, FaFileInvoice } from "react-icons/fa";
import Link from "next/link";







export default function Home() {
  const [gender] = useState("female");

  const procedureInfo = [
    {
      id: 1,
      icon: (
        <FaUserGraduate
          size={36}
          className={`${
            gender === "male"
              ? "text-blue-600 dark:text-blue-400"
              : "text-pink-600 dark:text-pink-400"
          }`}
        />
      ),
      title: "Login to your student profile",
      text: "Your academic data will be automatically fetched",
    },
    {
      id: 2,
      icon: (
        <FaFileInvoice
          size={36}
          className={`${
            gender === "male"
              ? "text-blue-600 dark:text-blue-400"
              : "text-pink-600 dark:text-pink-400"
          }`}
        />
      ),
      title: "Download Fee Voucher",
      text: "Download directly from university finance section",
    },
    {
      id: 3,
      icon: (
        <FaUpload
          size={36}
          className={`${
            gender === "male"
              ? "text-blue-600 dark:text-blue-400"
              : "text-pink-600 dark:text-pink-400"
          }`}
        />
      ),
      title: "Upload Paid Voucher",
      text: "Upload voucher with bank branch and date",
    },
  ];

  return (
    <main
      className="
        min-h-screen w-full px-6 py-14 flex flex-col items-center transition
        bg-yellow-50 dark:bg-[#0b0f14]
      "
    >
      {/* Logo and Intro */}
      <div className="flex flex-col items-center text-center">
        <Logo />
        <h1 className="text-4xl md:text-5xl font-bold mt-4 tracking-wide text-gray-800 dark:text-gray-100">
          Uni Enrollment Portal
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg mt-3 max-w-xl">
          A smart online platform to make your enrollment process smooth,
          organized, and paperless
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 w-full max-w-6xl">
        {procedureInfo.map((item) => (
          <StepCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            text={item.text}
          />
        ))}
      </div>

      {/* Start Panel */}
      <div
        className={`
          mt-16 w-full max-w-3xl p-8 rounded-2xl transition
          border shadow-lg
          bg-white dark:bg-[#121821]
          ${
            gender === "male"
              ? "border-blue-200 dark:border-blue-500/40"
              : "border-pink-200 dark:border-pink-500/40"
          }
        `}
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center">
          Start Your Enrollment
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
          Select your session, degree, semester, and upload your paid voucher
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/form"
            className={`
              px-7 py-3 rounded-xl font-medium text-lg transition shadow-md
              ${
                gender === "male"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-pink-600 hover:bg-pink-700"
              }
              text-white
              dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)]
            `}
          >
            Proceed to Enrollment
          </Link>
        </div>
      </div>
    </main>
  );
}

function StepCard({ icon, title, text }) {
  return (
    <div
      className="
        p-6 rounded-xl flex flex-col items-center text-center transition
        bg-white dark:bg-[#121821]
        border border-gray-100 dark:border-gray-800
        shadow-md hover:shadow-lg
      "
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        {text}
      </p>
    </div>
  );
}
