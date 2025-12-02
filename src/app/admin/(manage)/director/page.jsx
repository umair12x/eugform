"use client";
import { FaUserCheck, FaUserClock, FaUniversity, FaBook, FaUserTie } from "react-icons/fa";

export default function DirectorDashboard() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-white to-gray-100 p-10">

      {/* Header */}
      <div className="flex flex-col items-center mb-10">
        <FaUserTie size={50} className="text-gray-800" />
        <h1 className="text-3xl font-bold text-gray-800 mt-3 tracking-wide">
          Director Academic Oversight Panel
        </h1>
        <p className="text-gray-600 mt-2 text-center max-w-xl">
          Manage departmental semester enrollments to ensure alignment with programme regulations and department capacity
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
        <StatCard icon={<FaUserCheck size={26} />} label="Approved Registrations" value="342" />
        <StatCard icon={<FaUserClock size={26} />} label="Pending Review" value="48" />
        <StatCard icon={<FaUniversity size={26} />} label="Department Seats Available" value="126" />
        <StatCard icon={<FaBook size={26} />} label="Active Programs" value="12" />
      </div>

      {/* Pending Approval Table */}
      <section className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Pending Semester Registration Requests
        </h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="p-3">Student Name</th>
              <th className="p-3">Registration No</th>
              <th className="p-3">Program</th>
              <th className="p-3">Semester</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {dummyStudents.map((student, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.reg}</td>
                <td className="p-3">{student.program}</td>
                <td className="p-3">{student.semester}</td>
                <td className="p-3 flex justify-center gap-3">
                  <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:opacity-90">
                    Approve
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-red-600 text-white hover:opacity-90">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Remarks Panel */}
      <div className="max-w-6xl mx-auto mt-10 bg-white shadow-md border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Director Remarks To Department or Teaching Groups
        </h3>
        <textarea
          rows="4"
          placeholder="Write an academic note, instruction, correction or resource alignment remark"
          className="w-full p-4 border rounded-lg outline-none focus:border-blue-500"
        ></textarea>
        <div className="mt-4 flex justify-end">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:opacity-90">
            Send Instruction
          </button>
        </div>
      </div>

    </main>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="p-5 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col items-center text-center">
      <div className="mb-2 text-blue-700">{icon}</div>
      <h4 className="text-2xl font-bold text-gray-800">{value}</h4>
      <p className="text-sm text-gray-600 mt-1">{label}</p>
    </div>
  );
}

const dummyStudents = [
  { name: "Ali Raza", reg: "2020-ag-123", program: "BS CS", semester: "6th" },
  { name: "Ayesha Khan", reg: "2021-ag-456", program: "BS IT", semester: "4th" },
  { name: "Muhammad Ahmed", reg: "2019-ag-789", program: "BS SE", semester: "8th" },
];
