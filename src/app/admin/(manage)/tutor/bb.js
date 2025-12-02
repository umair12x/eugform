"use client ";
import React from "react";

const manage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-10 flex flex-col gap-10 md:w-[75%] mx-auto ">
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatBox label="Total Students Enrolled" value="524" color="blue" />
        <StatBox label="Pending Approvals" value="87" color="yellow" />
        <StatBox label="Approved Students" value="410" color="green" />
        <StatBox label="Rejected / Issues" value="27" color="red" />
      </section>
    </div>
  );
};

export default manage;

/* Stats Box small component */
function StatBox({ label, value, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    yellow: "text-yellow-600 bg-yellow-50",
    green: "text-green-600 bg-green-50",
    red: "text-red-600 bg-red-50",
  };

  return (
    <div className={`p-6 rounded-xl shadow-sm ${colors[color]} border`}>
      <h3 className="text-lg font-semibold">{label}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
