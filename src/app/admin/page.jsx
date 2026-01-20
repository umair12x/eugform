"use client";

import React from "react";
import { 
  FaUsers, 
  FaFileAlt, 
  FaMoneyBillWave, 
  FaChartLine, 
  FaClock, 
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";
import Link from "next/link";

const stats = [
  { label: "Total Students", value: "2,847", icon: <FaUsers />, change: "+12%", trend: "up" },
  { label: "Pending Forms", value: "156", icon: <FaFileAlt />, change: "+8", trend: "up" },

];

const recentActivities = [
  { id: 1, user: "Ali Ahmed", action: "submitted UG Form", time: "5 min ago", status: "pending" },
  { id: 2, user: "Sara Khan", action: "approved GS-10 Form", time: "15 min ago", status: "approved" },
  { id: 3, user: "Ahmed Raza", action: "fee payment completed", time: "30 min ago", status: "paid" },
  { id: 4, user: "Fatima Bibi", action: "form requires revision", time: "1 hour ago", status: "revision" },
  { id: 5, user: "Bilal Yousaf", action: "registered new student", time: "2 hours ago", status: "completed" },
];

const pendingTasks = [
  { id: 1, title: "Review UG Form #UAF-2024-001", priority: "high", department: "Computer Science" },
  { id: 2, title: "Approve Fee Waiver Request", priority: "medium", department: "Finance" },
  { id: 3, title: "Update Course Catalog", priority: "low", department: "Academics" },
  { id: 4, title: "Generate Monthly Report", priority: "medium", department: "Administration" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome to University of Agriculture, Faisalabad Admin Panel</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Generate Report
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`mr-2 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {stat.trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
                  </span>
                  <span className={`text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">from last month</span>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaClock className="text-blue-600" /> Recent Activities
            </h2>
          </div>
          <div className="p-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-full mr-4 ${
                  activity.status === "approved" ? "bg-green-100 text-green-600" :
                  activity.status === "paid" ? "bg-blue-100 text-blue-600" :
                  activity.status === "pending" ? "bg-yellow-100 text-yellow-600" :
                  "bg-red-100 text-red-600"
                }`}>
                  {activity.status === "approved" ? <FaCheckCircle /> : <FaExclamationTriangle />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <Link href="/admin/forms" className="text-blue-600 hover:text-blue-800 font-medium">
              View all activities →
            </Link>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-xl shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaExclamationTriangle className="text-red-600" /> Pending Tasks
            </h2>
          </div>
          <div className="p-4">
            {pendingTasks.map((task) => (
              <div key={task.id} className="p-4 border rounded-lg mb-3 hover:border-blue-300">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">Department: {task.department}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    task.priority === "high" ? "bg-red-100 text-red-700" :
                    task.priority === "medium" ? "bg-yellow-100 text-yellow-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    Take Action
                  </button>
                  <button className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/forms" className="p-4 border rounded-lg hover:border-blue-400 hover:bg-blue-50">
            <div className="text-center">
              <div className="text-blue-600 text-2xl mb-2 mx-auto w-fit">
                <FaFileAlt />
              </div>
              <p className="font-medium">Review Forms</p>
            </div>
          </Link>
          <Link href="/admin/students" className="p-4 border rounded-lg hover:border-green-400 hover:bg-green-50">
            <div className="text-center">
              <div className="text-green-600 text-2xl mb-2 mx-auto w-fit">
                <FaUsers />
              </div>
              <p className="font-medium">Manage Students</p>
            </div>
          </Link>
          <Link href="/admin/fee-section" className="p-4 border rounded-lg hover:border-purple-400 hover:bg-purple-50">
            <div className="text-center">
              <div className="text-purple-600 text-2xl mb-2 mx-auto w-fit">
                <FaMoneyBillWave />
              </div>
              <p className="font-medium">Fee Management</p>
            </div>
          </Link>
          <Link href="/admin/reports" className="p-4 border rounded-lg hover:border-orange-400 hover:bg-orange-50">
            <div className="text-center">
              <div className="text-orange-600 text-2xl mb-2 mx-auto w-fit">
                <FaChartLine />
              </div>
              <p className="font-medium">View Reports</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}