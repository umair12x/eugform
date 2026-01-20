"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserTie,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaFileAlt,
  FaMoneyBillWave,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBuilding,
  FaClipboardCheck,
  FaUniversity,
} from "react-icons/fa";

const adminMenuItems = [
  { name: "Dashboard", href: "/admin", icon: <FaTachometerAlt /> },
  { name: "Advisor", href: "/admin/advisor", icon: <FaChalkboardTeacher /> },
  { name: "Director", href: "/admin/director", icon: <FaBuilding /> },
  { name: "Controller", href: "/admin/controller", icon: <FaUniversity /> },
  { name: "Fee Section", href: "/admin/fee-section", icon: <FaMoneyBillWave /> },
  { name: "Tutor", href: "/admin/tutor", icon: <FaUserGraduate /> },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-gray-800 text-white"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <span className="ml-4 font-bold text-lg">UAF Admin Panel</span>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gray-800 text-white`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto">
          <div className="mb-8 px-4">
            <h2 className="text-xl font-bold">UAF Admin Panel</h2>
            <p className="text-sm text-gray-400">University of Agriculture, Faisalabad</p>
          </div>

          <ul className="space-y-2">
            {adminMenuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    pathname === item.href
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Admin User</p>
                <p className="text-sm text-gray-400">Administrator</p>
              </div>
              <button className="p-2 hover:bg-gray-700 rounded">
                <FaSignOutAlt />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64 pt-16 lg:pt-0">
        <main className="p-4 md:p-8">{children}</main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}