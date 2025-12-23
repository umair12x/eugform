"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import Switch from "@/components/themeToggle";
import { Work_Sans } from "next/font/google";
import "../globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <html lang="en" data-theme={theme}>
      <body className={`${workSans.className} min-h-screen flex flex-col`}>

        {/* Navbar */}
        <header
          className="
            sticky top-0 z-50 backdrop-blur
            bg-yellow-50/90 dark:bg-[#0b0f14]/95
            border-b border-yellow-200 dark:border-gray-800
          "
        >
          <nav className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">

            {/* Left */}
            <div className="flex items-center gap-3">
              <Icon />
              <span className="font-bold text-lg text-gray-800 dark:text-gray-100">
                e.Enrollment
              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="
                  font-medium transition
                  text-gray-800 dark:text-gray-100
                  hover:text-yellow-600 dark:hover:text-yellow-400
                "
              >
                Home
              </Link>
              <Link
                href="/about"
                className="
                  font-medium transition
                  text-gray-800 dark:text-gray-100
                  hover:text-yellow-600 dark:hover:text-yellow-400
                "
              >
                About
              </Link>
              <Link
                href="/contact"
                className="
                  font-medium transition
                  text-gray-800 dark:text-gray-100
                  hover:text-yellow-600 dark:hover:text-yellow-400
                "
              >
                Contact
              </Link>

              <Switch theme={theme} setTheme={setTheme} />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-800 dark:text-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </nav>

          {/* Mobile Menu */}
          {menuOpen && (
            <div
              className="
                md:hidden
                bg-yellow-50 dark:bg-[#0f172a]
                border-t border-yellow-200 dark:border-gray-800
              "
            >
              <div className="flex flex-col items-center p-4 gap-4">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="
                    text-gray-800 dark:text-gray-100
                    hover:text-yellow-600 dark:hover:text-yellow-400
                  "
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMenuOpen(false)}
                  className="
                    text-gray-800 dark:text-gray-100
                    hover:text-yellow-600 dark:hover:text-yellow-400
                  "
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="
                    text-gray-800 dark:text-gray-100
                    hover:text-yellow-600 dark:hover:text-yellow-400
                  "
                >
                  Contact
                </Link>

                <div className="pt-2">
                  <Switch theme={theme} setTheme={setTheme} />
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Main */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="footer-style">
          © {new Date().getFullYear()} eUG Form. All rights reserved
        </footer>

      </body>
    </html>
  );
}
  