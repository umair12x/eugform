"use client"

import { useState } from "react"
import { FaSearch, FaCheck, FaTimes, FaEye, FaUserGraduate } from "react-icons/fa"

const pendingVouchers = [
  {
    id: 1,
    student: "Ali Ahmed",
    reg: "2020-CS-023",
    degree: "BS",
    semester: 5,
    border: "Border",
    voucherNo: "VCH-32144",
    bank: "HBL",
    date: "2024-02-10",
    image: "/uploads/ali-voucher.jpg"
  },
  {
    id: 2,
    student: "Sara Khan",
    reg: "2021-CS-105",
    degree: "MS",
    semester: 2,
    border: "Non-Border",
    voucherNo: "VCH-58792",
    bank: "MCB",
    date: "2024-02-11",
    image: "/uploads/sara-voucher.jpg"
  }
]

export default function FeeSection() {
  const [search, setSearch] = useState("")

  const filtered = pendingVouchers.filter(v =>
    v.student.toLowerCase().includes(search.toLowerCase()) ||
    v.reg.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
          <FaUserGraduate /> Fee Section Verification
        </h1>
        <p className="text-gray-600">
          Verify student fee vouchers for enrolment processing
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or registration number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-72"
          />
        </div>
      </div>

      {/* Requests */}
      <div className="space-y-4">
        {filtered.map(v => (
          <div key={v.id} className="border rounded-lg p-4 hover:border-green-300">
            <div className="flex justify-between items-center">
              {/* Left */}
              <div>
                <h3 className="font-bold text-gray-800">{v.student}</h3>
                <p className="text-sm text-gray-600">{v.reg}</p>
                <div className="text-sm text-gray-500">
                  Degree: {v.degree}, Semester: {v.semester}
                </div>
                <div className="text-sm text-gray-500">
                  {v.border} Student
                </div>
                <div className="text-sm text-gray-500">
                  Voucher: {v.voucherNo}, Bank: {v.bank}, Date: {v.date}
                </div>
              </div>

              {/* Right */}
              <div className="flex gap-2">
                <button className="px-3 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
                  <FaEye /> View Voucher
                </button>
                <button className="px-3 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700">
                  <FaCheck /> Verify
                </button>
                <button className="px-3 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700">
                  <FaTimes /> Reject
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-gray-500 text-center py-6">
            No pending voucher requests
          </p>
        )}
      </div>
    </div>
  )
}
