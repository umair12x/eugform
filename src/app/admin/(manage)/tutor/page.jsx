"use client";

import { useState } from "react";
import { 
  FaUserGraduate, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClipboardCheck, 
  FaSearch, 
  FaInfoCircle, 
  FaPhoneAlt, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaBuilding 
} from "react-icons/fa";

export default function TGMTeacherDashboard() {
  const [students, setStudents] = useState([
    { id: 1, name: "Ahmed Raza", regNo: "UAF2021-001", attendance: "95%", behavior: "Excellent", remarks: "Active and punctual", status: "Pending" },
    { id: 2, name: "Ayesha Khan", regNo: "UAF2021-045", attendance: "82%", behavior: "Good", remarks: "Participates in class discussions", status: "Pending" },
    { id: 3, name: "Hassan Ali", regNo: "UAF2021-078", attendance: "68%", behavior: "Poor", remarks: "Irregular and disruptive", status: "Pending" },
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStatusChange = (id, status) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  // Example tutor data
  const tutor = {
    name: "Mr. Imran TGM",
    contact: "+92 300 1234567",
    whatsapp: "+92 300 7654321",
    address: "Room 205, Admin Block, University of Agriculture, Faisalabad",
    office: "Admin Block, 2nd Floor",
    department: "Teaching & Guidance Management",
    faculty: "Faculty of Agriculture"
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col px-5 py-8">
      
      {/* Header */}
      <header className="flex items-center justify-between pb-4 border-b">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FaClipboardCheck className="text-blue-600" />
          TGM Teacher Dashboard
        </h1>
        <div className="flex items-center gap-2 bg-white shadow-sm px-4 py-2 rounded-xl">
          <FaUserGraduate className="text-gray-600 text-xl" />
          <span className="font-semibold text-gray-700">{tutor.name}</span>
        </div>
      </header>

      {/* Tutor Info Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-gray-800">{tutor.name}</h2>
          <p className="text-gray-600 mt-1">{tutor.department}, {tutor.faculty}</p>
          <p className="text-gray-600 mt-1">{tutor.office}</p>
          <p className="text-gray-600 mt-1 flex items-center gap-2"><FaMapMarkerAlt /> {tutor.address}</p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end mt-4 sm:mt-0">
          <p className="flex items-center gap-2 text-gray-700"><FaPhoneAlt /> {tutor.contact}</p>
          <p className="flex items-center gap-2 text-green-600"><FaWhatsapp /> {tutor.whatsapp}</p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="mt-6 flex flex-wrap gap-3 items-center">
        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search student name or registration number"
            className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <select className="px-4 py-2 rounded-xl bg-white border shadow-sm">
          <option>Filter Attendance</option>
          <option>Above 80%</option>
          <option>Between 60% to 80%</option>
          <option>Below 60%</option>
        </select>

        <select className="px-4 py-2 rounded-xl bg-white border shadow-sm">
          <option>Filter Behavior</option>
          <option>Excellent</option>
          <option>Good</option>
          <option>Poor</option>
        </select>
      </div>

      {/* Student Table */}
      <div className="bg-white shadow-lg rounded-2xl mt-8 overflow-hidden">
        <div className="px-6 py-4 border-b bg-blue-50 flex items-center gap-2 text-blue-700 font-semibold">
          <FaClipboardCheck /> Pending Enrollment Review
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600">
                <th className="p-3">Student</th>
                <th className="p-3">Reg No</th>
                <th className="p-3 text-center">Attendance</th>
                <th className="p-3 text-center">Behavior</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map(student => (
                <tr key={student.id} className="hover:bg-gray-50 transition border-t">
                  <td className="p-3 font-medium">{student.name}</td>
                  <td className="p-3">{student.regNo}</td>
                  <td className="p-3 text-center">{student.attendance}</td>
                  <td className="p-3 text-center">{student.behavior}</td>

                  <td className="p-3 text-center font-semibold">
                    <span className={`px-3 py-1 rounded-xl text-sm ${
                      student.status === "Approved" ? "bg-green-100 text-green-700" :
                      student.status === "Rejected" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {student.status}
                    </span>
                  </td>

                  <td className="p-3 text-center flex gap-3 items-center justify-center">

                    <button onClick={() => setSelectedStudent(student)}
                      className="text-blue-600 hover:text-blue-800"
                      title="View Details">
                      <FaInfoCircle size={20} />
                    </button>

                    <button onClick={() => handleStatusChange(student.id, "Approved")}
                      className="text-green-600 hover:text-green-800">
                      <FaCheckCircle size={22} />
                    </button>

                    <button onClick={() => handleStatusChange(student.id, "Rejected")}
                      className="text-red-500 hover:text-red-700">
                      <FaTimesCircle size={22} />
                    </button>

                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide Panel for Student Info */}
      {selectedStudent && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl p-6 flex flex-col animate-slide-left">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{selectedStudent.name}</h3>
          <p className="text-gray-600">Reg No, {selectedStudent.regNo}</p>

          <div className="mt-6 space-y-2 text-sm">
            <p>Attendance, <strong>{selectedStudent.attendance}</strong></p>
            <p>Behavior, <strong>{selectedStudent.behavior}</strong></p>
            <p>Remarks, <span className="text-gray-700">{selectedStudent.remarks}</span></p>
          </div>

          <button onClick={() => setSelectedStudent(null)}
            className="mt-auto py-2 w-full bg-gray-200 hover:bg-gray-300 rounded-xl text-gray-700 font-medium">
            Close Panel
          </button>
        </div>
      )}
    </main>
  );
}
