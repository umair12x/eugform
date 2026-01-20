"use client";

import React, { useState } from "react";
import {
  FaUserGraduate,
  FaSearch,
  FaEye,
  FaCheck,
  FaTimes,
  FaDownload,
} from "react-icons/fa";

const students = [
  { id: 1, name: "Ali Ahmed", rollNo: "UAF-CS-2024-001", form: "UG-1 Form", status: "pending" },
  { id: 2, name: "Sara Khan", rollNo: "UAF-CS-2024-002", form: "UG-1 Form", status: "pending" },
  { id: 3, name: "Bilal Yousaf", rollNo: "UAF-CS-2024-005", form: "UG-1 Form", status: "approved" },
];

export default function TGMTutorDashboard() {
  const [search, setSearch] = useState("");

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaUserGraduate className="text-green-600" /> TGM Tutor Panel
        </h1>
        <p className="text-gray-600">Review student forms and approve enrollment</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow p-4 flex gap-2">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or roll number"
            className="pl-10 pr-3 py-2 border rounded-lg w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Roll No</th>
              <th className="p-3 text-left">Form</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(student => (
              <tr key={student.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{student.name}</td>
                <td className="p-3 font-mono">{student.rollNo}</td>
                <td className="p-3">{student.form}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded text-xs ${
                    student.status === "approved" ? "bg-green-100 text-green-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {student.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button className="p-2 bg-blue-100 text-blue-700 rounded" title="View Form">
                    <FaEye />
                  </button>
                  <button className="p-2 bg-gray-100 text-gray-700 rounded" title="Download Form">
                    <FaDownload />
                  </button>
                  <button className="p-2 bg-green-100 text-green-700 rounded" title="Approve">
                    <FaCheck />
                  </button>
                  <button className="p-2 bg-red-100 text-red-700 rounded" title="Disallow">
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
