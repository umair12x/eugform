"use client"

import { useState } from "react"
import { FaUserGraduate, FaUniversity, FaDownload, FaSearch } from "react-icons/fa"

const submittedForms = [
  {
    id: 1,
    name: "Ali Ahmed",
    reg: "2020-CS-023",
    degree: "BS Computer Science",
    form: "/forms/ali.pdf"
  },
  {
    id: 2,
    name: "Sara Khan",
    reg: "2021-CS-102",
    degree: "MS Computer Science",
    form: "/forms/sara.pdf"
  },
  {
    id: 3,
    name: "Ahmed Raza",
    reg: "2022-SE-088",
    degree: "BS Software Engineering",
    form: "/forms/ahmed.pdf"
  }
]

export default function DirectorDashboard() {
  const [search, setSearch] = useState("")

  const filtered = submittedForms.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.reg.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaUniversity /> Director Dashboard
        </h1>
        <p className="text-gray-600">
          General overview and access to student enrolment forms
        </p>
      </div>

      {/* Quick Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-3">
          <FaUserGraduate className="text-blue-600" size={26} />
          <div>
            <p className="text-sm text-gray-500">Total BS Forms</p>
            <p className="text-xl font-bold">58</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-3">
          <FaUserGraduate className="text-green-600" size={26} />
          <div>
            <p className="text-sm text-gray-500">Total MS Forms</p>
            <p className="text-xl font-bold">14</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-3">
          <FaUniversity className="text-purple-600" size={26} />
          <div>
            <p className="text-sm text-gray-500">Total Programs</p>
            <p className="text-xl font-bold">2</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-80">
        <FaSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search student or registration"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 border rounded-lg w-full"
        />
      </div>

      {/* Forms */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="font-bold text-lg mb-4">Submitted UG1 Forms</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Registration</th>
                <th className="p-3 text-left">Degree</th>
                <th className="p-3 text-left">Form</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => (
                <tr key={f.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{f.name}</td>
                  <td className="p-3">{f.reg}</td>
                  <td className="p-3">{f.degree}</td>
                  <td className="p-3">
                    <button className="px-3 py-2 bg-blue-600 text-white rounded flex items-center gap-2">
                      <FaDownload size={14} /> Download
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 p-4">
                    No forms found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
