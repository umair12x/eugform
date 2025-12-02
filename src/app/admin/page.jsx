"use client";
import AdminLogo from "@/components/AdminLogo";
import {
  FaUserTie,
  FaUserCheck,
  FaChalkboardTeacher,
  FaUsers,
  FaEnvelope,
} from "react-icons/fa";

export default function Home() {
  let aboutManager = [
    {
      id: 1,
      role: "Controller Office",
      description:
        "Responsible for overall university administrative approval connecting the student paper after the exam from teacher and collecting the finilize grade of the students of respective subject",
      icon: <FaUserTie size={40} className="blue" />,
      color: "blue",
    },
    {
      id: 2,
      role: "Chairman",
      description:
        "Verifies department level enrollment progress. Hold the athority to check and find out the acadmic results of perticular student and on the acedmic performance take the task and check the performance of the department on the enrollemnt ",
      icon: <FaUserCheck size={40} className="green" />,
      color: "green",
    },
    {
      id: 3,
      role: "TGM Teacher",
      description:
        "Handles individual class student clearance on the bases of his perforamnce and attendence",
      icon: <FaChalkboardTeacher size={40} className="orange" />,
      color: "orange",
    },
    {
      id: 4,
      role: "Manager",
      description:
        "Manages operations and student request tracking and hold the record and manage he form and then informing the student on their cases about delay, fines, last dates",
      icon: <FaUsers size={40} className="purple" />,
      color: "purple",
    },
  ];

  return (
    <main className="min-h-screen  p-10 flex flex-col gap-10 md:w-[75%] mx-auto ">
      {/* Header */}
      <div className="flex flex-col  items-center justify-center gap-2 py-10">
        <AdminLogo />
        <h1 className="text-4xl font-extrabold text-secondary-gradient tracking-wide">
          Admin Dashboard
        </h1>
      </div>

      {/* Who Can Be Admin */}
      <section className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-secondary-gradient mb-4">
          Who Can Manage This Panel
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aboutManager.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col items-center p-4 border rounded-lg border-${item.color}-500   shadow-sm bg-${item.color}-200 hover:bg-${item.color}-100 transition `}
            >
              {item.icon}
              <h3 className="mt-2 font-bold text-secondary-gradient">
                {item.role}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Messaging and Students Panel */}
      <section className="md:w-[75%] mx-auto my-20 grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3 text-secondary-gradient">
            Student Information Navigation
          </h2>
          <p className="text-gray-600 mb-4">
            View and manage student data records
          </p>

          <div className="flex flex-col gap-3">
            <button className="border p-3 rounded-lg hover:bg-green-50 bg-green-100 border-green-50 text-left">
              View Enrolled Students List
            </button>
            <button className="border p-3 rounded-lg hover:bg-amber-50 bg-amber-100 border-amber-50 text-left">
              Approved Students List
            </button>
            <button className="border p-3 rounded-lg hover:bg-amber-50 bg-amber-100 border-amber-50 text-left">
              Rejected Students List
            </button>
            <button className="border p-3 rounded-lg hover:bg-amber-50 bg-amber-100 border-amber-50 text-left">
              Approved Students List
            </button>
            <button className="border p-3 rounded-lg hover:bg-blue-50 bg-blue-100 border-blue-50 text-left">
              Search Student by Roll Number
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <FaEnvelope /> Messaging Panel
          </h2>
          <p className="text-gray-600 mb-4">
            Send announcements to department or class groups
          </p>
          <textarea
            placeholder="Type a message here to broadcast"
            className="w-full border rounded-lg p-3 h-32 focus:outline-blue-400"
          ></textarea>
          <button className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            Send Message
          </button>
        </div>
      </section>
    </main>
  );
}
