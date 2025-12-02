"use client";
import { FaClipboardList, FaUserGraduate, FaExclamationTriangle, FaComments } from "react-icons/fa";

export default function AdvisorDashboard() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-white to-gray-100 p-10">

      {/* Header */}
      <div className="text-center mb-12">
        <FaUserGraduate size={50} className="text-gray-800 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mt-3 tracking-wide">
          Academic Advisor Panel
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Review student course load, academic performance, policy conditions and provide guidance for the semester
        </p>
      </div>

      {/* Student Summary */}
      <section className="max-w-5xl mx-auto bg-white shadow-md rounded-xl border border-gray-200 p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaClipboardList /> Student Academic Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InfoItem label="Student Name" value="Ayesha Noor" />
          <InfoItem label="Registration" value="2021-ag-245" />
          <InfoItem label="Program" value="BS Software Engineering" />
          <InfoItem label="Semester" value="5th Semester" />
          <InfoItem label="GPA (Last Semester)" value="2.48" />
          <InfoItem label="CGPA" value="2.63" />
        </div>

        {/* Special Condition */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg flex gap-3 items-start">
          <FaExclamationTriangle className="text-yellow-600 mt-1" />
          <span className="text-sm text-gray-700">
            Student is currently under Academic Probation due to CGPA falling below minimum progression threshold
          </span>
        </div>
      </section>

      {/* Course Load Review */}
      <section className="max-w-5xl mx-auto bg-white shadow-md rounded-xl border border-gray-200 p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Proposed Course Load for This Semester</h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="p-3">Course Code</th>
              <th className="p-3">Course Title</th>
              <th className="p-3">Credit Hours</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{c.code}</td>
                <td className="p-3">{c.title}</td>
                <td className="p-3">{c.ch}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-right font-semibold text-gray-700">
          Total Credit Hours: 17
        </div>
      </section>

      {/* Advisor Feedback */}
      <section className="max-w-5xl mx-auto bg-white shadow-md rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <FaComments /> Advisor Guidance Notes
        </h3>

        <textarea
          rows={4}
          placeholder="Write academic guidance, risk considerations, improvement suggestions, study advice or pathway support"
          className="w-full p-4 border rounded-lg outline-none focus:border-blue-600"
        ></textarea>

        <div className="flex justify-end gap-3 mt-5">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:opacity-90">
            Save Guidance
          </button>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:opacity-90">
            Approve Load
          </button>
        </div>
      </section>

    </main>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}

const courses = [
  { code: "CS-301", title: "Data Structures", ch: 3 },
  { code: "CS-325", title: "Database Systems", ch: 3 },
  { code: "CS-318", title: "Computer Architecture", ch: 3 },
  { code: "GS-201", title: "Islamic Studies", ch: 2 },
  { code: "SE-401", title: "Software Engineering Design", ch: 3 },
  { code: "MGT-210", title: "Professional Ethics", ch: 3 },
];
