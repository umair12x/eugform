"use client";

import { useState } from "react";
import { FaPrint, FaCheckCircle, FaDownload } from "react-icons/fa";

export default function ControllerOfficePage() {
  const [students, setStudents] = useState([
    {
      id: "UAF-2021-AG-001",
      name: "Muhammad Ahsan",
      degree: "BS Agriculture",
      semester: "6th",
      department: "Agriculture",
      session: "2021-2025",
      statusPrinted: false,
      pdfUrl: "/sample.pdf",
    },
    {
      id: "UAF-2021-CS-009",
      name: "Fatima Zahra",
      degree: "BS Computer Science",
      semester: "4th",
      department: "Computer Science",
      session: "2022-2026",
      statusPrinted: false,
      pdfUrl: "/sample.pdf",
    },
  ]);

  const handlePrintDone = (index) => {
    const newStudents = [...students];
    newStudents[index].statusPrinted = true;
    setStudents(newStudents);
  };

  return (
    <main className="min-h-screen w-full bg-gray-100 px-10 py-8">
      
      {/* Header */}
      <header className="w-full pb-6 border-b border-gray-300">
        <h1 className="text-3xl font-bold text-gray-800">Controller Office Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage verified enrollment copies and print official records for archive</p>
      </header>

      {/* Filter Panel */}
      <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select className="border p-3 rounded-lg">
            <option>Select Department</option>
            <option>Agriculture</option>
            <option>Computer Science</option>
            <option>Veterinary</option>
          </select>

          <select className="border p-3 rounded-lg">
            <option>Select Degree</option>
            <option>BS</option>
            <option>MS</option>
            <option>PhD</option>
          </select>

          <select className="border p-3 rounded-lg">
            <option>Select Semester</option>
            <option>2nd</option>
            <option>4th</option>
            <option>6th</option>
            <option>8th</option>
          </select>

          <select className="border p-3 rounded-lg">
            <option>Select Session</option>
            <option>2021-2025</option>
            <option>2022-2026</option>
          </select>
        </div>
      </div>

      {/* Students List */}
      <div className="mt-10 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-gray-700 font-semibold">Student ID</th>
              <th className="p-4 text-gray-700 font-semibold">Name</th>
              <th className="p-4 text-gray-700 font-semibold">Degree</th>
              <th className="p-4 text-gray-700 font-semibold">Semester</th>
              <th className="p-4 text-gray-700 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                <td className="p-4">{student.id}</td>
                <td className="p-4">{student.name}</td>
                <td className="p-4">{student.degree}</td>
                <td className="p-4">{student.semester}</td>
                <td className="p-4">
                  {student.statusPrinted ? (
                    <button
                      disabled
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white cursor-default"
                    >
                      <FaCheckCircle /> Done
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <a
                        href={student.pdfUrl}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:opacity-90 transition"
                      >
                        <FaDownload /> Download
                      </a>

                      <button
                        onClick={() => handlePrintDone(index)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:opacity-90 transition"
                      >
                        <FaPrint /> Print
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
