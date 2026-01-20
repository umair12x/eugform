"use client"

import { useState } from "react"
import { FaDownload } from "react-icons/fa"

const forms = [
  { id: 1, student: "Ali Ahmed", roll: "UAF-CS-2024-001", degree: "BS Computer Science", department: "Computer Science", file: "/forms/ali.pdf" },
  { id: 2, student: "Sara Khan", roll: "UAF-SE-2024-002", degree: "BS Software Engineering", department: "Software Engineering", file: "/forms/sara.pdf" },
  { id: 3, student: "Ahmed Raza", roll: "UAF-IT-2024-003", degree: "BS Information Technology", department: "Information Technology", file: "/forms/ahmed.pdf" },
]

export default function ControllerOffice() {
  const [degreeFilter, setDegreeFilter] = useState("all")

  const filtered = degreeFilter === "all"
    ? forms
    : forms.filter(f => f.degree === degreeFilter)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Controller Office</h1>
      <p className="text-gray-600">Received enrolment forms for processing</p>

      {/* Filter */}
      <div>
        <select
          value={degreeFilter}
          onChange={(e) => setDegreeFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">All Degrees</option>
          <option value="BS Computer Science">BS Computer Science</option>
          <option value="BS Software Engineering">BS Software Engineering</option>
          <option value="BS Information Technology">BS Information Technology</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Roll No</th>
              <th className="p-3 text-left">Degree</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Form</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(f => (
              <tr key={f.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{f.student}</td>
                <td className="p-3">{f.roll}</td>
                <td className="p-3">{f.degree}</td>
                <td className="p-3">{f.department}</td>
                <td className="p-3">
                  <button className="px-3 py-2 bg-blue-600 text-white rounded flex items-center gap-2">
                    <FaDownload size={14} /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
