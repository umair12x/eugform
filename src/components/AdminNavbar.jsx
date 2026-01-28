"use client";

import { useState } from "react";

import Link from "next/link";
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
  FaMoon,
  FaSun,
  FaSignInAlt,
} from "react-icons/fa";

export default function Navbar({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: <FaTachometerAlt /> },
    { name: "Advisor", href: "/admin/advisor", icon: <FaChalkboardTeacher /> },
    { name: "Director", href: "/admin/director", icon: <FaBuilding /> },
    { name: "Controller", href: "/admin/controller", icon: <FaUniversity /> },
    {
      name: "Fee Section",
      href: "/admin/fee-section",
      icon: <FaMoneyBillWave />,
    },
    { name: "Tutor", href: "/admin/tutor", icon: <FaUserGraduate /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
              <FaUniversity className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                UAF Portal
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Digital Enrollment
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}

            <toggleTheme />
            {/* Login Button */}
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-300 flex items-center gap-2"
            >
              <FaSignInAlt size={16} /> Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
           <toggleTheme />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile Login Button */}
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-300 flex items-center gap-2"
              >
                <FaSignInAlt size={16} /> Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
